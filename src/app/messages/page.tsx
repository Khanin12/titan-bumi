'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const conversations = [
    { id: 1, sender: 'Customer Support', subject: 'Issue regarding my order...', preview: 'Hi, I need help with...', time: '2m ago', unread: true },
    { id: 2, sender: 'Alice Johnson', subject: 'Project Update', preview: 'The project is moving along...', time: '1h ago', unread: false },
    { id: 3, sender: 'Bob Smith', subject: 'Meeting Reminder', preview: 'Don\'t forget about the meeting...', time: '3h ago', unread: false },
    { id: 4, sender: 'Team Lead', subject: 'Weekly Report', preview: 'Please submit your report...', time: '1d ago', unread: true },
    { id: 5, sender: 'HR Department', subject: 'Policy Change', preview: 'There has been a change in...', time: '2d ago', unread: false },
];

export default function MessagesPage() {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const selectedMessage = conversations.find(c => c.id === selectedId);

    return (
        <>
            <div className="p-6 space-y-8 h-[calc(100vh-64px)] flex flex-col">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="shrink-0">
                    <h2 className="text-3xl font-bold tracking-tight">Messages</h2>
                    <p className="text-muted-foreground">Catch up with your recent conversations.</p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 min-h-0">
                    <div className="lg:col-span-1 bg-card border border-border rounded-2xl p-4 overflow-y-auto no-scrollbar flex flex-col gap-2">
                        <h3 className="font-bold mb-2 px-2">Inbox</h3>
                        {conversations.map((msg) => (
                            <div
                                key={msg.id}
                                onClick={() => setSelectedId(msg.id)}
                                className={cn(
                                    "p-3 rounded-xl cursor-pointer transition-colors relative",
                                    selectedId === msg.id ? "bg-primary text-primary-foreground" : "bg-accent hover:bg-accent/80"
                                )}
                            >
                                <div className="flex justify-between items-start mb-1">
                                    <p className="text-sm font-bold truncate">{msg.sender}</p>
                                    <p className={cn("text-xs opacity-70", selectedId === msg.id ? "text-primary-foreground" : "text-muted-foreground")}>{msg.time}</p>
                                </div>
                                <p className={cn("text-xs truncate", selectedId === msg.id ? "opacity-90" : "text-muted-foreground")}>{msg.subject}</p>
                                {msg.unread && selectedId !== msg.id && (
                                    <div className="absolute right-3 bottom-3 w-2 h-2 rounded-full bg-primary" />
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="lg:col-span-3 bg-card border border-border rounded-2xl flex flex-col overflow-hidden">
                        <AnimatePresence mode="wait">
                            {selectedMessage ? (
                                <motion.div
                                    key={selectedMessage.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="flex flex-col h-full"
                                >
                                    <div className="p-6 border-b border-border flex items-center justify-between bg-accent/30">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                                <User className="w-5 h-5 text-primary" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-lg">{selectedMessage.sender}</h3>
                                                <p className="text-sm text-muted-foreground">{selectedMessage.subject}</p>
                                            </div>
                                        </div>
                                        <span className="text-xs text-muted-foreground">{selectedMessage.time}</span>
                                    </div>

                                    <div className="flex-1 p-6 overflow-y-auto">
                                        <div className="p-4 bg-accent/50 rounded-2xl max-w-2xl">
                                            <p className="leading-relaxed">
                                                {selectedMessage.preview} <br /><br />
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="p-4 border-t border-border bg-background">
                                        <div className="flex gap-4">
                                            <input
                                                type="text"
                                                placeholder="Type your reply..."
                                                className="flex-1 px-4 py-3 bg-accent rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                                            />
                                            <button className="p-3 bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-opacity">
                                                <Send className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex flex-col items-center justify-center p-8 text-center h-full"
                                >
                                    <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mb-4">
                                        <Mail className="w-8 h-8 text-muted-foreground" />
                                    </div>
                                    <h3 className="text-xl font-bold">Select a message</h3>
                                    <p className="text-muted-foreground max-w-xs mt-2">Select a conversation on the left to start reading and replying.</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </>
    );
}
