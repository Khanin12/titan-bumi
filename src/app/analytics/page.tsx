'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from 'recharts';

const data = [
    { name: 'Jan', revenue: 4000, users: 400 },
    { name: 'Feb', revenue: 3000, users: 300 },
    { name: 'Mar', revenue: 2000, users: 500 },
    { name: 'Apr', revenue: 2780, users: 600 },
    { name: 'May', revenue: 1890, users: 400 },
    { name: 'Jun', revenue: 2390, users: 700 },
    { name: 'Jul', revenue: 3490, users: 800 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function AnalyticsPage() {
    return (
        <>
            <div className="p-6 space-y-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h2 className="text-3xl font-bold tracking-tight">Analytics Center</h2>
                    <p className="text-muted-foreground">Deep dive into your business metrics.</p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="p-6 bg-card border border-border rounded-2xl shadow-sm">
                        <h3 className="text-lg font-bold mb-6">Users Growth</h3>
                        <div className="h-[300px] min-w-0" style={{ height: 300 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={data}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#888' }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#888' }} />
                                    <Tooltip cursor={{ fill: 'var(--accent)' }} />
                                    <Bar dataKey="users" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="p-6 bg-card border border-border rounded-2xl shadow-sm">
                        <h3 className="text-lg font-bold mb-6">Traffic Sources</h3>
                        <div className="h-[300px] min-w-0" style={{ height: 300 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={[
                                            { name: 'Direct', value: 400 },
                                            { name: 'Social', value: 300 },
                                            { name: 'Referral', value: 300 },
                                            { name: 'Others', value: 200 },
                                        ]}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {COLORS.map((color, index) => (
                                            <Cell key={index} fill={color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
