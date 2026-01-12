"use client";

import { useCore } from "@/context/CoreContext";
import BlogCard from "@/components/commerce/BlogCard";
import { Container } from "@/components/ui";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

export default function BlogListingPage() {
    const { blogs, loading } = useCore();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const blogsPerPage = 9;

    if (loading) {
        return (
            <div className="py-24 flex items-center justify-center min-h-[60vh]">
                <div className="w-12 h-12 border-4 border-[#d3d3d3] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    const filteredBlogs = blogs.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
    const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <main className="pt-32 pb-24 bg-[#FDFCFB]">
            <Container>
                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="h-px w-8 bg-[#d3d3d3]" />
                        <span className="text-[10px] font-bold text-[#d3d3d3] uppercase tracking-[0.5em]">The Archive</span>
                        <div className="h-px w-8 bg-[#d3d3d3]" />
                    </div>
                    <h1 className="text-5xl md:text-6xl font-heading font-bold text-[#0a4019] italic">Editorial Journal</h1>
                    <p className="text-[#6B6B6B] leading-relaxed italic opacity-80 font-medium">
                        Deep dives into botanical science, traditional remedies, and modern skincare rituals curated for the conscious soul.
                    </p>
                </div>

                {/* Filter & Search Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-16 pb-8 border-b border-[#F5F3F0]">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-300" size={18} />
                        <input
                            type="text"
                            placeholder="Identify a narrative..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="w-full pl-12 pr-6 py-4 bg-white border border-[#F5F3F0] rounded-full focus:outline-none focus:ring-2 focus:ring-[#d3d3d3]/30 shadow-sm text-sm italic"
                        />
                    </div>

                    <div className="flex items-center gap-8">
                        <p className="text-[10px] font-bold text-[#0a4019] uppercase tracking-widest opacity-40">
                            Showing {Math.min(indexOfLastBlog, filteredBlogs.length)} of {filteredBlogs.length} Stories
                        </p>
                    </div>
                </div>

                {/* Grid */}
                {currentBlogs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
                        {currentBlogs.map((blog) => (
                            <div key={blog._id} className="animate-fadeIn">
                                <BlogCard blog={blog} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-32 text-center">
                        <p className="text-xl font-heading italic text-neutral-300">No narratives found matching your search.</p>
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-20 flex justify-center items-center gap-2">
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="w-12 h-12 rounded-full border border-[#F5F3F0] flex items-center justify-center text-[#0a4019] disabled:opacity-20 hover:bg-white hover:shadow-md transition-all"
                        >
                            <ChevronLeft size={20} />
                        </button>

                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => paginate(i + 1)}
                                className={`w-12 h-12 rounded-full text-[10px] font-bold transition-all ${currentPage === i + 1
                                    ? "bg-[#0a4019] text-[#d3d3d3] shadow-lg shadow-[#0a4019]/20 scale-110"
                                    : "border border-[#F5F3F0] text-[#0a4019] hover:bg-white hover:shadow-md"
                                    }`}
                            >
                                {String(i + 1).padStart(2, '0')}
                            </button>
                        ))}

                        <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="w-12 h-12 rounded-full border border-[#F5F3F0] flex items-center justify-center text-[#0a4019] disabled:opacity-20 hover:bg-white hover:shadow-md transition-all"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                )}
            </Container>
        </main>
    );
}
