"use client";

import Link from "next/link";
import { Calendar, Clock, ArrowRight, User } from "lucide-react";

export default function BlogCard({ blog }) {
    if (!blog) return null;

    const date = new Date(blog.createdAt);
    const formattedDate = date.toLocaleDateString('en-PK', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });

    return (
        <Link href={`/blog/${blog.slug}`} className="group h-full bg-[#ffffff] p-3 rounded-[2rem] border border-[#F5F3F0] shadow-[0_4px_30px_rgba(11,47,38,0.06)] flex flex-col">
            <div className="relative aspect-[16/10] rounded-[2rem] overflow-hidden bg-[#F5F3F0] mb-6">
                <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute top-6 left-6">
                    <span className="bg-[#0a4019]/80 backdrop-blur-md text-[#d3d3d3] text-[9px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full border border-white/20">
                        {blog.category}
                    </span>
                </div>
            </div>

            <div className="flex-1 flex flex-col">
                <div className="flex items-center gap-4 mb-4 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                    <div className="flex items-center gap-2">
                        <Calendar size={12} className="text-[#d3d3d3]" />
                        <span>{formattedDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock size={12} className="text-[#d3d3d3]" />
                        <span>{blog.readTime || "5 min read"}</span>
                    </div>
                </div>

                <h3 className="text-xl font-heading font-bold text-[#0a4019] mb-3 group-hover:text-[#d3d3d3] transition-colors duration-300 line-clamp-2 italic">
                    {blog.title}
                </h3>

                <p className="text-sm text-[#6B6B6B] line-clamp-2 italic mb-6 leading-relaxed opacity-80 font-medium">
                    {blog.excerpt}
                </p>

                <div className="mt-auto flex items-center justify-between pt-6 border-t border-[#F5F3F0]">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#F5F3F0] flex items-center justify-center text-[#0a4019]">
                            <User size={14} />
                        </div>
                        <span className="text-[10px] font-bold text-[#0a4019] uppercase tracking-widest">{blog.author || "Admin"}</span>
                    </div>

                    <div className="flex items-center gap-2 text-[#0a4019] group-hover:text-[#d3d3d3] transition-all">
                        <span className="text-[10px] font-bold uppercase tracking-widest">Read More</span>
                        <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                    </div>
                </div>
            </div>
        </Link>
    );
}
