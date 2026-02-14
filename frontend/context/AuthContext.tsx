"use client";

import { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ME_QUERY } from "@/lib/graphql/queries";
import { fetcher } from "@/lib/fetcher";

interface User {
    id: string;
    username: string;
    email: string;
    role: string;
    recoveryStage: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (token: string, userData?: any) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    login: () => { },
    logout: () => { },
    isAuthenticated: false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useState<string | null>(null);
    const [initialized, setInitialized] = useState(false);
    const router = useRouter();
    const queryClient = useQueryClient();

    // Load token from local storage on mount — single time
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
        }
        setInitialized(true);
    }, []);

    const { data, isLoading, error } = useQuery({
        queryKey: ["me"],
        queryFn: fetcher<{ viewer: User }>(ME_QUERY),
        enabled: !!token,
        retry: false,
        // User profile rarely changes — keep it fresh for 10 minutes
        staleTime: 10 * 60 * 1000,
        gcTime: 30 * 60 * 1000,
    });

    const logout = useCallback(() => {
        localStorage.removeItem("token");
        setToken(null);
        // Clear all cached queries on logout
        queryClient.clear();
        router.push("/login");
    }, [queryClient, router]);

    const login = useCallback((newToken: string, userData?: any) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);
        // Optimistically set user data if provided — avoids waiting for ME_QUERY
        if (userData) {
            queryClient.setQueryData(["me"], { viewer: userData });
        } else {
            // Invalidate stale ME_QUERY so it refetches with the new token
            queryClient.invalidateQueries({ queryKey: ["me"] });
        }
        router.push("/dashboard");
    }, [queryClient, router]);

    // If error (e.g. 401), logout — but only after initialization
    useEffect(() => {
        if (initialized && error) {
            console.error("[AuthContext] ME_QUERY error, triggering logout:", error);
            logout();
        }
    }, [error, initialized, logout]);

    const value = useMemo(() => ({
        user: data?.viewer || null,
        loading: !initialized || (isLoading && !!token),
        login,
        logout,
        isAuthenticated: !!token,
    }), [data?.viewer, initialized, isLoading, token, login, logout]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
