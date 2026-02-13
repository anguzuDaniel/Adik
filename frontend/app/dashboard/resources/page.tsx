"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlayCircle, FileText, Headphones, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const resources = [
    {
        category: "Guides",
        items: [
            { title: "Understanding Anxiety Triggers", type: "Article", duration: "5 min read", icon: FileText, color: "text-blue-400" },
            { title: "The Art of Mindful Breathing", type: "Guide", duration: "10 min read", icon: FileText, color: "text-blue-400" },
        ]
    },
    {
        category: "Audio & Meditation",
        items: [
            { title: "Deep Sleep Release", type: "Meditation", duration: "20 min", icon: Headphones, color: "text-purple-400" },
            { title: "Morning Affirmations", type: "Audio", duration: "5 min", icon: Headphones, color: "text-purple-400" },
        ]
    },
    {
        category: "Video Series",
        items: [
            { title: "Coping Strategies 101", type: "Video", duration: "15 min", icon: PlayCircle, color: "text-red-400" },
            { title: "Building Resilience", type: "Workshop", duration: "45 min", icon: PlayCircle, color: "text-red-400" },
        ]
    }
];

export default function ResourcesPage() {
    return (
        <div className="space-y-8">
            <div className="space-y-2">
                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-3xl font-bold tracking-tight text-white"
                >
                    Resources
                </motion.h1>
                <p className="text-zinc-400">Curated materials to support your mental health.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {resources.map((section, sectionIndex) => (
                    <motion.div
                        key={section.category}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: sectionIndex * 0.1 }}
                    >
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold text-white pl-1">{section.category}</h2>
                            {section.items.map((item, itemIndex) => (
                                <Card key={item.title} className="premium-card group border-white/5 bg-zinc-900/50 hover:bg-zinc-900/80 cursor-pointer">
                                    <CardHeader className="pb-2">
                                        <div className="flex justify-between items-start">
                                            <div className={`p-2 rounded-lg bg-white/5 ${item.color}`}>
                                                <item.icon className="w-5 h-5" />
                                            </div>
                                            <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-white transition-colors" />
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <CardTitle className="text-base text-white mb-1 group-hover:text-blue-400 transition-colors">{item.title}</CardTitle>
                                        <div className="flex items-center gap-2 text-xs text-zinc-500">
                                            <span>{item.type}</span>
                                            <span>•</span>
                                            <span>{item.duration}</span>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
