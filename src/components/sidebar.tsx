'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    Users,
    Settings,
    BarChart3,
    MessageSquare,
    LogOut,
    Truck,
    Package,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
    { href: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/analytics', icon: BarChart3, label: 'Analytics' },
    { href: '/users', icon: Users, label: 'Users' },
    { href: '/drivers', icon: Users, label: 'Drivers' },
    { href: '/armada', icon: Truck, label: 'Armada' },
    { href: '/materials', icon: Package, label: 'Materials' },
    { href: '/messages', icon: MessageSquare, label: 'Messages' },
    { href: '/settings', icon: Settings, label: 'Settings' },
];

interface SidebarProps {
    onExpand?: (expanded: boolean) => void;
    isMobileOpen?: boolean;
    onMobileClose?: () => void;
}

interface SidebarContentProps {
    expanded: boolean;
    pathname: string;
    onMobileClose?: () => void;
}

const SidebarContent = ({ expanded, pathname, onMobileClose }: SidebarContentProps) => (
    <>
        <div className="p-6 h-20 flex items-center shrink-0">
            <AnimatePresence mode="wait">
                {expanded ? (
                    <motion.h1
                        key="expanded"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent whitespace-nowrap"
                    >
                        TitanBumi
                    </motion.h1>
                ) : (
                    <motion.div
                        key="collapsed"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-bold shrink-0"
                    >
                        T
                    </motion.div>
                )}
            </AnimatePresence>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-2 overflow-y-auto no-scrollbar">
            {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        onClick={onMobileClose}
                        className={cn(
                            "flex items-center p-3 rounded-xl transition-all duration-200 group relative min-h-[52px]",
                            isActive
                                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                                : "hover:bg-accent text-muted-foreground hover:text-foreground"
                        )}
                    >
                        <div className="flex items-center shrink-0 w-6 h-6 justify-center">
                            <item.icon className={cn("w-6 h-6 shrink-0", isActive ? "" : "group-hover:scale-110 transition-transform")} />
                        </div>

                        <AnimatePresence>
                            {expanded && (
                                <motion.span
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    className="ml-4 font-medium whitespace-nowrap overflow-hidden"
                                >
                                    {item.label}
                                </motion.span>
                            )}
                        </AnimatePresence>

                        {isActive && expanded && (
                            <motion.div
                                layoutId="active-indicator"
                                className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-foreground shrink-0"
                            />
                        )}
                    </Link>
                );
            })}
        </nav>

        <div className="p-3 border-t border-border shrink-0">
            <button
                onClick={() => window.location.href = '/login'}
                suppressHydrationWarning
                className="flex items-center p-3 w-full rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors group min-h-[52px]"
            >
                <div className="flex items-center shrink-0 w-6 h-6 justify-center">
                    <LogOut className="w-6 h-6 shrink-0" />
                </div>
                <AnimatePresence>
                    {expanded && (
                        <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="ml-4 font-medium whitespace-nowrap overflow-hidden"
                        >
                            Logout
                        </motion.span>
                    )}
                </AnimatePresence>
            </button>
        </div>
    </>
);

export function Sidebar({ onExpand, isMobileOpen, onMobileClose }: SidebarProps) {
    const pathname = usePathname();
    const [isHovered, setIsHovered] = useState(false);

    React.useEffect(() => {
        if (onExpand) {
            onExpand(isHovered);
        }
    }, [isHovered, onExpand]);

    return (
        <>
            {/* Desktop Sidebar */}
            <motion.aside
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                initial={false}
                animate={{ width: isHovered ? 256 : 80 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="fixed left-0 top-0 h-screen bg-background border-r border-border hidden md:flex flex-col z-50 overflow-hidden"
            >
                <SidebarContent expanded={isHovered} pathname={pathname} />
            </motion.aside>

            {/* Mobile Sidebar (Drawer) */}
            <AnimatePresence>
                {isMobileOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={onMobileClose}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 md:hidden"
                        />
                        {/* Drawer */}
                        <motion.aside
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed left-0 top-0 h-screen w-64 bg-background border-r border-border z-50 flex flex-col md:hidden shadow-xl"
                        >
                            <SidebarContent expanded={true} pathname={pathname} onMobileClose={onMobileClose} />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
