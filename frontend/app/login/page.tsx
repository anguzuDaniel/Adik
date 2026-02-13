"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useState } from "react";
// import { useRouter } from "next/navigation"; // Handled by AuthContext
import { Logo } from "@/components/Logo";
import { useMutation } from "@tanstack/react-query";
import { graphQLClient } from "@/lib/fetcher";
import { SIGNIN_MUTATION } from "@/lib/graphql/mutations";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner"; // Assuming sonner is installed or uses generic alert for now. 
// If sonner not installed, I'll use simple window.alert or console.error for MVP
// Actually, earlier context showed "Toaster" might be available. I'll stick to basic error handling for now.

export default function LoginPage() {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { mutate, isPending, error } = useMutation({
        mutationFn: async () => {
            return graphQLClient.request<any>(SIGNIN_MUTATION, {
                input: { email, password }
            });
        },
        onSuccess: (data) => {
            console.log("Login success:", data);
            login(data.signIn.accessToken, data.signIn);
        },
        onError: (err: any) => {
            console.error("Login failed:", err);
            // alert("Login failed: " + err.message);
        }
    });

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        mutate();
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
                        <div className="mb-4">
                            <Logo iconClassName="w-10 h-10" />
                        </div>
                        <CardTitle className="text-2xl font-bold tracking-tight text-white">Welcome back</CardTitle>
                        <CardDescription className="text-zinc-400">
                            Enter your credentials to access your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleLogin} className="space-y-4">
                            {error && (
                                <div className="p-3 text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-md">
                                    {(error as Error).message || "Invalid credentials"}
                                </div>
                            )}
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-zinc-200">Email</Label>
                                <Input
                                    id="email"
                                    placeholder="name@example.com"
                                    type="email"
                                    required
                                    className="bg-zinc-900/50 border-white/10 focus-visible:ring-blue-500 text-white"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password" className="text-zinc-200">Password</Label>
                                    <Link href="#" className="text-sm text-blue-400 hover:text-blue-300">Forgot password?</Link>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    className="bg-zinc-900/50 border-white/10 focus-visible:ring-blue-500 text-white"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20" disabled={isPending}>
                                {isPending ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Signing in...
                                    </>
                                ) : (
                                    "Sign in"
                                )}
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
