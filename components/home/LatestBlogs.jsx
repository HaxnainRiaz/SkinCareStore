"use client";

import { useCore } from "@/context/CoreContext";
import BlogCard from "@/components/commerce/BlogCard";
import { Container } from "@/components/ui";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function LatestBlogs() {
    const { blogs, loading } = useCore();

    if (loading || !blogs || blogs.length === 0) return null;

    // Show only the 3 latest blogs on homepage
    const latestBlogs = blogs.slice(0, 3);

    return (
        <section className="py-3 md:py-6 lg:py-8 bg-white relative overflow-hidden">
            {/* Ambient Decorative Elements */}
            <div className="absolute top-0 right-0 w-[60%] aspect-square bg-[#F5F3F0]/50 rounded-full blur-[120px] pointer-events-none -z-10" />
            <div className="absolute bottom-0 left-0 w-[40%] aspect-square bg-[#d3d3d3]/10 rounded-full blur-[120px] pointer-events-none -z-10" />

            <Container className="relative">
                <div className="space-y-3 md:space-y-6 lg:space-y-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-12">
                        <div className="max-w-2xl space-y-3 md:space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="h-px w-12 bg-[#d3d3d3]" />
                                <span className="text-[10px] font-bold text-[#d3d3d3] uppercase tracking-[0.5em]">The Journal</span>
                            </div>
                            <h2 className="text-[#0a4019] [font-size:clamp(1.875rem,1.5rem+3vw,3.5rem)] leading-[1.1]">
                                Skincare Narratives & <br className="hidden lg:block" />Botanical Wisdom
                            </h2>
                        </div>

                        <Link
                            href="/blog"
                            className="group flex items-center gap-4 text-[#0a4019] hover:text-[#B8A68A] transition-all duration-300 w-fit"
                        >
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] border-b border-transparent group-hover:border-[#B8A68A] pb-1">Explore the Archives</span>
                            <div className="w-12 h-12 rounded-full border border-[#0a4019]/10 flex items-center justify-center group-hover:border-[#B8A68A] group-hover:bg-[#B8A68A]/5 transition-all">
                                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                            </div>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 lg:gap-8">
                        {latestBlogs.map((blog) => (
                            <div key={blog._id} className="h-full">
                                <BlogCard blog={blog} />
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </section>

    );
}
