"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, BookHeart, Users, Library, Settings, LogOut } from "lucide-react";
import { Logo, LogoText } from "@/components/Logo";

export const sidebarItems = [
    { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
    { icon: BookHeart, label: "Journal", href: "/dashboard/journal" },
    { icon: Users, label: "Community", href: "/dashboard/community" },
    { icon: Library, label: "Resources", href: "/dashboard/resources" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 bottom-0 w-64 bg-zinc-950/80 backdrop-blur-xl border-r border-white/5 z-40 hidden md:flex flex-col">
            <div className="p-6 flex items-center gap-3">
                <Logo className="w-8 h-8 rounded-lg" iconClassName="w-4 h-4" />
                <LogoText className="text-xl" />
            </div>

            <nav className="flex-1 px-4 py-6 space-y-2">
                {sidebarItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group",
                                isActive
                                    ? "bg-blue-600/10 text-blue-400"
                                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                            )}
                        >
                            <item.icon className={cn("w-5 h-5", isActive ? "text-blue-400" : "text-zinc-500 group-hover:text-white")} />
                            {item.label}
                            {isActive && (
                                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                            )}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-white/5">
                <button className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-colors group">
                    <LogOut className="w-5 h-5 text-zinc-500 group-hover:text-red-400" />
                    Sign Out
                </button>
            </div>
        </aside>
    );
}
