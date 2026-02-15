'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Lock, Mail, ArrowRight } from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate login delay
        setTimeout(() => {
            setIsLoading(false);
            router.push('/');
        }, 1500);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <div className="w-full max-w-md">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-card border border-border rounded-2xl p-8 shadow-xl"
                >
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent mb-2">
                            TitanBumi
                        </h1>
                        <p className="text-muted-foreground">Welcome back! Please login to your account.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <input
                                    type="email"
                                    placeholder="admin@titanbumi.com"
                                    className="w-full pl-10 pr-4 py-3 bg-accent/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="w-full pl-10 pr-12 py-3 bg-accent/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="rounded border-border bg-accent text-primary focus:ring-primary" />
                                <span>Remember me</span>
                            </label>
                            <a href="#" className="text-primary hover:underline">Forgot password?</a>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-70 transition-all"
                        >
                            {isLoading ? (
                                <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    Sign In <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
