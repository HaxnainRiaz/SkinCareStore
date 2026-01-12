'use client';

import { useState, useEffect, useRef } from 'react';
import { Container } from '@/components/ui/Container';
import { useCore } from '@/context/CoreContext';
import ProductCard from '@/components/commerce/ProductCard';
import { Search, X, Loader2 } from 'lucide-react';

export default function SearchOverlay({ isOpen, onClose }) {
    const { products, loading } = useCore();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const inputRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setTimeout(() => inputRef.current?.focus(), 100);
        } else {
            document.body.style.overflow = 'unset';
            setQuery('');
            setResults([]);
        }
    }, [isOpen]);

    useEffect(() => {
        if (query.trim().length > 1) {
            const lowerQuery = query.toLowerCase();
            const filtered = products.filter(product =>
                product.title?.toLowerCase().includes(lowerQuery) ||
                product.description?.toLowerCase().includes(lowerQuery) ||
                product.category?.name?.toLowerCase().includes(lowerQuery)
            ).slice(0, 4);
            setResults(filtered);
        } else {
            setResults([]);
        }
    }, [query, products]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] outline-none focus:outline-none">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-[#0a4019]/40 backdrop-blur-sm transition-opacity duration-300"
                onClick={onClose}
            />

            {/* Search Panel */}
            <div className="relative bg-white shadow-2xl animate-[slideDown_0.4s_cubic-bezier(0.16,1,0.3,1)] overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-[#d3d3d3]/20">
                    {loading && (
                        <div className="h-full bg-[#0a4019] animate-[shimmer_1.5s_infinite]" style={{ width: '30%' }} />
                    )}
                </div>

                <Container className="py-8 md:py-12">
                    <div className="max-w-5xl mx-auto space-y-8">
                        <div className="flex items-center gap-4 border-b-2 border-[#0a4019]/10 pb-4 focus-within:border-[#0a4019] transition-colors">
                            <Search className="text-[#0a4019]/40 w-6 h-6" />
                            <input
                                ref={inputRef}
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search for botanical miracles..."
                                className="flex-1 bg-transparent text-xl md:text-3xl font-heading text-[#0a4019] placeholder-[#0a4019]/20 outline-none w-full"
                            />
                            {loading && <Loader2 className="w-5 h-5 text-[#0a4019] animate-spin" />}
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-[#F5F3F0] rounded-full transition-colors"
                                aria-label="Close search"
                            >
                                <X className="w-6 h-6 text-[#0a4019]" />
                            </button>
                        </div>

                        {/* Search Results */}
                        {query.trim().length > 0 && (
                            <div className="space-y-6 animate-[fadeIn_0.5s_ease-out]">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#d3d3d3]">
                                        {results.length > 0 ? 'Curated Selection' : 'No matches found'}
                                    </h3>
                                    {results.length > 0 && (
                                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0a4019]/40">
                                            Showing {results.length} results
                                        </p>
                                    )}
                                </div>

                                {results.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                        {results.map((product) => (
                                            <div key={product._id} onClick={onClose} className="hover:scale-[1.02] transition-transform duration-300">
                                                <ProductCard product={product} />
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="py-12 text-center border-2 border-dashed border-[#F5F3F0] rounded-2xl">
                                        <p className="text-[#6B6B6B] italic font-serif">We couldn't find any botanical elixirs matching your ritual.</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Quick Suggestions */}
                        {query.trim().length === 0 && (
                            <div className="space-y-6 animate-[fadeIn_0.5s_ease-out]">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                    <div className="space-y-4">
                                        <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#d3d3d3]">Trending Rituals</h3>
                                        <div className="flex flex-wrap gap-3">
                                            {['Serum', 'Cleanser', 'Kalonji', 'Anti-Aging', 'Moisturizer'].map(tag => (
                                                <button
                                                    key={tag}
                                                    onClick={() => setQuery(tag)}
                                                    className="px-4 py-2 rounded-full border border-[#0a4019]/10 text-xs font-bold uppercase tracking-widest text-[#0a4019] hover:border-[#0a4019] hover:bg-[#0a4019] hover:text-white transition-all duration-300"
                                                >
                                                    {tag}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#d3d3d3]">Our Promise</h3>
                                        <p className="text-sm text-[#6B6B6B] leading-relaxed italic">
                                            Luminelle brings you the purity of nature, scientifically formulated to heal and glow. Discover our collection of vegan, cruelty-free, and organic essentials.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </Container>
            </div>
        </div>
    );
}
