"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Calendar, TrendingUp, Smile } from "lucide-react";

const stats = [
    {
        title: "Mood Tracker",
        value: "Stable",
        change: "+12% vs last week",
        icon: Smile,
        color: "text-emerald-400",
        bg: "bg-emerald-400/10",
    },
    {
        title: "Journal Entries",
        value: "24",
        change: "3 this week",
        icon: BookHeartIcon, // Will define or import locally if needed, but BookHeart is in lucide. Using a placeholder for now or re-import.
        color: "text-blue-400",
        bg: "bg-blue-400/10",
    },
    {
        title: "Community Impact",
        value: "High",
        change: "Top 5% contributor",
        icon: TrendingUp,
        color: "text-purple-400",
        bg: "bg-purple-400/10",
    },
    {
        title: "Upcoming Sessions",
        value: "2",
        change: "Next: Tomorrow, 10AM",
        icon: Calendar,
        color: "text-amber-400",
        bg: "bg-amber-400/10",
    },
];

// Helper for icon since I can't easily import conditionally inside the array definition without clean code
import { BookHeart as BookHeartIcon } from "lucide-react";

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            {/* Greeting */}
            <div className="flex flex-col gap-2">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl font-bold tracking-tight text-white"
                >
                    Good Morning, User
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
                                <div className="text-2xl font-bold text-white">{stat.value}</div>
                                <p className="text-xs text-zinc-500 mt-1">
                                    {stat.change}
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Main Content Area - Split 2/3 and 1/3 */}
            <div className="grid gap-6 md:grid-cols-7">
                <motion.div
                    className="md:col-span-4 lg:col-span-5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <Card className="premium-card h-[400px] border-white/5 bg-zinc-900/50">
                        <CardHeader>
                            <CardTitle className="text-white">Activity Overview</CardTitle>
                        </CardHeader>
                        <CardContent className="flex items-center justify-center h-[300px] text-zinc-500">
                            Chart Placeholder (Recharts Integration)
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
                            <CardTitle className="text-white">Daily Focus</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {[1, 2, 3].map((_, i) => (
                                <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer border border-white/5">
                                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                                    <div>
                                        <p className="text-sm font-medium text-white">Meditation Session</p>
                                        <p className="text-xs text-zinc-500">10:00 AM - 10:30 AM</p>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
