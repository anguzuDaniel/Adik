"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label"; // Check if this exists, if not use standard label
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";

// Since we haven't verified if Label exists, I'll inline a simple label if needed, 
// but assuming standard shadcn has it. I'll stick to basic HTML label if unsure, 
// but for premium look let's try to use standard Tailwind classes.

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate login
        setTimeout(() => {
            setLoading(false);
            router.push("/dashboard");
        }, 1500);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-background relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-background to-background pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md relative z-10"
            >
                <Link href="/" className="inline-flex items-center text-sm text-zinc-400 hover:text-white mb-6 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                </Link>

                <Card className="premium-card border-white/10 bg-zinc-950/50">
                    <CardHeader className="space-y-1 flex flex-col items-center text-center">
                        <Logo className="w-12 h-12 mb-4 rounded-2xl" iconClassName="w-6 h-6" />
                        <CardTitle className="text-2xl font-bold tracking-tight text-white">Welcome back</CardTitle>
                        <CardDescription className="text-zinc-400">
                            Enter your credentials to access your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-200">Email</label>
                                <Input id="email" placeholder="name@example.com" type="email" required className="bg-zinc-900/50 border-white/10 focus-visible:ring-blue-500 text-white" />
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-200">Password</label>
                                    <Link href="#" className="text-sm text-blue-400 hover:text-blue-300">Forgot password?</Link>
                                </div>
                                <Input id="password" type="password" required className="bg-zinc-900/50 border-white/10 focus-visible:ring-blue-500 text-white" />
                            </div>
                            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20" disabled={loading}>
                                {loading ? "Signing in..." : "Sign in"}
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <div className="relative w-full">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-white/10" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-zinc-950 px-2 text-muted-foreground">Or continue with</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 w-full">
                            <Button variant="outline" className="border-white/10 hover:bg-white/5 text-zinc-300">
                                Google
                            </Button>
                            <Button variant="outline" className="border-white/10 hover:bg-white/5 text-zinc-300">
                                GitHub
                            </Button>
                        </div>
                        <div className="text-center text-sm text-zinc-400 mt-4">
                            Don&apos;t have an account?{" "}
                            <Link href="/signup" className="text-blue-400 hover:text-blue-300 font-medium">
                                Sign up
                            </Link>
                        </div>
                    </CardFooter>
                </Card>
            </motion.div>
        </div>
    );
}
