"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo, LogoText } from "@/components/Logo";
import { cn } from "@/lib/utils";
import { sidebarItems } from "@/components/dashboard/Sidebar";

export function MobileSidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    return (
        <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)} className="text-zinc-400 hover:text-white">
                <Menu className="w-5 h-5" />
            </Button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                        />

                        {/* Sidebar Sheet */}
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="fixed inset-y-0 left-0 w-3/4 max-w-xs h-[100dvh] bg-zinc-950 border-r border-white/10 z-50 flex flex-col shadow-2xl"
                        >
                            <div className="p-6 flex items-center justify-between border-b border-white/5">
                                <div className="flex items-center gap-3">
                                    <Logo className="w-8 h-8 rounded-lg" iconClassName="w-4 h-4" />
                                    <LogoText className="text-xl" />
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-zinc-400 hover:text-white">
                                    <X className="w-5 h-5" />
                                </Button>
                            </div>

                            <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                                {sidebarItems.map((item) => {
                                    const isActive = pathname === item.href;
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setIsOpen(false)}
                                            className={cn(
                                                "flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 group",
                                                isActive
                                                    ? "bg-blue-600/10 text-blue-400"
                                                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                                            )}
                                        >
                                            <item.icon className={cn("w-5 h-5", isActive ? "text-blue-400" : "text-zinc-500 group-hover:text-white")} />
                                            {item.label}
                                            {isActive && (
                                                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                                            )}
                                        </Link>
                                    );
                                })}
                            </nav>

                            <div className="p-4 border-t border-white/5 bg-zinc-900/30">
                                <button className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-colors group">
                                    <LogOut className="w-5 h-5 text-zinc-500 group-hover:text-red-400" />
                                    Sign Out
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
