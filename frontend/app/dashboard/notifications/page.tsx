"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, BellOff } from "lucide-react";

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
                    <CardContent>
                        <div className="flex flex-col items-center justify-center py-16 text-zinc-500">
                            <BellOff className="h-16 w-16 mb-4 opacity-30" />
                            <p className="text-lg font-medium">No notifications yet</p>
                            <p className="text-sm mt-1 text-center max-w-xs">
                                Notifications will appear here as you interact with the community, receive messages, and hit milestones.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
