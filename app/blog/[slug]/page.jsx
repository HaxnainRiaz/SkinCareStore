"use client";

import { useState } from "react";

import { useCore } from "@/context/CoreContext";
import { useParams } from "next/navigation";
import { Container, Button } from "@/components/ui";
import BlogCard from "@/components/commerce/BlogCard";
import { Calendar, Clock, User, ArrowLeft, Share2, Bookmark } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

export default function BlogDetailPage() {
    const { slug } = useParams();
    const { blogs, loading, addBlogComment } = useCore();
    const [commentData, setCommentData] = useState({ name: '', email: '', comment: '' });
    const [submitting, setSubmitting] = useState(false);
    const [msg, setMsg] = useState({ type: '', text: '' });

    if (loading) {
        return (
            <div className="py-24 flex items-center justify-center min-h-[60vh]">
                <div className="w-12 h-12 border-4 border-[#d3d3d3] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    const blog = blogs.find(b => b.slug === slug);

    if (!blog) {
        return (
            <Container className="py-32 text-center">
                <h1 className="text-3xl font-heading mb-6">Archive Entry Not Found</h1>
                <Link href="/blog">
                    <Button>Return to Journal</Button>
                </Link>
            </Container>
        );
    }

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setMsg({ type: '', text: '' });

        const res = await addBlogComment(blog._id, commentData);
        if (res.success) {
            setMsg({ type: 'success', text: 'Thank you! Your narrative contribution has been added.' });
            setCommentData({ name: '', email: '', comment: '' });
        } else {
            setMsg({ type: 'error', text: res.message || 'Failed to submit narrative.' });
        }
        setSubmitting(false);
    };

    // Filter recommended blogs (same category, excluding current)
    const recommended = blogs
        .filter(b => b.category === blog.category && b._id !== blog._id)
        .slice(0, 3);

    // If not enough in same category, just take other latest ones
    if (recommended.length < 3) {
        const others = blogs
            .filter(b => b._id !== blog._id && !recommended.find(r => r._id === b._id))
            .slice(0, 3 - recommended.length);
        recommended.push(...others);
    }

    // Helper to clean Quill content
    const sanitizeContent = (html) => {
        if (!html) return html;
        return html
            .replace(/&#8203;/g, "")
            .replace(/\u200B/g, "") // Zero-width space
            .replace(/&nbsp;/g, " ") // Non-breaking space to normal space
            .replace(/word-break:\s*break-all;?/gi, "")
            .replace(/overflow-wrap:\s*anywhere;?/gi, "");
    };

    return (
        <main className="bg-[#FDFCFB] min-h-screen">
            {/* Hero Header - Simplified */}
            <div className="relative h-[50vh] md:h-[70vh] w-full">
                <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a4019] via-[#0a4019]/30 to-transparent" />

                <Container className="absolute inset-0 flex flex-col justify-end pb-10 md:pb-20">
                    <div className="max-w-3xl">
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-[#d3d3d3] text-[10px] font-bold uppercase tracking-[0.3em] mb-6 hover:translate-x-[-4px] transition-transform"
                        >
                            <ArrowLeft size={14} /> Back to Archives
                        </Link>

                        <div className="flex flex-wrap items-center gap-4 mb-4">
                            <span className="bg-[#d3d3d3] text-[#0a4019] text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full">
                                {blog.category}
                            </span>
                            <div className="flex items-center gap-4 text-white/70 text-[10px] font-bold uppercase tracking-widest">
                                <span>{format(new Date(blog.createdAt), "MMM d, yyyy")}</span>
                                <span>{blog.readTime}</span>
                            </div>
                        </div>

                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-white italic leading-tight mb-8">
                            {blog.title}
                        </h1>

                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white border border-white/20">
                                <User size={18} />
                            </div>
                            <p className="text-sm font-bold text-[#d3d3d3] uppercase tracking-widest">{blog.author}</p>
                        </div>
                    </div>
                </Container>
            </div>

            {/* Content Section */}
            <section className="py-12 md:py-24 relative">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
                        {/* Side Actions (Desktop) */}
                        <div className="hidden lg:block lg:col-span-1 border-r border-[#F5F3F0]">
                            <div className="sticky top-32 space-y-8 flex flex-col items-center">
                                <button className="p-3 rounded-full border border-[#F5F3F0] text-[#0a4019] hover:bg-[#0a4019] hover:text-white transition-all shadow-sm group">
                                    <Share2 size={20} className="group-hover:scale-110 transition-transform" />
                                </button>
                                <button className="p-3 rounded-full border border-[#F5F3F0] text-[#0a4019] hover:bg-[#0a4019] hover:text-white transition-all shadow-sm group">
                                    <Bookmark size={20} className="group-hover:scale-110 transition-transform" />
                                </button>
                            </div>
                        </div>

                        {/* Article Text */}
                        <div className="col-span-1 lg:col-span-8 overflow-hidden">
                            <div className="w-full max-w-[750px] mx-auto px-1 overflow-x-auto">
                                <div
                                    className="blog-content text-base md:text-lg text-[#0a4019] leading-relaxed italic font-medium opacity-90"
                                    dangerouslySetInnerHTML={{ __html: sanitizeContent(blog.content) }}
                                />
                            </div>


                            {/* Author Bio Card */}
                            <div className="mt-12 md:mt-20 p-6 md:p-10 bg-white rounded-[1.5rem] md:rounded-[2.5rem] border border-[#F5F3F0] flex flex-col sm:flex-row gap-6 md:gap-8 items-center text-center sm:text-left shadow-sm">
                                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#F5F3F0] flex items-center justify-center text-[#0a4019] flex-shrink-0">
                                    <User size={36} />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-lg md:text-xl font-heading font-bold text-[#0a4019] mb-2">{blog.author}</h4>
                                    <p className="text-sm text-[#6B6B6B] italic leading-relaxed opacity-80">
                                        Luminelle Senior Contributor specializing in botanical ingredients and sustainable skincare rituals. Dedicated to bridging traditional wisdom with modern science.
                                    </p>
                                </div>
                            </div>

                            {/* Comment Section */}
                            <div className="mt-20 md:mt-32 space-y-10 md:space-y-16">
                                <div className="space-y-4 md:space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="h-px w-8 bg-[#d3d3d3]" />
                                        <span className="text-[10px] font-bold text-[#d3d3d3] uppercase tracking-[0.4em]">Conversation</span>
                                    </div>
                                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-[#0a4019] italic">Community Narratives</h2>
                                </div>

                                {/* Comment Form */}
                                <form onSubmit={handleCommentSubmit} className="bg-white p-6 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] border border-[#F5F3F0] shadow-sm space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-[#0a4019]/40 ml-4">Full Identity</label>
                                            <input
                                                type="text"
                                                required
                                                value={commentData.name}
                                                onChange={(e) => setCommentData({ ...commentData, name: e.target.value })}
                                                placeholder="Your name"
                                                className="w-full px-6 py-4 bg-[#FDFCFB] border border-[#F5F3F0] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#d3d3d3]/30 transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-[#0a4019]/40 ml-4">Email Address</label>
                                            <input
                                                type="email"
                                                required
                                                value={commentData.email}
                                                onChange={(e) => setCommentData({ ...commentData, email: e.target.value })}
                                                placeholder="your@email.com"
                                                className="w-full px-6 py-4 bg-[#FDFCFB] border border-[#F5F3F0] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#d3d3d3]/30 transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-[#0a4019]/40 ml-4">Your Thoughts</label>
                                        <textarea
                                            required
                                            value={commentData.comment}
                                            onChange={(e) => setCommentData({ ...commentData, comment: e.target.value })}
                                            placeholder="Join the ritual of conversation..."
                                            rows={5}
                                            className="w-full px-8 py-6 bg-[#FDFCFB] border border-[#F5F3F0] rounded-[1.5rem] md:rounded-[2rem] text-sm focus:outline-none focus:ring-2 focus:ring-[#d3d3d3]/30 transition-all resize-none"
                                        />
                                    </div>
                                    {msg.text && (
                                        <div className={`p-4 rounded-2xl text-xs font-bold text-center ${msg.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                            {msg.text}
                                        </div>
                                    )}
                                    <Button
                                        type="submit"
                                        disabled={submitting}
                                        className="w-full h-14 rounded-full uppercase tracking-widest text-xs font-bold shadow-lg shadow-[#0a4019]/10"
                                    >
                                        {submitting ? 'Submitting Translation...' : 'Post Narrative'}
                                    </Button>
                                </form>

                                {/* Comment List */}
                                <div className="space-y-8 md:space-y-10">
                                    {blog.comments && blog.comments.length > 0 ? (
                                        blog.comments.map((comment, index) => (
                                            <div key={index} className="flex gap-4 md:gap-6 animate-fadeIn">
                                                <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#F5F3F0] flex items-center justify-center text-[#0a4019] border border-[#F5F3F0]">
                                                    <User size={18} />
                                                </div>
                                                <div className="flex-1 space-y-2 md:space-y-3">
                                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                                        <h5 className="text-[12px] md:text-[13px] font-bold text-[#0a4019] uppercase tracking-widest">{comment.name}</h5>
                                                        <span className="text-[9px] md:text-[10px] font-bold text-[#0a4019]/30 uppercase tracking-widest">
                                                            {format(new Date(comment.createdAt), "MMM d, yyyy")}
                                                        </span>
                                                    </div>
                                                    <p className="text-[#6B6B6B] text-sm leading-relaxed italic opacity-80">
                                                        "{comment.comment}"
                                                    </p>
                                                    <div className="h-px w-full bg-[#F5F3F0] mt-6 md:mt-8" />
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="py-16 md:py-20 text-center bg-white rounded-[1.5rem] md:rounded-[2.5rem] border border-dashed border-[#F5F3F0]">
                                            <p className="text-sm font-heading italic text-[#0a4019]/30 px-6">The archives are quiet. Be the first to start the narrative.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar / Recommended */}
                        <div className="col-span-1 lg:col-span-3">
                            <div className="sticky top-32 space-y-8 lg:space-y-12">
                                <div className="p-6 md:p-8 bg-[#0a4019] rounded-[1.5rem] md:rounded-[2rem] text-[#d3d3d3] shadow-xl">
                                    <h3 className="text-lg md:text-xl font-heading font-bold italic mb-3 md:mb-4">Botanical Weekly</h3>
                                    <p className="text-xs opacity-70 mb-6 leading-relaxed">Join 50,000+ subscribers for weekly wisdom on natural rituals.</p>
                                    <div className="space-y-3">
                                        <input
                                            type="email"
                                            placeholder="Email Identity"
                                            className="w-full bg-white/10 border border-white/20 rounded-full px-5 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#d3d3d3]/30 transition-all placeholder:text-white/20"
                                        />
                                        <button className="w-full bg-[#d3d3d3] text-[#0a4019] text-[10px] font-bold uppercase tracking-widest py-3 rounded-full hover:scale-105 active:scale-95 transition-all shadow-lg">Archive Entry</button>
                                    </div>
                                </div>

                                {/* Share Actions for Tablet/Mobile (Visible here) */}
                                <div className="lg:hidden flex justify-center gap-4 py-8 border-y border-[#F5F3F0]">
                                    <button className="flex items-center gap-2 px-6 py-3 rounded-full border border-[#F5F3F0] text-[#0a4019] text-[10px] font-bold uppercase tracking-widest">
                                        <Share2 size={16} /> Share Ritual
                                    </button>
                                    <button className="flex items-center gap-2 px-6 py-3 rounded-full border border-[#F5F3F0] text-[#0a4019] text-[10px] font-bold uppercase tracking-widest">
                                        <Bookmark size={16} /> Save Archive
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Recommended Stories */}
            <section className="py-16 md:py-24 bg-[#F5F3F0]/30">
                <Container>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 md:mb-16 gap-6">
                        <div className="space-y-3 md:space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="h-px w-8 bg-[#d3d3d3]" />
                                <span className="text-[10px] font-bold text-[#d3d3d3] uppercase tracking-widest">Keep Reading</span>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-heading font-bold text-[#0a4019] italic">Further Narratives</h2>
                        </div>
                        <Link href="/blog" className="text-[10px] font-bold text-[#0a4019] uppercase tracking-[0.2em] hover:text-[#d3d3d3] transition-colors border-b border-transparent hover:border-[#d3d3d3] pb-1 w-fit">
                            View All Stories
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                        {recommended.map(recBlog => (
                            <BlogCard key={recBlog._id} blog={recBlog} />
                        ))}
                    </div>
                </Container>
            </section>

            <style jsx global>{`
                .blog-content { 
                    overflow-wrap: break-word;
                    word-break: normal;
                    hyphens: none;
                }
                .blog-content * {
                    max-width: 100% !important;
                    word-wrap: break-word;
                }
                .blog-content img { 
                    max-width: 100%; 
                    height: auto; 
                    border-radius: 1rem; 
                    margin: 2rem 0;
                    box-shadow: 0 10px 30px -10px rgba(11, 47, 38, 0.1);
                }
                .blog-content h1 { font-family: var(--font-heading); font-weight: 700; font-style: italic; color: #0a4019; margin: 2.5rem 0 1.5rem; font-size: 1.875rem; line-height: 1.2; }
                .blog-content h2 { font-family: var(--font-heading); font-weight: 700; font-style: italic; color: #0a4019; margin: 2rem 0 1rem; font-size: 1.5rem; line-height: 1.3; }
                .blog-content h3 { font-family: var(--font-heading); font-weight: 700; font-style: italic; color: #0a4019; margin: 1.5rem 0 0.75rem; font-size: 1.25rem; }
                
                @media (min-width: 768px) {
                    .blog-content h1 { font-size: 2.5rem; }
                    .blog-content h2 { font-size: 2rem; }
                    .blog-content h3 { font-size: 1.5rem; }
                }

                .blog-content p { margin-bottom: 1.5rem; line-height: 1.8; }
                .blog-content ul { list-style-type: disc; margin-left: 1.5rem; margin-bottom: 2rem; }
                .blog-content ol { list-style-type: decimal; margin-left: 1.5rem; margin-bottom: 2rem; }
                .blog-content li { margin-bottom: 0.75rem; }
                .blog-content strong { color: #0a4019; font-weight: 700; }
                .blog-content .ql-align-center { text-align: center; }
                .blog-content .ql-align-right { text-align: right; }
                .blog-content .ql-align-justify { text-align: justify; }

                /* Hide scrollbar but keep functionality if needed */
                ::-webkit-scrollbar { width: 4px; height: 4px; }
                ::-webkit-scrollbar-track { background: transparent; }
                ::-webkit-scrollbar-thumb { background: #d3d3d3/30; border-radius: 10px; }
            `}</style>
        </main>
    );
}
