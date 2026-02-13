"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Smile, Meh, Frown, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface EntryModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const moods = [
    { icon: Frown, label: "Bad", color: "text-red-400", bg: "bg-red-400/10" },
    { icon: Meh, label: "Okay", color: "text-amber-400", bg: "bg-amber-400/10" },
    { icon: Smile, label: "Good", color: "text-emerald-400", bg: "bg-emerald-400/10" },
];

export function EntryModal({ isOpen, onClose }: EntryModalProps) {
    const [selectedMood, setSelectedMood] = useState<string | null>(null);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-lg bg-zinc-950 border border-white/10 rounded-2xl shadow-2xl overflow-hidden relative"
                        >
                            <div className="flex items-center justify-between p-6 border-b border-white/5 bg-zinc-900/30">
                                <h2 className="text-xl font-semibold text-white">New Journal Entry</h2>
                                <Button variant="ghost" size="icon" onClick={onClose} className="text-zinc-400 hover:text-white hover:bg-white/5 rounded-full">
                                    <X className="w-5 h-5" />
                                </Button>
                            </div>

                            <div className="p-6 space-y-6">
                                <div className="space-y-2">
                                    <Label className="text-zinc-300">How are you feeling?</Label>
                                    <div className="flex gap-4">
                                        {moods.map((mood) => (
                                            <button
                                                key={mood.label}
                                                onClick={() => setSelectedMood(mood.label)}
                                                className={`flex-1 p-4 rounded-xl border transition-all flex flex-col items-center gap-2 ${selectedMood === mood.label
                                                        ? `border-${mood.color.split("-")[1]}-500 bg-${mood.color.split("-")[1]}-500/10 ring-2 ring-${mood.color.split("-")[1]}-500/20`
                                                        : "border-white/5 bg-zinc-900/50 hover:bg-zinc-800"
                                                    }`}
                                            >
                                                <mood.icon className={`w-8 h-8 ${mood.color}`} />
                                                <span className="text-sm font-medium text-white">{mood.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="title" className="text-zinc-300">Title</Label>
                                    <Input id="title" placeholder="Give your day a headline..." className="bg-zinc-900/50 border-white/10 text-white placeholder:text-zinc-600 focus-visible:ring-blue-500/50" />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="content" className="text-zinc-300">Reflection</Label>
                                    <textarea
                                        id="content"
                                        placeholder="Write about your thoughts, feelings, or experiences..."
                                        className="w-full h-32 px-3 py-2 rounded-md bg-zinc-900/50 border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
                                    />
                                </div>
                            </div>

                            <div className="p-6 border-t border-white/5 bg-zinc-900/30 flex justify-end gap-3">
                                <Button variant="ghost" onClick={onClose} className="text-zinc-400 hover:text-white hover:bg-white/5">
                                    Cancel
                                </Button>
                                <Button className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20 px-8">
                                    <Save className="w-4 h-4 mr-2" />
                                    Save Entry
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
