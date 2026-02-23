'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/sidebar';
import { Topbar } from '@/components/topbar';
import { cn } from '@/lib/utils';

export function MainLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row">
            <Sidebar
                onExpand={setIsSidebarExpanded}
                isMobileOpen={isMobileMenuOpen}
                onMobileClose={() => setIsMobileMenuOpen(false)}
            />
            <div className={cn(
                "flex-1 min-w-0 transition-all duration-300 ease-in-out flex flex-col",
                isSidebarExpanded ? "md:ml-[280px]" : "md:ml-20"
            )}>
                <Topbar onMenuClick={() => setIsMobileMenuOpen(true)} />
                <main className="flex-1">
                    {children}
                </main>
            </div>
        </div>
    );
}
