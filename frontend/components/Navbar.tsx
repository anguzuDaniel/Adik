"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Logo, LogoText } from "@/components/Logo";
import { Menu, X } from "lucide-react";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b border-white/5 bg-zinc-950/70 backdrop-blur-md"
            >
                <Link href="/" className="flex items-center gap-2 group">
                    <Logo className="w-8 h-8 transition-transform group-hover:scale-105" />
                    <LogoText />
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-4">
                    <Link href="/login">
                        <Button variant="ghost" className="text-zinc-400 hover:text-white hover:bg-white/5">
                            Log in
                        </Button>
                    </Link>
                    <Link href="/signup">
                        <Button className="bg-blue-600 hover:bg-blue-500 text-white border-0 shadow-lg shadow-blue-500/20">
                            Get Started
                        </Button>
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setIsOpen(true)}
                    className="md:hidden text-zinc-400 hover:text-white"
                >
                    <Menu className="w-6 h-6" />
                </button>
            </motion.nav>

            {/* Mobile Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-zinc-950 flex flex-col"
                    >
                        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                            <div className="flex items-center gap-2">
                                <Logo className="w-8 h-8" />
                                <LogoText />
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-zinc-400 hover:text-white"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="flex flex-col items-center justify-center flex-1 gap-8 p-6">
                            <Link href="/" onClick={() => setIsOpen(false)} className="text-2xl font-medium text-white hover:text-blue-400 transition-colors">
                                Home
                            </Link>
                            <Link href="/features" onClick={() => setIsOpen(false)} className="text-xl font-medium text-zinc-400 hover:text-white transition-colors">
                                Features
                            </Link>
                            <div className="flex flex-col gap-4 w-full max-w-xs mt-8">
                                <Link href="/login" onClick={() => setIsOpen(false)} className="w-full">
                                    <Button variant="outline" className="w-full border-white/10 text-white hover:bg-white/5 py-6 text-lg">
                                        Log in
                                    </Button>
                                </Link>
                                <Link href="/signup" onClick={() => setIsOpen(false)} className="w-full">
                                    <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20 py-6 text-lg">
                                        Get Started
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
