"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Bell, Heart, MessageSquare, ShieldAlert, Clock, CheckCircle2, UserPlus, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const allNotifications = [
    {
        id: 1,
        type: "like",
        user: "Sarah Jenkins",
        action: "liked your journal entry",
        target: "Morning Reflection",
        time: "2 min ago",
        read: false,
        icon: Heart,
        color: "text-rose-400",
        bg: "bg-rose-400/10",
    },
    {
        id: 2,
        type: "comment",
        user: "David Chen",
        action: "commented on",
        target: "Weekly Goals",
        time: "1 hour ago",
        read: false,
        icon: MessageSquare,
        color: "text-blue-400",
        bg: "bg-blue-400/10",
    },
    {
        id: 3,
        type: "system",
        user: "System",
        action: "Backup completed successfully",
        target: "",
        time: "3 hours ago",
        read: true,
        icon: ShieldAlert,
        color: "text-emerald-400",
        bg: "bg-emerald-400/10",
    },
    {
        id: 4,
        type: "follow",
        user: "Alex Thompson",
        action: "started following you",
        target: "",
        time: "5 hours ago",
        read: true,
        icon: UserPlus,
        color: "text-purple-400",
        bg: "bg-purple-400/10",
    },
    {
        id: 5,
        type: "milestone",
        user: "System",
        action: "You reached a 7-day streak!",
        target: "",
        time: "1 day ago",
        read: true,
        icon: Star,
        color: "text-amber-400",
        bg: "bg-amber-400/10",
    },
];

export default function NotificationsPage() {
    return (
        <div className="max-w-4xl space-y-6">
            <div className="flex items-center justify-between">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <h1 className="text-3xl font-bold tracking-tight text-white">Notifications</h1>
                    <p className="text-zinc-400">Stay updated with your community and activity.</p>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <Button variant="outline" className="border-white/10 text-zinc-300 hover:text-white hover:bg-white/5">
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Mark all as read
                    </Button>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <Card className="premium-card border-white/5 bg-zinc-900/50">
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <Bell className="w-5 h-5 text-blue-400" />
                            <CardTitle className="text-white">Recent Activity</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-white/5">
                            {allNotifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    className={cn(
                                        "p-4 md:p-6 flex gap-4 transition-colors hover:bg-white/5 cursor-pointer group",
                                        !notification.read && "bg-blue-500/5"
                                    )}
                                >
                                    <div className={cn("w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-transform group-hover:scale-110", notification.bg)}>
                                        <notification.icon className={cn("w-5 h-5", notification.color)} />
                                    </div>
                                    <div className="space-y-1 flex-1">
                                        <div className="flex justify-between items-start">
                                            <p className="text-sm md:text-base text-zinc-300 leading-snug">
                                                <span className="font-semibold text-white">{notification.user}</span>{" "}
                                                {notification.action}{" "}
                                                <span className="text-blue-400 font-medium">{notification.target}</span>
                                            </p>
                                            {!notification.read && (
                                                <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0 mt-2" />
                                            )}
                                        </div>
                                        <p className="text-xs text-zinc-500 flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {notification.time}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
