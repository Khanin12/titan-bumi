
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Trash2, Edit2, Settings, X, Construction, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { FileSpreadsheet, FileText } from 'lucide-react';
import { Toast, ToastType } from '@/components/ui/toast';

type Equipment = {
    id: string;
    name: string;
    type: string | null;
    status: string | null;
    created_at: string;
};

export default function EquipmentsPage() {
    const [data, setData] = useState<Equipment[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [currentEquipment, setCurrentEquipment] = useState<Partial<Equipment>>({});
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
            const res = await fetch(`/api/equipments?search=${search}&page=${page}&limit=10`);
            const json = await res.json();
            setData(json.data);
            setTotalPages(json.metadata.totalPages);
        } catch (error) {
            console.error('Failed to fetch equipments', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);
        try {
            const url = isEditing ? `/api/equipments/${currentEquipment.id}` : '/api/equipments';
            const method = isEditing ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(currentEquipment),
            });

            if (res.ok) {
                setIsModalOpen(false);
                fetchData();
                showToast(isEditing ? 'Equipment updated successfully' : 'Equipment added successfully', isEditing ? 'info' : 'success');
                setCurrentEquipment({});
                setIsEditing(false);
            } else {
                showToast('Failed to save equipment', 'destructive');
            }
        } catch (error) {
            console.error('Failed to save equipment', error);
            showToast('Failed to save equipment', 'destructive');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!currentEquipment.id) return;
        try {
            const res = await fetch(`/api/equipments/${currentEquipment.id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                setIsDeleteModalOpen(false);
                fetchData();
                showToast('Equipment deleted successfully', 'destructive');
                setCurrentEquipment({});
            } else {
                showToast('Failed to delete equipment', 'destructive');
            }
        } catch (error) {
            console.error('Failed to delete equipment', error);
        }
    };

    const openAddModal = () => {
        setCurrentEquipment({ status: 'active' });
        setIsEditing(false);
        setIsModalOpen(true);
    };

    const openEditModal = (equipment: Equipment) => {
        setCurrentEquipment(equipment);
        setIsEditing(true);
        setIsModalOpen(true);
    };

    const openDeleteModal = (equipment: Equipment) => {
        setCurrentEquipment(equipment);
        setIsDeleteModalOpen(true);
    };

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(data.map(item => ({
            'Name': item.name,
            'Type': item.type || '-',
            'Status': item.status || 'active',
            'Created At': new Date(item.created_at).toLocaleDateString()
        })));
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Equipments");
        XLSX.writeFile(workbook, `Equipments_Data.xlsx`);
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text(`Equipments Report`, 14, 15);
        const tableData = data.map(item => [
            item.name,
            item.type || '-',
            item.status || 'active',
            new Date(item.created_at).toLocaleDateString()
        ]);
        autoTable(doc, {
            head: [['Name', 'Type', 'Status', 'Created At']],
            body: tableData,
            startY: 25,
        });
        doc.save(`Equipments_Data.pdf`);
    };

    return (
        <div className="p-6 space-y-8">
            <div className="flex flex-col gap-4">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <h2 className="text-3xl font-bold tracking-tight">Equipments Management</h2>
                    <p className="text-muted-foreground">Manage your operation equipments and their status.</p>
                </motion.div>

                <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                    <div className="relative w-full sm:w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search equipment..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-accent/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                        />
                    </div>

                    <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                        <button
                            onClick={exportToExcel}
                            className="flex items-center justify-center gap-2 px-3 py-2 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors text-sm"
                        >
                            <FileSpreadsheet className="w-4 h-4" />
                            Excel
                        </button>
                        <button
                            onClick={exportToPDF}
                            className="flex items-center justify-center gap-2 px-3 py-2 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors text-sm"
                        >
                            <FileText className="w-4 h-4" />
                            PDF
                        </button>
                        <button
                            onClick={openAddModal}
                            className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-opacity text-sm"
                        >
                            <Plus className="w-4 h-4" />
                            Add Equipment
                        </button>
                    </div>
                </div>
            </div>

            {/* Desktop View */}
            <div className="hidden md:block bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-accent/50 text-muted-foreground text-sm uppercase">
                            <th className="px-6 py-4 font-semibold">Name</th>
                            <th className="px-6 py-4 font-semibold">Type</th>
                            <th className="px-6 py-4 font-semibold">Status</th>
                            <th className="px-6 py-4 font-semibold">Created At</th>
                            <th className="px-6 py-4 font-semibold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {loading ? (
                            <tr><td colSpan={5} className="px-6 py-8 text-center">Loading...</td></tr>
                        ) : data.length === 0 ? (
                            <tr><td colSpan={5} className="px-6 py-8 text-center">No equipments found.</td></tr>
                        ) : (
                            data.map((item) => (
                                <tr key={item.id} className="hover:bg-accent/30 transition-colors group">
                                    <td className="px-6 py-4 font-medium">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500">
                                                <Construction className="w-4 h-4" />
                                            </div>
                                            {item.name}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-muted-foreground">{item.type || '-'}</td>
                                    <td className="px-6 py-4">
                                        <span className={cn(
                                            "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border",
                                            item.status === 'active'
                                                ? "bg-green-500/10 text-green-500 border-green-500/20"
                                                : "bg-red-500/10 text-red-500 border-red-500/20"
                                        )}>
                                            {item.status === 'active' ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                                            {item.status || 'active'}
                                        </span>
                                    </td>
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
                    <div className="text-center py-8 text-muted-foreground">No equipments found.</div>
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
                                            <Construction className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-foreground">{item.name}</h3>
                                            <p className="text-xs text-muted-foreground">{item.type || '-'}</p>
                                        </div>
                                    </div>
                                    <span className={cn(
                                        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border",
                                        item.status === 'active'
                                            ? "bg-green-500/10 text-green-500 border-green-500/20"
                                            : "bg-red-500/10 text-red-500 border-red-500/20"
                                    )}>
                                        {item.status || 'active'}
                                    </span>
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
                    <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="px-3 py-1 border rounded-lg disabled:opacity-50">Previous</button>
                    <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className="px-3 py-1 border rounded-lg disabled:opacity-50">Next</button>
                </div>
            </div>

            {/* Add/Edit Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-card w-full max-w-md rounded-2xl border border-border shadow-xl overflow-hidden">
                            <div className="p-4 border-b border-border flex justify-between items-center">
                                <h3 className="font-bold text-lg">{isEditing ? 'Edit Equipment' : 'Add Equipment'}</h3>
                                <button onClick={() => setIsModalOpen(false)}><X className="w-5 h-5" /></button>
                            </div>
                            <form onSubmit={handleSubmit} className="p-4 space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Name</label>
                                    <input required type="text" value={currentEquipment.name || ''} onChange={(e) => setCurrentEquipment({ ...currentEquipment, name: e.target.value })} className="w-full px-3 py-2 bg-accent/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Type</label>
                                    <input type="text" value={currentEquipment.type || ''} onChange={(e) => setCurrentEquipment({ ...currentEquipment, type: e.target.value })} className="w-full px-3 py-2 bg-accent/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Status</label>
                                    <select
                                        value={currentEquipment.status || 'active'}
                                        onChange={(e) => setCurrentEquipment({ ...currentEquipment, status: e.target.value })}
                                        className="w-full px-3 py-2 bg-accent/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    >
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                </div>
                                <div className="pt-2 flex justify-end gap-2">
                                    <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 hover:bg-accent rounded-xl">Cancel</button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="px-4 py-2 bg-primary text-primary-foreground rounded-xl flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                Saving...
                                            </>
                                        ) : 'Save'}
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
                            <h3 className="font-bold text-lg mb-2">Delete Equipment?</h3>
                            <p className="text-muted-foreground text-sm mb-6">Are you sure you want to delete <strong>{currentEquipment.name}</strong>?</p>
                            <div className="flex gap-3">
                                <button onClick={() => setIsDeleteModalOpen(false)} className="flex-1 px-4 py-2 border rounded-xl">Cancel</button>
                                <button onClick={handleDelete} className="flex-1 px-4 py-2 bg-destructive text-white rounded-xl">Delete</button>
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

