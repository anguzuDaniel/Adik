"use client";

import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { fetcher } from "@/lib/fetcher";
import { GET_USER_JOURNALS_QUERY, GET_COMMUNITIES_QUERY, GET_RESOURCES_QUERY } from "@/lib/graphql/queries";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, isAuthenticated, loading } = useAuth();
    const router = useRouter();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.replace("/login");
        }
    }, [loading, isAuthenticated, router]);

    // Prefetch all common dashboard data as soon as user is authenticated
    // This runs once on layout mount, so sub-pages find data already in cache
    useEffect(() => {
        if (user?.id) {
            queryClient.prefetchQuery({
                queryKey: ["journals", user.id],
                queryFn: fetcher(GET_USER_JOURNALS_QUERY, { userId: user.id }),
            });
            queryClient.prefetchQuery({
                queryKey: ["communities"],
                queryFn: fetcher(GET_COMMUNITIES_QUERY),
            });
            queryClient.prefetchQuery({
                queryKey: ["resources"],
                queryFn: fetcher(GET_RESOURCES_QUERY),
            });
        }
    }, [user?.id, queryClient]);

    // Show loading spinner while checking auth
    if (loading || !isAuthenticated) {
        return (
            <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-950 text-foreground selection:bg-blue-500/30">
            <Sidebar />
            <div className="md:ml-64 min-h-screen flex flex-col">
                <Header />
                <main className="flex-1 p-6 md:p-8 space-y-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
