'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Topbar } from '@/components/topbar';
import { Bell, Lock, User, Globe, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

const initialSettings = [
    { id: 'profile', icon: User, label: 'Profile Settings', description: 'Update your personal information.', enabled: true },
    { id: 'security', icon: Lock, label: 'Security', description: 'Manage your password and security settings.', enabled: true },
    { id: 'notifications', icon: Bell, label: 'Notifications', description: 'Configure how you receive alerts.', enabled: true },
    { id: 'language', icon: Globe, label: 'Language', description: 'Select your preferred language.', enabled: false },
    { id: 'privacy', icon: Shield, label: 'Privacy', description: 'Manage your data and visibility.', enabled: true },
];

export default function SettingsPage() {
    const [settings, setSettings] = useState(initialSettings);

    const toggleSetting = (id: string) => {
        setSettings(settings.map(s => s.id === id ? { ...s, enabled: !s.enabled } : s));
    };

    return (
        <>
            <Topbar />
            <div className="p-6 space-y-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
                    <p className="text-muted-foreground">General application settings and profile.</p>
                </motion.div>

                <div className="max-w-4xl space-y-4">
                    {settings.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="p-6 bg-card border border-border rounded-2xl flex items-center gap-6 group hover:shadow-sm transition-shadow"
                        >
                            <div className={cn(
                                "p-4 rounded-2xl transition-colors",
                                item.enabled ? "bg-primary/10" : "bg-accent"
                            )}>
                                <item.icon className={cn(
                                    "w-6 h-6 transition-colors",
                                    item.enabled ? "text-primary" : "text-muted-foreground"
                                )} />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-bold">{item.label}</h3>
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                            </div>

                            <div
                                onClick={() => toggleSetting(item.id)}
                                className={cn(
                                    "w-12 h-6 rounded-full p-1 cursor-pointer transition-colors relative flex items-center",
                                    item.enabled ? "bg-primary" : "bg-accent border border-border"
                                )}
                            >
                                <div className={cn(
                                    "w-4 h-4 rounded-full bg-white shadow-sm transition-all",
                                    item.enabled ? "translate-x-6" : "translate-x-0 bg-muted-foreground/50"
                                )} />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </>
    );
}
