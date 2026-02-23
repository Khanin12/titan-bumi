
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Trash2, Edit2, Calendar, X, Fuel, Banknote, User, Truck, Layers, Handshake, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { FileSpreadsheet, FileText } from 'lucide-react';
import { Toast, ToastType } from '@/components/ui/toast';

type Transaction = {
    id: string;
    date: string;
    driver_id: string;
    armada_id: string;
    material_id: string;
    partner_id: string;
    quantity: number;
    price: number;
    royalty: number;
    solar: number;
    notes: string | null;
    created_at: string;
    driver: { name: string };
    armada: { plat_nomor: string };
    material: { name: string };
    partner: { name: string };
};

type LookupData = {
    drivers: { id: string, name: string }[];
    armada: { id: string, plat_nomor: string }[];
    materials: { id: string, name: string, price_per_rit: number }[];
    partners: { id: string, name: string }[];
};

export default function TransactionsPage() {
    const [mounted, setMounted] = useState(false);
    const [data, setData] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setMounted(true);
    }, []);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [currentTransaction, setCurrentTransaction] = useState<Partial<Transaction>>({});
    const [isEditing, setIsEditing] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [lookups, setLookups] = useState<LookupData>({
        drivers: [],
        armada: [],
        materials: [],
        partners: []
    });

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
        fetchLookups();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchData();
        }, 500);
        return () => clearTimeout(timer);
    }, [search, page]);

    const fetchLookups = async () => {
        try {
            const [d, a, m, p] = await Promise.all([
                fetch('/api/drivers?limit=100').then(res => res.json()),
                fetch('/api/armada?limit=100').then(res => res.json()),
                fetch('/api/materials?limit=100').then(res => res.json()),
                fetch('/api/partners?limit=100').then(res => res.json())
            ]);
            setLookups({
                drivers: d.data,
                armada: a.data,
                materials: m.data,
                partners: p.data
            });
        } catch (error) {
            console.error('Failed to fetch lookups', error);
        }
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/transactions?search=${search}&page=${page}&limit=10`);
            const json = await res.json();
            setData(json.data);
            setTotalPages(json.metadata.totalPages);
        } catch (error) {
            console.error('Failed to fetch transactions', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);
        try {
            const url = isEditing ? `/api/transactions/${currentTransaction.id}` : '/api/transactions';
            const method = isEditing ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(currentTransaction),
            });

            if (res.ok) {
                setIsModalOpen(false);
                fetchData();
                showToast(isEditing ? 'Transaction updated' : 'Transaction added', isEditing ? 'info' : 'success');
                setCurrentTransaction({});
                setIsEditing(false);
            } else {
                showToast('Failed to save transaction', 'destructive');
            }
        } catch (error) {
            console.error('Failed to save transaction', error);
            showToast('Error occurred', 'destructive');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!currentTransaction.id) return;
        try {
            const res = await fetch(`/api/transactions/${currentTransaction.id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                setIsDeleteModalOpen(false);
                fetchData();
                showToast('Transaction deleted', 'destructive');
                setCurrentTransaction({});
            }
        } catch (error) {
            console.error('Failed to delete transaction', error);
        }
    };

    const onMaterialChange = (materialId: string) => {
        const material = lookups.materials.find(m => m.id === materialId);
        if (material) {
            setCurrentTransaction({
                ...currentTransaction,
                material_id: materialId,
                price: material.price_per_rit
            });
        }
    };

    const openAddModal = () => {
        setCurrentTransaction({
            date: new Date().toISOString().split('T')[0],
            quantity: 1,
            royalty: 0,
            solar: 0
        });
        setIsEditing(false);
        setIsModalOpen(true);
    };

    const openEditModal = (t: Transaction) => {
        setCurrentTransaction({
            ...t,
            date: new Date(t.date).toISOString().split('T')[0]
        });
        setIsEditing(true);
        setIsModalOpen(true);
    };

    const formatCurrency = (amount: any) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(Number(amount));
    };

    return (
        <div className="p-6 space-y-8">
            <div className="flex flex-col gap-4">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <h2 className="text-3xl font-bold tracking-tight text-foreground">Titase / Ritase Management</h2>
                    <p className="text-muted-foreground">Track and manage daily material trip transactions.</p>
                </motion.div>

                <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                    <div className="relative w-full sm:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search by notes, driver, or plate..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-accent/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                        />
                    </div>

                    <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                        <button onClick={openAddModal} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90 transition-opacity whitespace-nowrap">
                            <Plus className="w-4 h-4" />
                            New Ritase
                        </button>
                    </div>
                </div>
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-accent/50 text-muted-foreground text-[10px] uppercase tracking-widest font-bold">
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Driver & Armada</th>
                                <th className="px-6 py-4">Material & Partner</th>
                                <th className="px-6 py-4">Pricing</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {loading ? (
                                <tr><td colSpan={5} className="px-6 py-12 text-center text-muted-foreground animate-pulse">Loading ritase logs...</td></tr>
                            ) : data.length === 0 ? (
                                <tr><td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">No transactions found. Start by adding a new ritase.</td></tr>
                            ) : (
                                data.map((item) => (
                                    <tr key={item.id} className="hover:bg-accent/30 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-sm">
                                                    {mounted ? new Date(item.date).toLocaleDateString() : '...'}
                                                </span>
                                                <span className="text-[10px] font-mono text-muted-foreground uppercase">{item.id.split('-')[0]}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2 text-sm font-medium">
                                                    <User className="w-3.5 h-3.5 text-blue-500" />
                                                    {item.driver.name}
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                    <Truck className="w-3.5 h-3.5" />
                                                    {item.armada.plat_nomor}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2 text-sm font-medium">
                                                    <Layers className="w-3.5 h-3.5 text-orange-500" />
                                                    {item.material.name}
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                    <Handshake className="w-3.5 h-3.5" />
                                                    {item.partner.name}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-primary">{mounted ? formatCurrency(Number(item.price) * Number(item.quantity)) : '...'}</span>
                                                <span className="text-[10px] text-muted-foreground">Qty: {Number(item.quantity)} @ {mounted ? formatCurrency(item.price) : '...'}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button onClick={() => openEditModal(item)} className="p-2 hover:bg-primary/10 hover:text-primary rounded-lg transition-colors"><Edit2 className="w-4 h-4" /></button>
                                                <button onClick={() => { setCurrentTransaction(item); setIsDeleteModalOpen(true); }} className="p-2 hover:bg-destructive/10 hover:text-destructive rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Mobile/Tablet Card View */}
            <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.map(item => (
                    <motion.div key={item.id} layout className="bg-card border border-border rounded-2xl p-4 shadow-sm space-y-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <span className="text-xs font-bold text-muted-foreground uppercase">{mounted ? new Date(item.date).toLocaleDateString('id-ID', { weekday: 'long' }) : '...'}</span>
                                <h3 className="font-bold text-lg">{mounted ? new Date(item.date).toLocaleDateString() : '...'}</h3>
                            </div>
                            <div className="text-right">
                                <p className="text-xl font-black text-primary">{mounted ? formatCurrency(Number(item.price) * Number(item.quantity)) : '...'}</p>
                                <p className="text-[10px] text-muted-foreground">{item.material.name}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="bg-accent/50 p-2 rounded-xl border border-border/50">
                                <p className="text-muted-foreground mb-1 flex items-center gap-1"><User className="w-3 h-3" /> Driver</p>
                                <p className="font-bold overflow-hidden text-ellipsis whitespace-nowrap">{item.driver.name}</p>
                            </div>
                            <div className="bg-accent/50 p-2 rounded-xl border border-border/50">
                                <p className="text-muted-foreground mb-1 flex items-center gap-1"><Truck className="w-3 h-3" /> Armada</p>
                                <p className="font-bold">{item.armada.plat_nomor}</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-[11px] pt-2 border-t border-border/50">
                            <span className="bg-orange-500/10 text-orange-500 px-2 py-0.5 rounded-full font-bold">{item.partner.name}</span>
                            <div className="flex gap-2">
                                <button onClick={() => openEditModal(item)} className="p-2 hover:bg-primary/10 hover:text-primary rounded-lg transition-colors"><Edit2 className="w-4 h-4" /></button>
                                <button onClick={() => { setCurrentTransaction(item); setIsDeleteModalOpen(true); }} className="p-2 hover:bg-destructive/10 hover:text-destructive rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Ritase Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
                        <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="bg-card w-full max-w-2xl rounded-[2rem] border border-border shadow-2xl overflow-hidden flex flex-col md:flex-row">
                            {/* Visual Sidebar for Modal */}
                            <div className="bg-primary p-8 text-primary-foreground md:w-1/3 flex flex-col justify-between overflow-hidden relative">
                                <div className="z-10">
                                    <h3 className="text-3xl font-black mb-2 leading-tight">{isEditing ? 'Update Transaction' : 'Record New Ritase'}</h3>
                                    <p className="text-primary-foreground/70 text-sm">Please fill in the trip details correctly to maintain accurate records.</p>
                                </div>
                                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
                                <div className="z-10 pt-8">
                                    {currentTransaction.material_id && (
                                        <div className="bg-black/20 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
                                            <p className="text-[10px] uppercase font-bold text-white/50 mb-1 tracking-widest">Calculated Total</p>
                                            <p className="text-2xl font-black">{mounted ? formatCurrency(Number(currentTransaction.price || 0) * Number(currentTransaction.quantity || 1)) : '...'}</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Form Area */}
                            <div className="p-8 flex-1 bg-card overflow-y-auto max-h-[80vh] md:max-h-full no-scrollbar">
                                <div className="flex justify-between items-center mb-6 md:mb-8">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-primary" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Ritase Entry Form</span>
                                    </div>
                                    <button onClick={() => setIsModalOpen(false)} className="hover:bg-accent p-2 rounded-full transition-colors"><X className="w-5 h-5" /></button>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Trip Date</label>
                                            <div className="relative">
                                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                                                <input required type="date" value={currentTransaction.date || ''} onChange={(e) => setCurrentTransaction({ ...currentTransaction, date: e.target.value })} className="w-full pl-12 pr-4 py-3 bg-accent/30 border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none text-sm transition-all focus:bg-accent/50" />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Quantity (Rit)</label>
                                            <div className="relative">
                                                <ChevronRight className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                                                <input required type="number" step="0.5" value={currentTransaction.quantity || ''} onChange={(e) => setCurrentTransaction({ ...currentTransaction, quantity: Number(e.target.value) })} className="w-full pl-12 pr-4 py-3 bg-accent/30 border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Driver</label>
                                            <select required value={currentTransaction.driver_id || ''} onChange={(e) => setCurrentTransaction({ ...currentTransaction, driver_id: e.target.value })} className="w-full px-4 py-3 bg-accent/30 border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm appearance-none">
                                                <option value="" disabled>Select Driver</option>
                                                {lookups.drivers.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                                            </select>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Vehicle (Armada)</label>
                                            <select required value={currentTransaction.armada_id || ''} onChange={(e) => setCurrentTransaction({ ...currentTransaction, armada_id: e.target.value })} className="w-full px-4 py-3 bg-accent/30 border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm appearance-none">
                                                <option value="" disabled>Select Plate</option>
                                                {lookups.armada.map(a => <option key={a.id} value={a.id}>{a.plat_nomor}</option>)}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Material</label>
                                            <select required value={currentTransaction.material_id || ''} onChange={(e) => onMaterialChange(e.target.value)} className="w-full px-4 py-3 bg-accent/30 border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm appearance-none">
                                                <option value="" disabled>Select Material</option>
                                                {lookups.materials.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                                            </select>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Partner / Lahan</label>
                                            <select required value={currentTransaction.partner_id || ''} onChange={(e) => setCurrentTransaction({ ...currentTransaction, partner_id: e.target.value })} className="w-full px-4 py-3 bg-accent/30 border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm appearance-none">
                                                <option value="" disabled>Select Partner</option>
                                                {lookups.partners.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Royalty</label>
                                            <input type="number" value={currentTransaction.royalty || 0} onChange={(e) => setCurrentTransaction({ ...currentTransaction, royalty: Number(e.target.value) })} className="w-full px-4 py-3 bg-accent/30 border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm" />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Fuel (Solar)</label>
                                            <input type="number" value={currentTransaction.solar || 0} onChange={(e) => setCurrentTransaction({ ...currentTransaction, solar: Number(e.target.value) })} className="w-full px-4 py-3 bg-accent/30 border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Notes</label>
                                        <textarea value={currentTransaction.notes || ''} onChange={(e) => setCurrentTransaction({ ...currentTransaction, notes: e.target.value })} className="w-full px-4 py-3 bg-accent/30 border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm min-h-[80px] resize-none" />
                                    </div>

                                    <div className="pt-4 flex gap-3">
                                        <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 text-sm font-bold bg-accent/50 hover:bg-accent rounded-2xl transition-all">Cancel</button>
                                        <button type="submit" disabled={isSubmitting} className="flex-[2] py-4 bg-primary text-primary-foreground rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-50 shadow-xl shadow-primary/20">
                                            {isSubmitting ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving...</> : 'Confirm Ritase'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between p-4 bg-card border border-border rounded-2xl">
                <span className="text-sm font-medium text-muted-foreground">Showing Page {page} of {totalPages}</span>
                <div className="flex gap-2">
                    <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="px-4 py-2 border border-border rounded-xl disabled:opacity-50 font-bold text-xs hover:bg-accent transition-all">Prev</button>
                    <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className="px-4 py-2 border border-border rounded-xl disabled:opacity-50 font-bold text-xs hover:bg-accent transition-all">Next</button>
                </div>
            </div>

            <Toast
                key={toast.id}
                message={toast.message}
                type={toast.type}
                isVisible={toast.isVisible}
                onClose={() => setToast({ ...toast, isVisible: false })}
            />

            {/* Delete Confirmation */}
            <AnimatePresence>
                {isDeleteModalOpen && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-card w-full max-w-sm rounded-3xl p-8 text-center border border-border shadow-2xl">
                            <div className="w-16 h-16 bg-destructive/10 text-destructive rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-destructive/5"><Trash2 className="w-8 h-8" /></div>
                            <h3 className="font-black text-2xl mb-2">Delete Entry?</h3>
                            <p className="text-muted-foreground text-sm mb-8 leading-relaxed">This action cannot be undone. Are you sure you want to remove this ritase record?</p>
                            <div className="flex gap-3">
                                <button onClick={() => setIsDeleteModalOpen(false)} className="flex-1 px-4 py-3 border border-border rounded-2xl font-bold text-sm">Cancel</button>
                                <button onClick={handleDelete} className="flex-1 px-4 py-3 bg-destructive text-white rounded-2xl font-black text-sm shadow-lg shadow-destructive/20">Delete Forever</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

