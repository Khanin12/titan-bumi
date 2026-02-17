'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Info, XCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ToastType = 'success' | 'info' | 'destructive';

interface ToastProps {
    message: string;
    type: ToastType;
    isVisible: boolean;
    onClose: () => void;
    duration?: number;
}

export const Toast = ({ message, type, isVisible, onClose, duration = 3000 }: ToastProps) => {
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        if (isVisible) {
            setProgress(100);
            const interval = 10;
            const step = (interval / duration) * 100;

            const timer = setInterval(() => {
                setProgress((prev) => {
                    const next = prev - step;
                    return next > 0 ? next : 0;
                });
            }, interval);

            return () => clearInterval(timer);
        }
    }, [isVisible, duration, message, type]);

    // Handle auto-close separately from state update to avoid React warnings
    useEffect(() => {
        if (isVisible && progress <= 0) {
            onClose();
        }
    }, [progress, isVisible, onClose]);

    const icons = {
        success: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
        info: <Info className="w-5 h-5 text-blue-500" />,
        destructive: <XCircle className="w-5 h-5 text-rose-500" />,
    };

    const colors = {
        success: "border-emerald-500/20 bg-emerald-500/10",
        info: "border-blue-500/20 bg-blue-500/10",
        destructive: "border-rose-500/20 bg-rose-500/10",
    };

    const progressColors = {
        success: "bg-emerald-500",
        info: "bg-blue-500",
        destructive: "bg-rose-500",
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                    className={cn(
                        "fixed bottom-6 right-6 z-[100] min-w-[300px] max-w-md p-4 rounded-2xl border backdrop-blur-md shadow-2xl flex items-center gap-4",
                        colors[type]
                    )}
                >
                    <div className="shrink-0">
                        {icons[type]}
                    </div>
                    <div className="flex-1 text-sm font-medium">
                        {message}
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors"
                    >
                        <X className="w-4 h-4 opacity-50 hover:opacity-100" />
                    </button>

                    {/* Progress Bar */}
                    <div className="absolute bottom-0 left-0 h-1 bg-black/5 dark:bg-white/5 w-full overflow-hidden rounded-b-2xl">
                        <motion.div
                            className={cn("h-full", progressColors[type])}
                            initial={{ width: "100%" }}
                            animate={{ width: `${progress}%` }}
                            transition={{ ease: "linear" }}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
