"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function QueryProvider({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                // Data stays fresh for 5 minutes — no refetching during this window
                staleTime: 5 * 60 * 1000,
                // Keep inactive data in cache for 30 minutes
                gcTime: 30 * 60 * 1000,
                // Don't refetch on window focus or reconnect (user navigating tabs)
                refetchOnWindowFocus: false,
                refetchOnReconnect: false,
                // Only retry once on failure
                retry: 1,
                retryDelay: 1000,
            },
        },
    }));

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}
