"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Heart, Share2, Users, Loader2, Star, Tag } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";
import { GET_COMMUNITIES_QUERY } from "@/lib/graphql/queries";
import { useAuth } from "@/context/AuthContext";

const avatarColors = [
    "bg-pink-500", "bg-blue-500", "bg-emerald-500", "bg-purple-500",
    "bg-amber-500", "bg-cyan-500", "bg-rose-500", "bg-indigo-500",
];

export default function CommunityPage() {
    const { user } = useAuth();

    const { data, isLoading } = useQuery({
        queryKey: ["communities"],
        queryFn: fetcher<{ communities: any[] }>(GET_COMMUNITIES_QUERY),
        enabled: !!user?.id,
    });

    const communities = data?.communities ?? [];

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-2">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl font-bold text-white relative inline-block"
                >
                    Community
                    {communities.length > 0 && (
                        <span className="absolute -top-1 -right-3 text-xs font-normal px-1.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400">
                            {communities.length}
                        </span>
                    )}
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-zinc-400"
                >
                    Connect, share, and grow with others on their recovery journey.
                </motion.p>
            </div>

            {isLoading ? (
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="h-8 w-8 text-zinc-500 animate-spin" />
                </div>
            ) : communities.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center py-20 text-zinc-500"
                >
                    <Users className="h-16 w-16 mb-4 opacity-30" />
                    <p className="text-lg font-medium">No communities yet</p>
                    <p className="text-sm mt-1">Communities will appear here once they&apos;re created</p>
                </motion.div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2">
                    {communities.map((community: any, index: number) => (
                        <motion.div
                            key={community.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.08 }}
                        >
                            <Card className="premium-card border-white/5 bg-zinc-900/30 hover:border-blue-500/20 transition-all group">
                                <CardContent className="p-6 space-y-4">
                                    {/* Header */}
                                    <div className="flex items-start gap-4">
                                        <div className={`w-12 h-12 rounded-xl ${avatarColors[index % avatarColors.length]} flex items-center justify-center text-white font-bold text-lg shrink-0`}>
                                            {community.name?.[0]?.toUpperCase() || "C"}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-white text-lg group-hover:text-blue-400 transition-colors truncate">
                                                {community.name}
                                            </h3>
                                            <p className="text-sm text-zinc-500 line-clamp-2 mt-1">
                                                {community.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Tags */}
                                    {community.groupTags?.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {community.groupTags.slice(0, 3).map((tag: string) => (
                                                <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full bg-white/5 text-zinc-400">
                                                    <Tag className="w-3 h-3" />
                                                    {tag}
                                                </span>
                                            ))}
                                            {community.groupTags.length > 3 && (
                                                <span className="text-xs text-zinc-500">+{community.groupTags.length - 3} more</span>
                                            )}
                                        </div>
                                    )}

                                    {/* Stats */}
                                    <div className="flex items-center gap-6 pt-3 border-t border-white/5 text-zinc-500">
                                        <div className="flex items-center gap-2">
                                            <Users className="w-4 h-4" />
                                            <span className="text-sm">{community.memberNumber} members</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Star className="w-4 h-4 text-amber-400/70" />
                                            <span className="text-sm">{community.rating?.toFixed(1) || "—"}</span>
                                        </div>
                                        <div className="ml-auto">
                                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${community.isActive
                                                    ? "bg-emerald-400/10 text-emerald-400"
                                                    : "bg-zinc-700/50 text-zinc-500"
                                                }`}>
                                                {community.isActive ? "Active" : "Inactive"}
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
