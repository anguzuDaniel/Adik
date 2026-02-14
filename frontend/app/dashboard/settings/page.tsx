"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Bell, Moon, User, Shield, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

function Toggle({ label, description, checked, onCheckedChange }: { label: string; description: string; checked: boolean; onCheckedChange: (checked: boolean) => void }) {
    return (
        <div className="flex items-center justify-between py-4">
            <div className="space-y-0.5">
                <div className="text-white font-medium">{label}</div>
                <div className="text-sm text-zinc-500">{description}</div>
            </div>
            <button
                onClick={() => onCheckedChange(!checked)}
                className={`w-11 h-6 rounded-full relative cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${checked ? "bg-blue-600" : "bg-zinc-700"}`}
            >
                <motion.div
                    initial={false}
                    animate={{ x: checked ? 20 : 4 }}
                    className="absolute top-1 left-0 bg-white w-4 h-4 rounded-full shadow-sm"
                />
            </button>
        </div>
    );
}

export default function SettingsPage() {
    const { user, loading } = useAuth();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
    });

    const [settings, setSettings] = useState({
        emailNotifications: true,
        communityMentions: true,
        appUpdates: false,
        darkMode: true,
        reducedMotion: false,
    });

    // Populate form with real user data once loaded
    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username || "",
                email: user.email || "",
            });
        }
    }, [user]);

    const handleToggle = (key: keyof typeof settings) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 text-zinc-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl space-y-8">
            <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-3xl font-bold tracking-tight text-white mb-6"
            >
                Settings
            </motion.h1>

            <div className="grid gap-6">

                {/* Profile Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <Card className="premium-card border-white/5 bg-zinc-900/50">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <User className="w-5 h-5 text-blue-400" />
                                <CardTitle className="text-white">Profile Information</CardTitle>
                            </div>
                            <CardDescription className="text-zinc-500">Your personal details from your account.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-zinc-300">Username</Label>
                                    <Input
                                        value={formData.username}
                                        onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                                        className="bg-zinc-950/50 border-white/10 text-white"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-zinc-300">Email Address</Label>
                                    <Input
                                        value={formData.email}
                                        readOnly
                                        className="bg-zinc-950/50 border-white/10 text-zinc-400 cursor-not-allowed"
                                    />
                                </div>
                            </div>
                            <Button className="bg-blue-600 text-white hover:bg-blue-500">Save Changes</Button>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Account Info */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                >
                    <Card className="premium-card border-white/5 bg-zinc-900/50">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <Shield className="w-5 h-5 text-emerald-400" />
                                <CardTitle className="text-white">Account Details</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid sm:grid-cols-3 gap-4">
                                <div className="p-4 rounded-xl bg-zinc-950/50 border border-white/5">
                                    <p className="text-xs text-zinc-500 mb-1">Role</p>
                                    <p className="text-sm font-semibold text-white uppercase tracking-wider">{user?.role || "—"}</p>
                                </div>
                                <div className="p-4 rounded-xl bg-zinc-950/50 border border-white/5">
                                    <p className="text-xs text-zinc-500 mb-1">Recovery Stage</p>
                                    <p className="text-sm font-semibold text-white capitalize">{user?.recoveryStage?.replace(/_/g, " ") || "Active"}</p>
                                </div>
                                <div className="p-4 rounded-xl bg-zinc-950/50 border border-white/5">
                                    <p className="text-xs text-zinc-500 mb-1">User ID</p>
                                    <p className="text-sm font-mono text-zinc-400 truncate">{user?.id || "—"}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Notifications */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <Card className="premium-card border-white/5 bg-zinc-900/50">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <Bell className="w-5 h-5 text-purple-400" />
                                <CardTitle className="text-white">Notifications</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="divide-y divide-white/5">
                            <Toggle
                                label="Email Notifications"
                                description="Receive daily summaries and important alerts."
                                checked={settings.emailNotifications}
                                onCheckedChange={() => handleToggle("emailNotifications")}
                            />
                            <Toggle
                                label="Community Mentions"
                                description="Get notified when someone replies to your posts."
                                checked={settings.communityMentions}
                                onCheckedChange={() => handleToggle("communityMentions")}
                            />
                            <Toggle
                                label="App Updates"
                                description="Receive news about new features and improvements."
                                checked={settings.appUpdates}
                                onCheckedChange={() => handleToggle("appUpdates")}
                            />
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Appearance */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <Card className="premium-card border-white/5 bg-zinc-900/50">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <Moon className="w-5 h-5 text-amber-400" />
                                <CardTitle className="text-white">Appearance</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="divide-y divide-white/5">
                            <Toggle
                                label="Dark Mode"
                                description="Use dark theme across the application."
                                checked={settings.darkMode}
                                onCheckedChange={() => handleToggle("darkMode")}
                            />
                            <Toggle
                                label="Reduced Motion"
                                description="Minimize animations for better accessibility."
                                checked={settings.reducedMotion}
                                onCheckedChange={() => handleToggle("reducedMotion")}
                            />
                        </CardContent>
                    </Card>
                </motion.div>

            </div>
        </div>
    );
}
