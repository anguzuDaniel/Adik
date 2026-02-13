"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Bell, Check, Clock, MessageSquare, Heart, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const notifications = [
    {
        id: 1,
        type: "like",
        user: "Sarah Jenkins",
        action: "liked your journal entry",
        target: "Morning Reflection",
        time: "2 min ago",
        read: false,
        icon: Heart,
        color: "text-rose-400",
        bg: "bg-rose-400/10",
    },
    {
        id: 2,
        type: "comment",
        user: "David Chen",
        action: "commented on",
        target: "Weekly Goals",
        time: "1 hour ago",
        read: false,
        icon: MessageSquare,
        color: "text-blue-400",
        bg: "bg-blue-400/10",
    },
    {
        id: 3,
        type: "system",
        user: "System",
        action: "Backup completed successfully",
        target: "",
        time: "3 hours ago",
        read: true,
        icon: ShieldAlert,
        color: "text-emerald-400",
        bg: "bg-emerald-400/10",
    },
];

export function NotificationDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const unreadCount = notifications.filter((n) => !n.read).length;

    return (
        <div className="relative" ref={dropdownRef}>
            <Button
                size="icon"
                variant="ghost"
                className="text-zinc-400 hover:text-white hover:bg-white/5 relative"
                onClick={() => setIsOpen(!isOpen)}
            >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                    <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)] animate-pulse" />
                )}
            </Button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-80 md:w-96 rounded-xl border border-white/10 bg-zinc-950 shadow-2xl z-50 overflow-hidden"
                    >
                        <div className="flex items-center justify-between p-4 border-b border-white/5 bg-zinc-900/50">
                            <h3 className="font-semibold text-white">Notifications</h3>
                            <Button variant="ghost" size="sm" className="text-xs text-blue-400 hover:text-blue-300 h-auto p-0">
                                Mark all as read
                            </Button>
                        </div>

                        <ScrollArea className="h-[300px]">
                            <div className="divide-y divide-white/5">
                                {notifications.map((notification) => (
                                    <div
                                        key={notification.id}
                                        className={cn(
                                            "p-4 flex gap-3 transition-colors hover:bg-white/5 cursor-pointer",
                                            !notification.read && "bg-blue-500/5"
                                        )}
                                    >
                                        <div className={cn("mt-1 w-8 h-8 rounded-full flex items-center justify-center shrink-0", notification.bg)}>
                                            <notification.icon className={cn("w-4 h-4", notification.color)} />
                                        </div>
                                        <div className="space-y-1 flex-1">
                                            <p className="text-sm text-zinc-300 leading-snug">
                                                <span className="font-medium text-white">{notification.user}</span>{" "}
                                                {notification.action}{" "}
                                                <span className="text-blue-400">{notification.target}</span>
                                            </p>
                                            <p className="text-xs text-zinc-500 flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {notification.time}
                                            </p>
                                        </div>
                                        {!notification.read && (
                                            <div className="mt-2 w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>

                        <div className="p-3 border-t border-white/5 bg-zinc-900/50">
                            <Button asChild variant="ghost" className="w-full text-sm text-zinc-400 hover:text-white justify-center" onClick={() => setIsOpen(false)}>
                                <Link href="/dashboard/notifications">View all notifications</Link>
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
