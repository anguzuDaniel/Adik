"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Plus, Calendar, Loader2, BookHeart } from "lucide-react";
import { useState } from "react";
import { EntryModal } from "@/components/dashboard/journal/EntryModal";
import { useAuth } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";
import { GET_USER_JOURNALS_QUERY } from "@/lib/graphql/queries";

function getSentimentLabel(score: number | null | undefined): { label: string; color: string } {
    if (score == null) return { label: "Neutral", color: "text-zinc-400" };
    if (score >= 0.6) return { label: "Positive", color: "text-emerald-400" };
    if (score >= 0.3) return { label: "Okay", color: "text-amber-400" };
    return { label: "Low", color: "text-red-400" };
}

function formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
        return `Today, ${date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}`;
    }
    if (diffDays === 1) {
        return `Yesterday, ${date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}`;
    }
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function JournalPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user } = useAuth();

    const { data, isLoading, refetch } = useQuery({
        queryKey: ["journals", user?.id],
        queryFn: fetcher<{ getJournalByUserId: any[] }>(GET_USER_JOURNALS_QUERY, { userId: user?.id }),
        enabled: !!user?.id,
    });

    const entries = data?.getJournalByUserId ?? [];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <h1 className="text-3xl font-bold tracking-tight text-white">Journal</h1>
                    <p className="text-zinc-400">
                        Track your thoughts and emotional journey.
                        {entries.length > 0 && (
                            <span className="text-zinc-500"> — {entries.length} {entries.length === 1 ? "entry" : "entries"} total</span>
                        )}
                    </p>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <Button onClick={() => setIsModalOpen(true)} className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20">
                        <Plus className="w-4 h-4 mr-2" />
                        New Entry
                    </Button>
                </motion.div>
            </div>

            {isLoading ? (
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="h-8 w-8 text-zinc-500 animate-spin" />
                </div>
            ) : entries.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center py-20 text-zinc-500"
                >
                    <BookHeart className="h-16 w-16 mb-4 opacity-30" />
                    <p className="text-lg font-medium">No journal entries yet</p>
                    <p className="text-sm mt-1">Click &quot;New Entry&quot; to start your wellness journey</p>
                </motion.div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {entries.map((entry: any, index: number) => {
                        const sentiment = getSentimentLabel(entry.sentimentScore);
                        return (
                            <motion.div
                                key={entry.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <Card className="premium-card h-full border-white/5 bg-zinc-900/50 hover:border-blue-500/30 group">
                                    <CardHeader>
                                        <div className="flex justify-between items-start mb-2">
                                            <div className={`text-xs font-medium px-2 py-1 rounded-full bg-white/5 ${sentiment.color}`}>
                                                {sentiment.label}
                                            </div>
                                            <Calendar className="w-4 h-4 text-zinc-600" />
                                        </div>
                                        <CardTitle className="text-white group-hover:text-blue-400 transition-colors text-base line-clamp-1">
                                            {entry.content.slice(0, 50)}
                                        </CardTitle>
                                        <CardDescription className="text-zinc-500">
                                            {formatDate(entry.createdAt)}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-zinc-400 text-sm line-clamp-3">
                                            {entry.content}
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        );
                    })}

                    {/* Add Entry Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: entries.length * 0.05 }}
                        className="flex h-full min-h-[200px]"
                    >
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="w-full h-full rounded-xl border border-dashed border-zinc-800 bg-white/0 hover:bg-white/5 hover:border-zinc-700 transition-all flex flex-col items-center justify-center gap-4 group"
                        >
                            <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Plus className="w-6 h-6 text-zinc-500 group-hover:text-white" />
                            </div>
                            <span className="text-zinc-500 font-medium group-hover:text-white">Create New Entry</span>
                        </button>
                    </motion.div>
                </div>
            )}

            <EntryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={() => refetch()}
            />
        </div>
    );
}
