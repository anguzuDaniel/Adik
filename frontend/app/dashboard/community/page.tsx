"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Heart, Share2, MoreHorizontal } from "lucide-react";

const posts = [
    {
        id: 1,
        author: "Sarah J.",
        avatar: "bg-pink-500",
        time: "2h ago",
        content: "Just celebrated 30 days of mindfulness! It hasn't been easy, but using the journaling tools here has really helped me stay grounded.",
        likes: 24,
        comments: 5,
        tag: "Milestone",
        tagColor: "text-purple-400 bg-purple-400/10",
    },
    {
        id: 2,
        author: "Mike T.",
        avatar: "bg-blue-500",
        time: "4h ago",
        content: "Does anyone have recommendations for dealing with social anxiety at work? I have a presentation coming up and I'm feeling overwhelmed.",
        likes: 15,
        comments: 12,
        tag: "Question",
        tagColor: "text-blue-400 bg-blue-400/10",
    },
    {
        id: 3,
        author: "Alex R.",
        avatar: "bg-emerald-500",
        time: "6h ago",
        content: "Found this great article about sleep hygiene. Sharing it here because it really made a difference for me this week.",
        likes: 32,
        comments: 3,
        tag: "Resource",
        tagColor: "text-emerald-400 bg-emerald-400/10",
    },
];

export default function CommunityPage() {
    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="text-center space-y-2">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl font-bold text-white relative inline-block"
                >
                    Community
                    <span className="absolute -top-1 -right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-zinc-400"
                >
                    Connect, share, and grow with others.
                </motion.p>
            </div>

            {/* Post Input */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
            >
                <div className="bg-zinc-900/50 border border-white/5 rounded-xl p-4 flex gap-4 backdrop-blur-sm">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex-shrink-0" />
                    <div className="flex-1">
                        <input
                            type="text"
                            placeholder="Share your thoughts..."
                            className="w-full bg-transparent border-none focus:ring-0 text-white placeholder:text-zinc-500 text-lg"
                        />
                        <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/5">
                            <div className="flex gap-2">
                                {/* Formatting icons could go here */}
                            </div>
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-500 text-white rounded-full px-6">
                                Post
                            </Button>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Posts Feed */}
            <div className="space-y-4">
                {posts.map((post, index) => (
                    <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                    >
                        <Card className="premium-card border-white/5 bg-zinc-900/30">
                            <CardContent className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-full ${post.avatar} flex items-center justify-center text-white font-bold`}>
                                            {post.author[0]}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-white">{post.author}</h3>
                                            <p className="text-xs text-zinc-500">{post.time}</p>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-white">
                                        <MoreHorizontal className="w-4 h-4" />
                                    </Button>
                                </div>

                                <div className="mb-4">
                                    <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium mb-2 ${post.tagColor}`}>
                                        {post.tag}
                                    </span>
                                    <p className="text-zinc-300 leading-relaxed">
                                        {post.content}
                                    </p>
                                </div>

                                <div className="flex items-center gap-6 pt-4 border-t border-white/5 text-zinc-500">
                                    <button className="flex items-center gap-2 hover:text-red-400 transition-colors group">
                                        <Heart className="w-4 h-4 group-hover:fill-red-400" />
                                        <span className="text-sm">{post.likes}</span>
                                    </button>
                                    <button className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                                        <MessageSquare className="w-4 h-4" />
                                        <span className="text-sm">{post.comments}</span>
                                    </button>
                                    <button className="flex items-center gap-2 hover:text-white transition-colors ml-auto">
                                        <Share2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
