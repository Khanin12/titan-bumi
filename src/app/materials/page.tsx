'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Trash2, Edit2, Package, X, DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { FileSpreadsheet, FileText } from 'lucide-react';
import { Toast, ToastType } from '@/components/ui/toast';

type Material = {
    id: string;
    name: string;
    price_per_rit: number | string | null;
    created_at: string;
};

export default function MaterialsPage() {
    const [data, setData] = useState<Material[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [currentMaterial, setCurrentMaterial] = useState<Partial<Material>>({});
    const [isEditing, setIsEditing] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: ToastType; isVisible: boolean; id: number }>({
        message: '',
        type: 'success',
        isVisible: false,
        id: 0,
    });

    const showToast = (message: string, type: ToastType) => {
        setToast({ message, type, isVisible: true, id: Date.now() });
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchData();
        }, 500);
        return () => clearTimeout(timer);
    }, [search, page]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/materials?search=${search}&page=${page}&limit=10`);
            const json = await res.json();
            if (res.ok) {
                setData(json.data);
                setTotalPages(json.metadata.totalPages);
            }
        } catch (error) {
            console.error('Failed to fetch materials', error);
            showToast('Failed to connect to server', 'destructive');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);
        try {
            const url = isEditing ? `/api/materials/${currentMaterial.id}` : '/api/materials';
            const method = isEditing ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(currentMaterial),
            });

            if (res.ok) {
                setIsModalOpen(false);
                fetchData();
                showToast(isEditing ? 'Material updated successfully' : 'Material added successfully', isEditing ? 'info' : 'success');
                setCurrentMaterial({});
                setIsEditing(false);
            } else {
                showToast('Failed to save material', 'destructive');
            }
        } catch (error) {
            console.error('Failed to save material', error);
            showToast('An error occurred while saving', 'destructive');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!currentMaterial.id) return;
        try {
            const res = await fetch(`/api/materials/${currentMaterial.id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                setIsDeleteModalOpen(false);
                fetchData();
                showToast('Material deleted successfully', 'destructive');
                setCurrentMaterial({});
            } else {
                showToast('Failed to delete material', 'destructive');
            }
        } catch (error) {
            console.error('Failed to delete material', error);
            showToast('An error occurred while deleting', 'destructive');
        }
    };

    const openAddModal = () => {
        setCurrentMaterial({});
        setIsEditing(false);
        setIsModalOpen(true);
    };

    const openEditModal = (material: Material) => {
        setCurrentMaterial(material);
        setIsEditing(true);
        setIsModalOpen(true);
    };

    const openDeleteModal = (material: Material) => {
        setCurrentMaterial(material);
        setIsDeleteModalOpen(true);
    };

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(data.map(item => ({
            'Material Name': item.name,
            'Price Per Rit': item.price_per_rit || 0,
            'Created At': new Date(item.created_at).toLocaleDateString()
        })));
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Materials");
        XLSX.writeFile(workbook, `Materials_Data.xlsx`);
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text(`Materials Report`, 14, 15);
        const tableData = data.map(item => [
            item.name,
            new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(Number(item.price_per_rit || 0)),
            new Date(item.created_at).toLocaleDateString()
        ]);
        autoTable(doc, {
            head: [['Material Name', 'Price Per Rit', 'Created At']],
            body: tableData,
            startY: 25,
        });
        doc.save(`Materials_Data.pdf`);
    };

    const formatCurrency = (val: number | string | null) => {
        if (val === null || val === undefined) return 'Rp 0';
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(Number(val));
    };

    return (
        <div className="p-6 space-y-8">
            <div className="flex flex-col gap-4">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <h2 className="text-3xl font-bold tracking-tight">Materials Management</h2>
                    <p className="text-muted-foreground">Manage your material types and pricing.</p>
                </motion.div>

                <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                    <div className="relative w-full sm:w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search materials..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            suppressHydrationWarning
                            className="w-full pl-10 pr-4 py-2 bg-accent/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                        />
                    </div>

                    <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                        <button
                            onClick={exportToExcel}
                            suppressHydrationWarning
                            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-2 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors text-sm"
                        >
                            <FileSpreadsheet className="w-4 h-4" />
                            Excel
                        </button>
                        <button
                            onClick={exportToPDF}
                            suppressHydrationWarning
                            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-2 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors text-sm"
                        >
                            <FileText className="w-4 h-4" />
                            PDF
                        </button>
                        <button
                            onClick={openAddModal}
                            suppressHydrationWarning
                            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-opacity text-sm"
                        >
                            <Plus className="w-4 h-4" />
                            Add Material
                        </button>
                    </div>
                </div>
            </div>

            {/* Desktop View (Table) */}
            <div className="hidden md:block bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-accent/50 text-muted-foreground text-sm uppercase">
                            <th className="px-6 py-4 font-semibold">Material Name</th>
                            <th className="px-6 py-4 font-semibold">Price per Rit</th>
                            <th className="px-6 py-4 font-semibold">Created At</th>
                            <th className="px-6 py-4 font-semibold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {loading ? (
                            <tr><td colSpan={4} className="px-6 py-12 text-center text-muted-foreground animate-pulse">Loading data...</td></tr>
                        ) : data.length === 0 ? (
                            <tr><td colSpan={4} className="px-6 py-12 text-center text-muted-foreground">No materials found.</td></tr>
                        ) : (
                            data.map((item) => (
                                <tr key={item.id} className="hover:bg-accent/30 transition-colors group">
                                    <td className="px-6 py-4 font-medium">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500">
                                                <Package className="w-4 h-4" />
                                            </div>
                                            {item.name}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-mono text-primary font-semibold">{formatCurrency(item.price_per_rit)}</td>
                                    <td className="px-6 py-4 text-muted-foreground">{new Date(item.created_at).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button onClick={() => openEditModal(item)} className="p-2 hover:bg-primary/10 hover:text-primary rounded-lg transition-colors"><Edit2 className="w-4 h-4" /></button>
                                            <button onClick={() => openDeleteModal(item)} className="p-2 hover:bg-destructive/10 hover:text-destructive rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Mobile View (Cards) */}
            <div className="md:hidden space-y-4">
                {loading ? (
                    <div className="text-center py-8 text-muted-foreground">Loading...</div>
                ) : data.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">No materials found.</div>
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
                                        <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500 shrink-0">
                                            <Package className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-foreground">{item.name}</h3>
                                            <p className="text-xs text-muted-foreground">{new Date(item.created_at).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <div className="font-mono text-sm font-bold text-primary">
                                        {formatCurrency(item.price_per_rit)}
                                    </div>
                                </div>

                                <div className="flex gap-2 mt-4">
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

            {/* Pagination */}
            <div className="flex items-center justify-between p-4 border-t border-border">
                <span className="text-sm text-muted-foreground">Page {page} of {totalPages}</span>
                <div className="flex gap-2">
                    <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="px-3 py-1 border rounded-lg disabled:opacity-50 text-sm font-medium hover:bg-accent transition-colors">Previous</button>
                    <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className="px-3 py-1 border rounded-lg disabled:opacity-50 text-sm font-medium hover:bg-accent transition-colors">Next</button>
                </div>
            </div>

            {/* Add/Edit Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-card w-full max-w-md rounded-2xl border border-border shadow-xl overflow-hidden">
                            <div className="p-4 border-b border-border flex justify-between items-center">
                                <h3 className="font-bold text-lg">{isEditing ? 'Edit Material' : 'Add Material'}</h3>
                                <button onClick={() => setIsModalOpen(false)} className="hover:bg-accent p-1 rounded-lg transition-colors"><X className="w-5 h-5" /></button>
                            </div>
                            <form onSubmit={handleSubmit} className="p-4 space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Material Name</label>
                                    <div className="relative">
                                        <Package className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                                        <select
                                            required
                                            value={currentMaterial.name || ''}
                                            onChange={(e) => setCurrentMaterial({ ...currentMaterial, name: e.target.value })}
                                            className="w-full pl-10 pr-4 py-2 bg-accent/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm appearance-none cursor-pointer"
                                        >
                                            <option value="" disabled>Select material...</option>
                                            <option value="Pasir">Pasir</option>
                                            <option value="Grosok">Grosok</option>
                                            <option value="Paser">Paser</option>
                                            <option value="Sirtu">Sirtu</option>
                                        </select>
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Price per Rit (RP)</label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                        <input required type="number" value={currentMaterial.price_per_rit || ''} onChange={(e) => setCurrentMaterial({ ...currentMaterial, price_per_rit: e.target.value })} className="w-full pl-10 pr-4 py-2 bg-accent/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm" placeholder="e.g. 500000" />
                                    </div>
                                </div>
                                <div className="pt-2 flex justify-end gap-2">
                                    <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 hover:bg-accent rounded-xl text-sm font-medium transition-colors">Cancel</button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                Saving...
                                            </>
                                        ) : 'Save Material'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Delete Modal */}
            <AnimatePresence>
                {isDeleteModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-card w-full max-w-sm rounded-2xl p-6 text-center border border-border shadow-xl">
                            <div className="w-12 h-12 bg-destructive/10 text-destructive rounded-full flex items-center justify-center mx-auto mb-4"><Trash2 className="w-6 h-6" /></div>
                            <h3 className="font-bold text-lg mb-2">Delete Material?</h3>
                            <p className="text-muted-foreground text-sm mb-6">Are you sure you want to delete <strong>{currentMaterial.name}</strong>? This action cannot be undone.</p>
                            <div className="flex gap-3">
                                <button onClick={() => setIsDeleteModalOpen(false)} className="flex-1 px-4 py-2 border rounded-xl text-sm font-medium hover:bg-accent transition-colors">Cancel</button>
                                <button onClick={handleDelete} className="flex-1 px-4 py-2 bg-destructive text-white rounded-xl text-sm font-bold shadow-lg shadow-destructive/20 hover:opacity-90 transition-all">Delete</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <Toast
                key={toast.id}
                message={toast.message}
                type={toast.type}
                isVisible={toast.isVisible}
                onClose={() => setToast({ ...toast, isVisible: false })}
            />
        </div>
    );
}
