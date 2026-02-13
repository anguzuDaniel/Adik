"use client";

import { motion } from "framer-motion";
import { Users, BookHeart, ShieldCheck } from "lucide-react";

const features = [
    {
        icon: Users,
        title: "Community Support",
        description: "Join safe, moderated groups where you can share experiences and grow together with people who understand.",
        color: "text-blue-400",
    },
    {
        icon: BookHeart,
        title: "Smart Journaling",
        description: "Private, sentiment-analyzed journals to help you reflect on your daily journey and track your emotional progress.",
        color: "text-purple-400",
    },
    {
        icon: ShieldCheck,
        title: "Vetted Resources",
        description: "Access curated articles, videos, and podcasts from verified mental health professionals and experts.",
        color: "text-emerald-400",
    },
];

export function Features() {
    return (
        <section className="py-24 relative">
            <div className="container px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Everything you need to thrive</h2>
                    <p className="text-zinc-400 max-w-2xl mx-auto">
                        Comprehensive tools and support systems designed to empower your personal growth.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="premium-card p-8 group cursor-default"
                        >
                            <div className={`p-3 rounded-xl bg-white/5 w-fit mb-6 ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                                <feature.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                            <p className="text-zinc-400 leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
