"use client";

import { motion, AnimatePresence } from "framer-motion";
import { User, Settings, LogOut, HelpCircle, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function ProfileDropdown() {
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

    const menuItems = [
        { icon: User, label: "My Profile", href: "/dashboard/settings" },
        { icon: Settings, label: "Settings", href: "/dashboard/settings" },
        { icon: HelpCircle, label: "Help Center", href: "/help" },
    ];

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative group focus:outline-none"
            >
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 ring-2 ring-white/10 group-hover:ring-blue-500/50 transition-all flex items-center justify-center text-xs font-bold text-white shadow-lg shadow-blue-500/20">
                    KD
                </div>
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-zinc-950" />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-56 rounded-xl border border-white/10 bg-zinc-950 shadow-2xl z-50 overflow-hidden"
                    >
                        <div className="p-4 border-b border-white/5 bg-zinc-900/50">
                            <p className="font-medium text-white">Kenyi Dev</p>
                            <p className="text-xs text-zinc-400">kenyi@example.com</p>
                        </div>

                        <div className="p-2 space-y-1">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-3 px-3 py-2 text-sm text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                                >
                                    <item.icon className="w-4 h-4" />
                                    {item.label}
                                </Link>
                            ))}
                        </div>

                        <div className="p-2 border-t border-white/5 bg-zinc-900/30">
                            <button
                                onClick={() => console.log("Sign out")}
                                className="flex w-full items-center gap-3 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                            >
                                <LogOut className="w-4 h-4" />
                                Sign Out
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
