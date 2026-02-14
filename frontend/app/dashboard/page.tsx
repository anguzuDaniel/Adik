"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, TrendingUp, Smile, BookHeart, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";
import { GET_USER_JOURNALS_QUERY, GET_COMMUNITIES_QUERY } from "@/lib/graphql/queries";

function getGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
}

function getAverageSentiment(journals: any[]): { label: string; change: string } {
    if (!journals.length) return { label: "No data", change: "Start journaling" };
    const scored = journals.filter((j: any) => j.sentimentScore != null);
    if (!scored.length) return { label: "Neutral", change: `${journals.length} entries` };
    const avg = scored.reduce((sum: number, j: any) => sum + j.sentimentScore, 0) / scored.length;
    if (avg >= 0.6) return { label: "Positive", change: `Avg ${(avg * 100).toFixed(0)}% positive` };
    if (avg >= 0.3) return { label: "Stable", change: `Avg ${(avg * 100).toFixed(0)}% positive` };
    return { label: "Improving", change: "Keep going!" };
}

function getRecentCount(journals: any[], days: number): number {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);
    return journals.filter((j: any) => new Date(j.createdAt) >= cutoff).length;
}

export default function DashboardPage() {
    const { user } = useAuth();
    const displayName = user?.username || user?.email?.split("@")[0] || "there";

    const { data: journalData, isLoading: journalsLoading } = useQuery({
        queryKey: ["journals", user?.id],
        queryFn: fetcher<{ getJournalByUserId: any[] }>(GET_USER_JOURNALS_QUERY, { userId: user?.id }),
        enabled: !!user?.id,
    });

    const { data: communityData, isLoading: communitiesLoading } = useQuery({
        queryKey: ["communities"],
        queryFn: fetcher<{ communities: any[] }>(GET_COMMUNITIES_QUERY),
        enabled: !!user?.id,
    });

    const journals = journalData?.getJournalByUserId ?? [];
    const communities = communityData?.communities ?? [];
    const mood = getAverageSentiment(journals);
    const thisWeekJournals = getRecentCount(journals, 7);

    const stats = [
        {
            title: "Mood Tracker",
            value: mood.label,
            change: mood.change,
            icon: Smile,
            color: "text-emerald-400",
            bg: "bg-emerald-400/10",
            loading: journalsLoading,
        },
        {
            title: "Journal Entries",
            value: String(journals.length),
            change: thisWeekJournals > 0 ? `${thisWeekJournals} this week` : "None this week",
            icon: BookHeart,
            color: "text-blue-400",
            bg: "bg-blue-400/10",
            loading: journalsLoading,
        },
        {
            title: "Communities",
            value: String(communities.length),
            change: communities.length > 0 ? "Active" : "Join a community",
            icon: TrendingUp,
            color: "text-purple-400",
            bg: "bg-purple-400/10",
            loading: communitiesLoading,
        },
        {
            title: "Upcoming Sessions",
            value: "0",
            change: "No sessions scheduled",
            icon: Calendar,
            color: "text-amber-400",
            bg: "bg-amber-400/10",
            loading: false,
        },
    ];

    return (
        <div className="space-y-8">
            {/* Greeting */}
            <div className="flex flex-col gap-2">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl font-bold tracking-tight text-white"
                >
                    {getGreeting()}, {displayName}
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-zinc-400"
                >
                    Here&apos;s an overview of your wellness journey today.
                </motion.p>
            </div>

            {/* User Info Card */}
            {user && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                >
                    <Card className="premium-card border-white/5 bg-zinc-900/50">
                        <CardContent className="flex items-center gap-5 p-5">
                            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-lg font-bold text-white shadow-lg shadow-blue-500/20 shrink-0">
                                {displayName
                                    .split(/[\s._-]+/)
                                    .map((w: string) => w[0]?.toUpperCase())
                                    .join("")
                                    .slice(0, 2)}
                            </div>
                            <div className="flex-1 min-w-0 space-y-1">
                                <p className="text-lg font-semibold text-white truncate">{displayName}</p>
                                <p className="text-sm text-zinc-400 truncate">{user.email}</p>
                            </div>
                            <div className="flex flex-col items-end gap-1.5 shrink-0">
                                <span className="px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider rounded-full bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/20">
                                    {user.role}
                                </span>
                                <span className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20">
                                    {user.recoveryStage?.replace(/_/g, " ") || "Active"}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            )}

            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                    >
                        <Card className="premium-card border-white/5 bg-zinc-900/50">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-zinc-400">
                                    {stat.title}
                                </CardTitle>
                                <div className={`p-2 rounded-lg ${stat.bg}`}>
                                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                                </div>
                            </CardHeader>
                            <CardContent>
                                {stat.loading ? (
                                    <Loader2 className="h-6 w-6 text-zinc-500 animate-spin" />
                                ) : (
                                    <>
                                        <div className="text-2xl font-bold text-white">{stat.value}</div>
                                        <p className="text-xs text-zinc-500 mt-1">{stat.change}</p>
                                    </>
                                )}
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Main Content Area */}
            <div className="grid gap-6 md:grid-cols-7">
                <motion.div
                    className="md:col-span-4 lg:col-span-5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <Card className="premium-card h-[400px] border-white/5 bg-zinc-900/50">
                        <CardHeader>
                            <CardTitle className="text-white">Recent Journals</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 overflow-y-auto max-h-[320px]">
                            {journalsLoading ? (
                                <div className="flex items-center justify-center h-[280px]">
                                    <Loader2 className="h-8 w-8 text-zinc-500 animate-spin" />
                                </div>
                            ) : journals.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-[280px] text-zinc-500">
                                    <BookHeart className="h-12 w-12 mb-3 opacity-30" />
                                    <p className="text-sm">No journal entries yet</p>
                                    <p className="text-xs mt-1">Start writing to track your journey</p>
                                </div>
                            ) : (
                                journals.slice(0, 6).map((journal: any) => (
                                    <div
                                        key={journal.id}
                                        className="p-3 rounded-lg hover:bg-white/5 transition-colors border border-white/5"
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <p className="text-sm text-white line-clamp-2 flex-1">
                                                {journal.content}
                                            </p>
                                            {journal.sentimentScore != null && (
                                                <span className={`text-xs shrink-0 px-2 py-0.5 rounded-full ${journal.sentimentScore >= 0.6
                                                        ? "bg-emerald-500/10 text-emerald-400"
                                                        : journal.sentimentScore >= 0.3
                                                            ? "bg-amber-500/10 text-amber-400"
                                                            : "bg-red-500/10 text-red-400"
                                                    }`}>
                                                    {(journal.sentimentScore * 100).toFixed(0)}%
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-xs text-zinc-500 mt-1.5">
                                            {new Date(journal.createdAt).toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                                year: "numeric",
                                            })}
                                        </p>
                                    </div>
                                ))
                            )}
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div
                    className="md:col-span-3 lg:col-span-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                >
                    <Card className="premium-card h-[400px] border-white/5 bg-zinc-900/50">
                        <CardHeader>
                            <CardTitle className="text-white">Communities</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 overflow-y-auto max-h-[320px]">
                            {communitiesLoading ? (
                                <div className="flex items-center justify-center h-[280px]">
                                    <Loader2 className="h-8 w-8 text-zinc-500 animate-spin" />
                                </div>
                            ) : communities.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-[280px] text-zinc-500">
                                    <TrendingUp className="h-12 w-12 mb-3 opacity-30" />
                                    <p className="text-sm">No communities yet</p>
                                    <p className="text-xs mt-1">Join one to connect</p>
                                </div>
                            ) : (
                                communities.map((c: any) => (
                                    <div key={c.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer border border-white/5">
                                        <div className="w-2 h-2 rounded-full bg-purple-500" />
                                        <p className="text-sm font-medium text-white">{c.name}</p>
                                    </div>
                                ))
                            )}
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
