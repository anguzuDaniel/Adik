"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/Logo";

export default function SignupPage() {
    const [loading, setLoading] = useState(false);

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate signup
        setTimeout(() => {
            setLoading(false);
            // router.push("/onboarding");
        }, 1500);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-background relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-900/20 via-background to-background pointer-events-none" />

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
                        <CardTitle className="text-2xl font-bold tracking-tight text-white">Create an account</CardTitle>
                        <CardDescription className="text-zinc-400">
                            Start your journey to mental wellness today
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSignup} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="first-name" className="text-sm font-medium leading-none text-zinc-200">First name</label>
                                    <Input id="first-name" placeholder="John" required className="bg-zinc-900/50 border-white/10 focus-visible:ring-blue-500 text-white" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="last-name" className="text-sm font-medium leading-none text-zinc-200">Last name</label>
                                    <Input id="last-name" placeholder="Doe" required className="bg-zinc-900/50 border-white/10 focus-visible:ring-blue-500 text-white" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium leading-none text-zinc-200">Email</label>
                                <Input id="email" placeholder="name@example.com" type="email" required className="bg-zinc-900/50 border-white/10 focus-visible:ring-blue-500 text-white" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="password" className="text-sm font-medium leading-none text-zinc-200">Password</label>
                                <Input id="password" type="password" required className="bg-zinc-900/50 border-white/10 focus-visible:ring-blue-500 text-white" />
                            </div>
                            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20" disabled={loading}>
                                {loading ? "Creating account..." : "Create account"}
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <div className="text-center text-sm text-zinc-400">
                            Already have an account?{" "}
                            <Link href="/login" className="text-blue-400 hover:text-blue-300 font-medium">
                                Sign in
                            </Link>
                        </div>
                        <p className="px-8 text-center text-xs text-muted-foreground">
                            By clicking continue, you agree to our{" "}
                            <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
                                Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
                                Privacy Policy
                            </Link>
                            .
                        </p>
                    </CardFooter>
                </Card>
            </motion.div>
        </div>
    );
}
