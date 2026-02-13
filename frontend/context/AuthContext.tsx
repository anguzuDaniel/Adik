"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
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
    const router = useRouter();

    // Load token from local storage on mount
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const { data, isLoading, error } = useQuery({
        queryKey: ["me", token],
        queryFn: fetcher<{ viewer: User }>(ME_QUERY),
        enabled: !!token, // Only run query if token exists
        retry: false, // Don't retry if token is invalid
    });

    const login = (newToken: string, userData?: any) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);
        if (userData) {
            // Optimistically set user data if provided (e.g. from login response)
            // queryClient.setQueryData(["me", newToken], { viewer: userData });
        }
        router.push("/dashboard");
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        router.push("/login");
    };

    // If error (e.g. 401), logout
    useEffect(() => {
        if (error) {
            logout();
        }
    }, [error]);

    return (
        <AuthContext.Provider
            value={{
                user: data?.viewer || null,
                loading: isLoading && !!token, // Loading only if we have a token and are fetching
                login,
                logout,
                isAuthenticated: !!token,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
