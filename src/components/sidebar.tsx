'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    Users,
    Settings,
    BarChart3,
    MessageSquare,
    LogOut,
    Truck,
    Layers,
    Handshake,
    ChevronDown,
    Home,
    User,
    Wrench,
    CreditCard,
    Fuel,
    Banknote,
    PieChart,
    Wallet,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// --- Types ---

interface MenuItem {
    title: string;
    route: string;
    icon: React.ElementType;
    badge?: number;
    hasNotification?: boolean;
}

interface MenuGroup {
    group_name: string;
    icon: React.ElementType;
    collapsible?: boolean;
    default_open?: boolean;
    items: MenuItem[];
}

// --- Menu Configuration ---

const MENU_GROUPS: MenuGroup[] = [
    {
        group_name: "Overview",
        icon: LayoutDashboard,
        collapsible: true,
        default_open: true,
        items: [
            { title: "Dashboard", route: "/", icon: Home },
            { title: "Analytics", route: "/analytics", icon: BarChart3 }
        ]
    },
    {
        group_name: "Management",
        icon: Users,
        collapsible: true,
        items: [
            { title: "Users", route: "/users", icon: User },
            { title: "Partners", route: "/partners", icon: Handshake },
            { title: "Drivers", route: "/drivers", icon: Truck }
        ]
    },
    {
        group_name: "Operasional",
        icon: Truck,
        collapsible: true,
        items: [
            { title: "Armada", route: "/armada", icon: Truck },
            { title: "Materials", route: "/materials", icon: Layers },
            { title: "Equipments", route: "/equipments", icon: Wrench }
        ]
    },
    {
        group_name: "Finance",
        icon: Wallet,
        collapsible: true,
        items: [
            { title: "Transactions", route: "/transactions", icon: CreditCard },
            { title: "Royalty & Solar", route: "/royalty", icon: Fuel },
            { title: "Setoran Mitra", route: "/setoran", icon: Banknote },
            { title: "Financial Summary", route: "/finance-summary", icon: PieChart }
        ]
    },
    {
        group_name: "System",
        icon: Settings,
        collapsible: true,
        items: [
            { title: "Messages", route: "/messages", icon: MessageSquare, badge: 3 },
            { title: "Settings", route: "/settings", icon: Settings }
        ]
    }
];

// --- Sub-components ---

const NavItem = ({ item, isActive, isCollapsed, onMobileClose }: { item: MenuItem; isActive: boolean; isCollapsed: boolean; onMobileClose?: () => void }) => {
    return (
        <Link
            href={item.route}
            onClick={onMobileClose}
            className={cn(
                "flex items-center px-8 py-6 rounded-[24px] transition-all duration-300 group relative",
                isActive
                    ? "bg-primary text-primary-foreground shadow-2xl shadow-primary/30"
                    : "hover:bg-accent text-muted-foreground hover:text-accent-foreground"
            )}
        >
            <div className="flex items-center shrink-0 w-12 h-12 justify-center">
                <item.icon className={cn("w-10 h-10 shrink-0", isActive ? "" : "group-hover:scale-110 transition-transform")} />
            </div>

            <AnimatePresence>
                {!isCollapsed && (
                    <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="ml-6 font-black text-2xl whitespace-nowrap overflow-hidden"
                    >
                        {item.title}
                    </motion.span>
                )}
            </AnimatePresence>

            {!isCollapsed && item.badge && (
                <span className="ml-auto bg-blue-100 text-blue-600 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {item.badge}
                </span>
            )}

            {isCollapsed && (item.badge || item.hasNotification) && (
                <div className="absolute top-2 right-2 w-3 h-3 bg-primary rounded-full border-2 border-background" />
            )}
        </Link>
    );
};

const GroupComponent = ({ group, pathname, isCollapsed, onMobileClose }: { group: MenuGroup; pathname: string; isCollapsed: boolean; onMobileClose?: () => void }) => {
    const isChildActive = group.items.some(item => pathname === item.route);
    const [isOpen, setIsOpen] = useState(group.default_open || isChildActive);

    useEffect(() => {
        if (isChildActive) setIsOpen(true);
    }, [isChildActive]);

    if (isCollapsed) {
        return (
            <div className="py-2 flex flex-col items-center gap-2">
                {group.items.map((item) => (
                    <NavItem
                        key={item.route}
                        item={item}
                        isActive={pathname === item.route}
                        isCollapsed={true}
                        onMobileClose={onMobileClose}
                    />
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-3">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center px-6 py-5 text-xl font-black text-muted-foreground uppercase tracking-[0.2em] group hover:text-foreground transition-colors"
            >
                <div className="flex items-center gap-4">
                    <group.icon className="w-8 h-8" />
                    <span>{group.group_name}</span>
                </div>
                {group.collapsible && (
                    <ChevronDown className={cn("ml-auto w-8 h-8 transition-transform duration-300", isOpen ? "rotate-180" : "")} />
                )}
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden space-y-1"
                    >
                        {group.items.map((item) => (
                            <div key={item.route} className="px-2">
                                <NavItem
                                    item={item}
                                    isActive={pathname === item.route}
                                    isCollapsed={isCollapsed}
                                    onMobileClose={onMobileClose}
                                />
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// --- Main Sidebar Component ---

interface SidebarProps {
    onExpand?: (expanded: boolean) => void;
    isMobileOpen?: boolean;
    onMobileClose?: () => void;
}

export function Sidebar({ onExpand, isMobileOpen, onMobileClose }: SidebarProps) {
    const pathname = usePathname();
    const router = useRouter();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // Sync expanded state with layout
    const expanded = !isCollapsed || isHovered;

    useEffect(() => {
        if (onExpand) {
            onExpand(expanded);
        }
    }, [expanded, onExpand]);

    const SidebarWrapper = ({ children, isMobile }: { children: React.ReactNode; isMobile?: boolean }) => {
        if (isMobile) {
            return (
                <motion.aside
                    initial={{ x: '-100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '-100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="fixed left-0 top-0 h-screen w-[360px] bg-card border-r border-border z-50 flex flex-col md:hidden shadow-xl"
                >
                    {children}
                </motion.aside>
            );
        }

        return (
            <motion.aside
                initial={false}
                animate={{ width: expanded ? 360 : 100 }}
                onHoverStart={() => !isMobile && !isCollapsed && setIsHovered(true)}
                onHoverEnd={() => !isMobile && setIsHovered(false)}
                className="fixed left-0 top-0 h-screen bg-card border-r border-border hidden md:flex flex-col z-50 overflow-hidden shadow-sm"
            >
                {children}
            </motion.aside>
        );
    };

    const content = (
        <>
            <div className="px-8 mb-16 mt-12 flex items-center justify-between shrink-0 h-16">
                <AnimatePresence mode="wait">
                    {expanded ? (
                        <motion.h1
                            key="expanded-logo"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="text-5xl font-black bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent whitespace-nowrap"
                        >
                            TitanBumi
                        </motion.h1>
                    ) : (
                        <motion.div
                            key="collapsed-logo"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            className="w-16 h-16 rounded-3xl bg-primary flex items-center justify-center text-primary-foreground text-3xl font-black shrink-0 shadow-2xl shadow-primary/40"
                        >
                            T
                        </motion.div>
                    )}
                </AnimatePresence>

                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="hidden md:flex p-2 hover:bg-accent rounded-xl text-muted-foreground hover:text-foreground transition-colors"
                >
                    <LayoutDashboard className="w-6 h-6" />
                </button>
            </div>

            <div className="flex-1 px-2 space-y-6 overflow-y-auto no-scrollbar pb-10">
                {MENU_GROUPS.map((group) => (
                    <GroupComponent
                        key={group.group_name}
                        group={group}
                        pathname={pathname}
                        isCollapsed={!expanded}
                        onMobileClose={onMobileClose}
                    />
                ))}
            </div>

            <div className="p-6 border-t border-border shrink-0 bg-background/50 backdrop-blur-sm">
                <button
                    onClick={() => router.push('/login')}
                    className={cn(
                        "flex items-center p-6 w-full rounded-3xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-300 group min-h-[90px]",
                        !expanded && "justify-center px-0"
                    )}
                >
                    <div className="flex items-center shrink-0 w-10 h-10 justify-center">
                        <LogOut className="w-9 h-9 shrink-0 group-hover:scale-110 transition-transform" />
                    </div>
                    <AnimatePresence>
                        {expanded && (
                            <motion.span
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                className="ml-6 font-black text-2xl whitespace-nowrap overflow-hidden"
                            >
                                Logout
                            </motion.span>
                        )}
                    </AnimatePresence>
                </button>
            </div>
        </>
    );

    return (
        <>
            {/* Desktop */}
            <SidebarWrapper>{content}</SidebarWrapper>

            {/* Mobile */}
            <AnimatePresence>
                {isMobileOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={onMobileClose}
                            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 md:hidden"
                        />
                        <SidebarWrapper isMobile>{content}</SidebarWrapper>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
