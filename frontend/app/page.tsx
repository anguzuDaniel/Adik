import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-blue-500/30">
      <Navbar />
      <Hero />
      <Features />
      <Footer />
    </main>
  );
}
