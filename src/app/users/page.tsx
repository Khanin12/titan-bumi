'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Topbar } from '@/components/topbar';
import { MoreHorizontal, Search, UserPlus, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const initialUsers = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'Inactive' },
    { id: 3, name: 'Charlie Davis', email: 'charlie@example.com', role: 'Viewer', status: 'Active' },
    { id: 4, name: 'Diana Prince', email: 'diana@example.com', role: 'Admin', status: 'Active' },
    { id: 5, name: 'Ethan Hunt', email: 'ethan@example.com', role: 'Editor', status: 'Active' },
];

export default function UsersPage() {
    const [users, setUsers] = useState(initialUsers);
    const [searchQuery, setSearchQuery] = useState('');

    const handleAddUser = () => {
        const newUser = {
            id: users.length + 1,
            name: `New User ${users.length + 1}`,
            email: `user${users.length + 1}@example.com`,
            role: 'Viewer',
            status: 'Active',
        };
        setUsers([...users, newUser]);
    };

    const handleDeleteUser = (id: number) => {
        setUsers(users.filter(user => user.id !== id));
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <Topbar />
            <div className="p-6 space-y-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                        <h2 className="text-3xl font-bold tracking-tight">Users Management</h2>
                        <p className="text-muted-foreground">Manage your team and permissions.</p>
                    </motion.div>
                    <button
                        onClick={handleAddUser}
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-opacity"
                    >
                        <UserPlus className="w-5 h-5" />
                        Add User
                    </button>
                </div>

                <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-border flex items-center gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search users..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-accent/50 border border-border rounded-xl focus:outline-none"
                            />
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-accent/50 text-muted-foreground text-sm uppercase">
                                    <th className="px-6 py-4 font-semibold">User</th>
                                    <th className="px-6 py-4 font-semibold">Role</th>
                                    <th className="px-6 py-4 font-semibold">Status</th>
                                    <th className="px-6 py-4 font-semibold text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                <AnimatePresence>
                                    {filteredUsers.map((user) => (
                                        <motion.tr
                                            key={user.id}
                                            layout
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="hover:bg-accent/30 transition-colors group"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                                        {user.name[0]}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium">{user.name}</p>
                                                        <p className="text-sm text-muted-foreground">{user.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium">{user.role}</td>
                                            <td className="px-6 py-4">
                                                <span className={cn(
                                                    "px-3 py-1 rounded-full text-xs font-bold",
                                                    user.status === 'Active' ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                                                )}>
                                                    {user.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={() => handleDeleteUser(user.id)}
                                                    className="p-2 hover:bg-destructive/10 hover:text-destructive rounded-lg transition-colors"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            </tbody>
                        </table>
                        {filteredUsers.length === 0 && (
                            <div className="p-8 text-center text-muted-foreground">
                                No users found.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
