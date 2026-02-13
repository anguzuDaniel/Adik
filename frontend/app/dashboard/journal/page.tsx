"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Plus, Calendar } from "lucide-react";
import { useState } from "react";
import { EntryModal } from "@/components/dashboard/journal/EntryModal";

const entries = [
    {
        id: 1,
        title: "Morning Reflection",
        preview: "Today I felt a bit anxious about the upcoming meeting, but I managed to calm myself down by...",
        date: "Today, 9:00 AM",
        mood: "Anxious",
        color: "text-amber-400",
    },
    {
        id: 2,
        title: "Gratitude List",
        preview: "1. The sunshine this morning. 2. A good cup of coffee. 3. My supportive friend...",
        date: "Yesterday, 8:30 PM",
        mood: "Grateful",
        color: "text-emerald-400",
    },
    {
        id: 3,
        title: "Weekly Review",
        preview: "This week was challenging but productive. I stuck to my habits mostly, except for...",
        date: "Oct 24, 2024",
        mood: "Productive",
        color: "text-blue-400",
    },
];

export default function JournalPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <h1 className="text-3xl font-bold tracking-tight text-white">Journal</h1>
                    <p className="text-zinc-400">Track your thoughts and emotional journey.</p>
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

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {entries.map((entry, index) => (
                    <motion.div
                        key={entry.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card className="premium-card h-full border-white/5 bg-zinc-900/50 hover:border-blue-500/30 group">
                            <CardHeader>
                                <div className="flex justify-between items-start mb-2">
                                    <div className={`text-xs font-medium px-2 py-1 rounded-full bg-white/5 ${entry.color}`}>
                                        {entry.mood}
                                    </div>
                                    <Calendar className="w-4 h-4 text-zinc-600" />
                                </div>
                                <CardTitle className="text-white group-hover:text-blue-400 transition-colors">{entry.title}</CardTitle>
                                <CardDescription className="text-zinc-500">{entry.date}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-zinc-400 text-sm line-clamp-3">
                                    {entry.preview}
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}

                {/* Add Entry Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: entries.length * 0.1 }}
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

            <EntryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}
