'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon, Search, Bell, User, Menu } from 'lucide-react';
import { motion } from 'framer-motion';

export function Topbar({ onMenuClick }: { onMenuClick?: () => void }) {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <header className="h-16 border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-40 px-4 sm:px-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="md:hidden p-2">
                        <Menu className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div className="max-w-md w-full relative hidden sm:block">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search something..."
                            className="w-full pl-10 pr-4 py-2 bg-accent/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-foreground"
                        />
                    </div>
                </div>
                {/* ... skeleton right side ... */}
            </header>
        );
    }

    return (
        <header className="h-16 border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-40 px-4 sm:px-6 flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
                <button
                    onClick={onMenuClick}
                    className="md:hidden p-2 hover:bg-accent rounded-xl transition-colors"
                >
                    <Menu className="w-5 h-5" />
                </button>

                <div className="max-w-md w-full relative hidden sm:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search something..."
                        className="w-full pl-10 pr-4 py-2 bg-accent/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-foreground"
                    />
                </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                    className="p-2 rounded-xl bg-accent/50 border border-border hover:bg-accent transition-colors text-foreground"
                >
                    {resolvedTheme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </motion.button>

                <button className="p-2 rounded-xl bg-accent/50 border border-border hover:bg-accent transition-colors relative text-foreground">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-background"></span>
                </button>

                <div className="flex items-center gap-3 pl-2 sm:border-l border-border text-foreground">
                    <div className="hidden sm:block text-right">
                        <p className="text-sm font-semibold">John Doe</p>
                        <p className="text-xs text-muted-foreground">Administrator</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                        <User className="w-6 h-6 text-primary" />
                    </div>
                </div>
            </div>
        </header>
    );
}

