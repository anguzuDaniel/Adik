"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

import { MobileSidebar } from "@/components/dashboard/MobileSidebar";
import { NotificationDropdown } from "@/components/dashboard/NotificationDropdown";
import { ProfileDropdown } from "@/components/dashboard/ProfileDropdown";

export function Header() {
    return (
        <header className="h-16 flex items-center justify-between px-6 border-b border-white/5 bg-zinc-950/50 backdrop-blur-sm sticky top-0 z-30">
            <div className="flex items-center gap-4 w-full max-w-md">
                <MobileSidebar />
                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <Input
                        placeholder="Search..."
                        className="pl-9 bg-zinc-900/50 border-white/5 focus-visible:ring-blue-500/50 text-white placeholder:text-zinc-500 w-full"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <NotificationDropdown />
                <ProfileDropdown />
            </div>
        </header>
    );
}
