"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { PlayCircle, FileText, ArrowUpRight, Loader2, BookOpen } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";
import { GET_RESOURCES_QUERY } from "@/lib/graphql/queries";
import { useAuth } from "@/context/AuthContext";

const typeConfig: Record<string, { icon: any; color: string }> = {
    ARTICLE: { icon: FileText, color: "text-blue-400" },
    VIDEO: { icon: PlayCircle, color: "text-red-400" },
    PODCAST: { icon: PlayCircle, color: "text-purple-400" },
    GUIDE: { icon: FileText, color: "text-emerald-400" },
};

function getTypeDisplay(type: string) {
    return typeConfig[type] || { icon: FileText, color: "text-zinc-400" };
}

export default function ResourcesPage() {
    const { user } = useAuth();

    const { data, isLoading } = useQuery({
        queryKey: ["resources"],
        queryFn: fetcher<{ resources: any[] }>(GET_RESOURCES_QUERY),
        enabled: !!user?.id,
    });

    const resources = data?.resources ?? [];

    // Group by type
    const grouped = resources.reduce((acc: Record<string, any[]>, r: any) => {
        const type = r.type || "OTHER";
        if (!acc[type]) acc[type] = [];
        acc[type].push(r);
        return acc;
    }, {});
    const groupedEntries = Object.entries(grouped);

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
                <p className="text-zinc-400">
                    Curated materials to support your mental health.
                    {resources.length > 0 && (
                        <span className="text-zinc-500"> — {resources.length} available</span>
                    )}
                </p>
            </div>

            {isLoading ? (
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="h-8 w-8 text-zinc-500 animate-spin" />
                </div>
            ) : resources.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center py-20 text-zinc-500"
                >
                    <BookOpen className="h-16 w-16 mb-4 opacity-30" />
                    <p className="text-lg font-medium">No resources yet</p>
                    <p className="text-sm mt-1">Resources will appear here once they&apos;re added</p>
                </motion.div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {groupedEntries.map(([type, items], sectionIndex) => {
                        const display = getTypeDisplay(type);
                        const Icon = display.icon;
                        return (
                            <motion.div
                                key={type}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: sectionIndex * 0.1 }}
                            >
                                <div className="space-y-4">
                                    <h2 className="text-xl font-semibold text-white pl-1 capitalize">
                                        {type.toLowerCase().replace(/_/g, " ")}s
                                    </h2>
                                    {(items as any[]).map((item: any) => (
                                        <a
                                            key={item.id}
                                            href={item.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <Card className="premium-card group border-white/5 bg-zinc-900/50 hover:bg-zinc-900/80 cursor-pointer mb-4">
                                                <CardContent className="p-4">
                                                    <div className="flex justify-between items-start mb-3">
                                                        <div className={`p-2 rounded-lg bg-white/5 ${display.color}`}>
                                                            <Icon className="w-5 h-5" />
                                                        </div>
                                                        <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-white transition-colors" />
                                                    </div>
                                                    <CardTitle className="text-base text-white mb-1 group-hover:text-blue-400 transition-colors">
                                                        {item.title}
                                                    </CardTitle>
                                                    <div className="flex items-center gap-2 text-xs text-zinc-500">
                                                        <span className="capitalize">{type.toLowerCase()}</span>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </a>
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
