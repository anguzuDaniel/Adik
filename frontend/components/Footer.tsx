import Link from "next/link";
import { Logo, LogoText } from "@/components/Logo";

export function Footer() {
    return (
        <footer className="py-8 border-t border-white/5 bg-zinc-950">
            <div className="container px-4 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <Logo className="w-6 h-6 rounded-lg" iconClassName="w-3 h-3" />
                    <LogoText className="text-lg text-zinc-400" />
                </div>
                <p className="text-sm text-zinc-500">
                    © {new Date().getFullYear()} Adik Inc. All rights reserved.
                </p>
                <div className="flex gap-6">
                    <Link href="#" className="text-sm text-zinc-500 hover:text-white transition-colors">
                        Terms
                    </Link>
                    <Link href="#" className="text-sm text-zinc-500 hover:text-white transition-colors">
                        Privacy
                    </Link>
                    <Link href="#" className="text-sm text-zinc-500 hover:text-white transition-colors">
                        Contact
                    </Link>
                </div>
            </div>
        </footer>
    );
}
