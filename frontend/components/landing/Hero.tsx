"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Background Gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-500/20 blur-[120px] rounded-full opacity-50 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-purple-500/10 blur-[100px] rounded-full opacity-30 pointer-events-none" />

            <div className="container px-4 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-blue-400 mb-8">
                        <Sparkles className="w-4 h-4" />
                        <span>Reimagine your recovery journey</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6">
                        Your Partner in <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                            Mental Wellness
                        </span>
                    </h1>

                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-zinc-400 mb-10 leading-relaxed">
                        Adik connects you with mentors, resources, and a supportive community
                        to help you navigate life's challenges with confidence and clarity.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/signup">
                            <Button size="lg" className="h-12 px-8 bg-blue-600 hover:bg-blue-500 text-white rounded-full text-lg shadow-xl shadow-blue-500/20 transition-all hover:scale-105">
                                Join Now <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </Link>
                        <Link href="/login">
                            <Button size="lg" variant="outline" className="h-12 px-8 border-white/10 bg-white/5 text-white hover:bg-white/10 rounded-full text-lg backdrop-blur-sm">
                                Member Login
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
