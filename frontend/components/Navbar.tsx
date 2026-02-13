"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Logo, LogoText } from "@/components/Logo";

export function Navbar() {
    return (
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

            <div className="flex items-center gap-4">
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
        </motion.nav>
    );
}
