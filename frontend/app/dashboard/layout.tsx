import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
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
