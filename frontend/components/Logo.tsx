"use client";

import { motion } from "framer-motion";

export function Logo({ className = "w-8 h-8", iconClassName = "w-5 h-5" }: { className?: string, iconClassName?: string }) {
    return (
        <div className={`flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg shadow-blue-500/20 ${className}`}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`text-white ${iconClassName}`}
            >
                <path d="M12 2L2 22h20L12 2Z" />
                <path d="M2 22h20" />
                <path d="M12 2L7 13h10" />
            </svg>
        </div>
    );
}

export function LogoText({ className = "" }: { className?: string }) {
    return (
        <span className={`text-xl font-bold tracking-tight text-white ${className}`}>Adik</span>
    );
}
