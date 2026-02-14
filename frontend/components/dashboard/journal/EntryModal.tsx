"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Smile, Meh, Frown, Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { graphQLClient } from "@/lib/fetcher";
import { CREATE_JOURNAL_MUTATION } from "@/lib/graphql/mutations";
import { getErrorMessage } from "@/lib/utils";

interface EntryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

const moods = [
    { icon: Frown, label: "Bad", score: 0.1, color: "text-red-400", ring: "ring-red-500/20", bg: "bg-red-500/10", border: "border-red-500" },
    { icon: Meh, label: "Okay", score: 0.5, color: "text-amber-400", ring: "ring-amber-500/20", bg: "bg-amber-500/10", border: "border-amber-500" },
    { icon: Smile, label: "Good", score: 0.9, color: "text-emerald-400", ring: "ring-emerald-500/20", bg: "bg-emerald-500/10", border: "border-emerald-500" },
];

export function EntryModal({ isOpen, onClose, onSuccess }: EntryModalProps) {
    const [selectedMood, setSelectedMood] = useState<string | null>(null);
    const [content, setContent] = useState("");
    const [error, setError] = useState("");

    const { mutate, isPending } = useMutation({
        mutationFn: async () => {
            const token = localStorage.getItem("token");
            if (token) {
                graphQLClient.setHeader("Authorization", `Bearer ${token}`);
            }
            const moodObj = moods.find(m => m.label === selectedMood);
            return graphQLClient.request(CREATE_JOURNAL_MUTATION, {
                createJournalInput: {
                    content,
                    sentimentScore: moodObj?.score ?? undefined,
                },
            });
        },
        onSuccess: () => {
            setContent("");
            setSelectedMood(null);
            setError("");
            onClose();
            onSuccess?.();
        },
        onError: (err: any) => {
            setError(getErrorMessage(err));
        },
    });

    const handleSubmit = () => {
        if (!content.trim()) {
            setError("Please write something before saving.");
            return;
        }
        setError("");
        mutate();
    };

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
                                                        ? `${mood.border} ${mood.bg} ring-2 ${mood.ring}`
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
                                    <Label htmlFor="content" className="text-zinc-300">Reflection</Label>
                                    <textarea
                                        id="content"
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        placeholder="Write about your thoughts, feelings, or experiences..."
                                        className="w-full h-32 px-3 py-2 rounded-md bg-zinc-900/50 border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
                                    />
                                </div>

                                {error && (
                                    <p className="text-sm text-red-400">{error}</p>
                                )}
                            </div>

                            <div className="p-6 border-t border-white/5 bg-zinc-900/30 flex justify-end gap-3">
                                <Button variant="ghost" onClick={onClose} className="text-zinc-400 hover:text-white hover:bg-white/5">
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleSubmit}
                                    disabled={isPending}
                                    className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20 px-8"
                                >
                                    {isPending ? (
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    ) : (
                                        <Save className="w-4 h-4 mr-2" />
                                    )}
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
