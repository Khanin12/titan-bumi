'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Topbar } from '@/components/topbar';
import { Search, Plus, Trash2, Edit2, Truck, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Download, FileSpreadsheet, FileText, Calendar as CalendarIcon } from 'lucide-react';
import { div } from 'framer-motion/client';

type Armada = {
    id: string;
    nama_sopir: string | null;
    plat_nomor: string | null;
    keterangan: string | null;
    created_at: string;
};

export default function ArmadaPage() {
    const [data, setData] = useState<Armada[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [currentArmada, setCurrentArmada] = useState<Partial<Armada>>({});
    const [isEditing, setIsEditing] = useState(false);
    const [exportPeriod, setExportPeriod] = useState<'all' | 'daily' | 'weekly' | 'monthly' | 'yearly'>('all');

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            fetchData();
        }, 500);
        return () => clearTimeout(timer);
    }, [search, page]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/armada?search=${search}&page=${page}&limit=10`);
            const json = await res.json();
            setData(json.data);
            setTotalPages(json.metadata.totalPages);
        } catch (error) {
            console.error('Failed to fetch data', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const url = isEditing ? `/api/armada/${currentArmada.id}` : '/api/armada';
            const method = isEditing ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(currentArmada),
            });

            if (res.ok) {
                setIsModalOpen(false);
                fetchData();
                setCurrentArmada({});
                setIsEditing(false);
            }
        } catch (error) {
            console.error('Failed to save data', error);
        }
    };

    const handleDelete = async () => {
        if (!currentArmada.id) return;
        try {
            const res = await fetch(`/api/armada/${currentArmada.id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                setIsDeleteModalOpen(false);
                fetchData();
                setCurrentArmada({});
            }
        } catch (error) {
            console.error('Failed to delete data', error);
        }
    };

    const openAddModal = () => {
        setCurrentArmada({});
        setIsEditing(false);
        setIsModalOpen(true);
    };

    const openEditModal = (armada: Armada) => {
        setCurrentArmada(armada);
        setIsEditing(true);
        setIsModalOpen(true);
    };

    const openDeleteModal = (armada: Armada) => {
        setCurrentArmada(armada);
        setIsDeleteModalOpen(true);
    };

    const getDateRange = () => {
        const now = new Date();
        let startDate = new Date();
        let endDate = new Date();

        switch (exportPeriod) {
            case 'daily':
                startDate = new Date(now.setHours(0, 0, 0, 0));
                endDate = new Date(now.setHours(23, 59, 59, 999));
                break;
            case 'weekly':
                const day = now.getDay();
                const diff = now.getDate() - day + (day === 0 ? -6 : 1);
                startDate = new Date(now.setDate(diff));
                startDate.setHours(0, 0, 0, 0);
                endDate = new Date(startDate);
                endDate.setDate(startDate.getDate() + 6);
                endDate.setHours(23, 59, 59, 999);
                break;
            case 'monthly':
                startDate = new Date(now.getFullYear(), now.getMonth(), 1);
                endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
                break;
            case 'yearly':
                startDate = new Date(now.getFullYear(), 0, 1);
                endDate = new Date(now.getFullYear(), 11, 31, 23, 59, 59);
                break;
            default:
                return null;
        }
        return { startDate: startDate.toISOString(), endDate: endDate.toISOString() };
    };

    const fetchExportData = async () => {
        const range = getDateRange();
        let url = `/api/armada?limit=0`; // limit=0 for all data
        if (range) {
            url += `&startDate=${range.startDate}&endDate=${range.endDate}`;
        }
        const res = await fetch(url);
        const json = await res.json();
        return json.data as Armada[];
    };

    const exportToExcel = async () => {
        const exportData = await fetchExportData();
        const worksheet = XLSX.utils.json_to_sheet(exportData.map(item => ({
            'Nama Sopir': item.nama_sopir,
            'Plat Nomor': item.plat_nomor,
            'Keterangan': item.keterangan || '-',
            'Tanggal Dibuat': new Date(item.created_at).toLocaleDateString()
        })));
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Armada");
        XLSX.writeFile(workbook, `Data_Armada_${exportPeriod}.xlsx`);
    };

    const exportToPDF = async () => {
        const exportData = await fetchExportData();
        const doc = new jsPDF();
        doc.text(`Laporan Data Armada (${exportPeriod.toUpperCase()})`, 14, 15);
        doc.setFontSize(10);
        doc.text(`Dicetak pada: ${new Date().toLocaleString()}`, 14, 22);

        const tableData = exportData.map(item => [
            item.nama_sopir,
            item.plat_nomor,
            item.keterangan || '-',
            new Date(item.created_at).toLocaleDateString()
        ]);

        autoTable(doc, {
            head: [['Nama Sopir', 'Plat Nomor', 'Keterangan', 'Tanggal Dibuat']],
            body: tableData,
            startY: 30,
        });

        doc.save(`Data_Armada_${exportPeriod}.pdf`);
    };

    return (
        <>
            <div className="p-6 space-y-8">
                <div className="flex flex-col gap-4">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Armada Management</h2>
                        <p className="text-muted-foreground text-sm sm:text-base">Manage your vehicle fleet and drivers.</p>
                    </motion.div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                        <div className="relative w-full sm:w-72">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search driver or plate..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-accent/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                            />
                        </div>

                        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                            <div className="relative flex-1 sm:flex-none min-w-[120px]">
                                <select
                                    value={exportPeriod}
                                    onChange={(e) => setExportPeriod(e.target.value as any)}
                                    className="w-full appearance-none bg-card border border-border px-3 py-2 pr-8 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
                                >
                                    <option value="all">All Time</option>
                                    <option value="daily">Daily</option>
                                    <option value="weekly">Weekly</option>
                                    <option value="monthly">Monthly</option>
                                    <option value="yearly">Yearly</option>
                                </select>
                                <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                            </div>

                            <div className="flex gap-2 flex-1 sm:flex-none">
                                <button
                                    onClick={exportToExcel}
                                    title="Export Excel"
                                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-2 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors text-sm"
                                >
                                    <FileSpreadsheet className="w-4 h-4" />
                                    <span className="hidden sm:inline">Excel</span>
                                </button>
                                <button
                                    onClick={exportToPDF}
                                    title="Export PDF"
                                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-2 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors text-sm"
                                >
                                    <FileText className="w-4 h-4" />
                                    <span className="hidden sm:inline">PDF</span>
                                </button>
                            </div>

                            <button
                                onClick={openAddModal}
                                className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-opacity text-sm"
                            >
                                <Plus className="w-4 h-4" />
                                Add Armada
                            </button>
                        </div>
                    </div>
                </div>

                {/* Desktop View (Table) */}
                <div className="hidden md:block bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-accent/50 text-muted-foreground text-sm uppercase">
                                    <th className="px-6 py-4 font-semibold">Driver Name</th>
                                    <th className="px-6 py-4 font-semibold">License Plate</th>
                                    <th className="px-6 py-4 font-semibold">Description</th>
                                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {loading ? (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">Loading...</td>
                                    </tr>
                                ) : data.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">No data found.</td>
                                    </tr>
                                ) : (
                                    <AnimatePresence>
                                        {data.map((item) => (
                                            <motion.tr
                                                key={item.id}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="hover:bg-accent/30 transition-colors group"
                                            >
                                                <td className="px-6 py-4 font-medium">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                                                            <Truck className="w-4 h-4" />
                                                        </div>
                                                        {item.nama_sopir || '-'}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="px-2.5 py-1 bg-black text-white dark:bg-white dark:text-black rounded font-mono text-sm border-2 border-white/20 dark:border-black/20 shadow-sm whitespace-nowrap">
                                                        {item.plat_nomor || '-'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-muted-foreground text-sm">{item.keterangan || '-'}</td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button
                                                            onClick={() => openEditModal(item)}
                                                            className="p-2 hover:bg-primary/10 hover:text-primary rounded-lg transition-colors"
                                                        >
                                                            <Edit2 className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => openDeleteModal(item)}
                                                            className="p-2 hover:bg-destructive/10 hover:text-destructive rounded-lg transition-colors"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </AnimatePresence>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Mobile View (Cards) */}
                <div className="md:hidden space-y-4">
                    {loading ? (
                        <div className="text-center py-8 text-muted-foreground">Loading...</div>
                    ) : data.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">No data found.</div>
                    ) : (
                        <AnimatePresence>
                            {data.map((item) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="bg-card border border-border rounded-xl p-4 shadow-sm"
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
                                                <Truck className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-foreground">{item.nama_sopir || 'Unknown Driver'}</h3>
                                                <p className="text-xs text-muted-foreground">{new Date(item.created_at).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                        <div className="bg-black text-white dark:bg-white dark:text-black px-2 py-1 rounded font-mono text-xs border border-white/20 dark:border-black/20 font-bold whitespace-nowrap">
                                            {item.plat_nomor || '-'}
                                        </div>
                                    </div>

                                    <div className="bg-accent/30 rounded-lg p-3 mb-4 text-sm text-muted-foreground">
                                        {item.keterangan || 'No description provided.'}
                                    </div>

                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => openEditModal(item)}
                                            className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => openDeleteModal(item)}
                                            className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium bg-destructive/10 text-destructive rounded-lg hover:bg-destructive/20 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                            Delete
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    )}
                </div>

                <div className="p-4 border-t border-border flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                        Page {page} of {totalPages}
                    </span>
                    <div className="flex gap-2">
                        <button
                            disabled={page === 1}
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            className="px-3 py-1 text-sm rounded-lg border border-border hover:bg-accent disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <button
                            disabled={page === totalPages}
                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                            className="px-3 py-1 text-sm rounded-lg border border-border hover:bg-accent disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

            {/* Add/Edit Modal */}
            <AnimatePresence>
                {
                    isModalOpen && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="bg-card w-full max-w-md rounded-2xl border border-border shadow-xl overflow-hidden"
                            >
                                <div className="p-4 border-b border-border flex justify-between items-center">
                                    <h3 className="font-bold text-lg">{isEditing ? 'Edit Armada' : 'Add New Armada'}</h3>
                                    <button onClick={() => setIsModalOpen(false)} className="p-1 hover:bg-accent rounded-lg"><X className="w-5 h-5" /></button>
                                </div>
                                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Driver Name</label>
                                        <input
                                            required
                                            type="text"
                                            value={currentArmada.nama_sopir || ''}
                                            onChange={(e) => setCurrentArmada({ ...currentArmada, nama_sopir: e.target.value })}
                                            className="w-full px-3 py-2 bg-accent/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                                            placeholder="e.g. Budi Santoso"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">License Plate</label>
                                        <input
                                            required
                                            type="text"
                                            value={currentArmada.plat_nomor || ''}
                                            onChange={(e) => setCurrentArmada({ ...currentArmada, plat_nomor: e.target.value })}
                                            className="w-full px-3 py-2 bg-accent/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                                            placeholder="e.g. B 1234 CD"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Description</label>
                                        <textarea
                                            value={currentArmada.keterangan || ''}
                                            onChange={(e) => setCurrentArmada({ ...currentArmada, keterangan: e.target.value })}
                                            className="w-full px-3 py-2 bg-accent/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 min-h-[80px]"
                                            placeholder="Optional description..."
                                        />
                                    </div>
                                    <div className="pt-2 flex justify-end gap-2">
                                        <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium hover:bg-accent rounded-xl transition-colors">Cancel</button>
                                        <button type="submit" className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-opacity">Save</button>
                                    </div>
                                </form>
                            </motion.div>
                        </div>
                    )
                }
            </AnimatePresence >

            {/* Delete Confirmation Modal */}
            <AnimatePresence>
                {isDeleteModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-card w-full max-w-sm rounded-2xl border border-border shadow-xl overflow-hidden p-6 text-center"
                        >
                            <div className="w-12 h-12 bg-destructive/10 text-destructive rounded-full flex items-center justify-center mx-auto mb-4">
                                <Trash2 className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-lg mb-2">Delete Armada?</h3>
                            <p className="text-muted-foreground text-sm mb-6">
                                Are you sure you want to delete <strong>{currentArmada.nama_sopir}</strong> ({currentArmada.plat_nomor})? This action cannot be undone.
                            </p>
                            <div className="flex gap-3 justify-center">
                                <button onClick={() => setIsDeleteModalOpen(false)} className="flex-1 px-4 py-2 text-sm font-medium border border-border rounded-xl hover:bg-accent transition-colors">Cancel</button>
                                <button onClick={handleDelete} className="flex-1 px-4 py-2 text-sm font-medium bg-destructive text-destructive-foreground rounded-xl hover:opacity-90 transition-opacity">Delete</button>
                            </div>
                        </motion.div>
                    </div>
                )
                }
            </AnimatePresence >
        </>
    );
}
