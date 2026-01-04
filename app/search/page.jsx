'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import ProductCard from '@/components/commerce/ProductCard';
import { searchProducts } from '@/lib/products';

export default function SearchPage() {
    const router = useRouter();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            const searchResults = searchProducts(query);
            setResults(searchResults);
            setHasSearched(true);
        }
    };

    return (
        <div className="min-h-screen bg-neutral-cream">
            <div className="bg-primary text-white py-16">
                <Container>
                    <h1 className="text-4xl text-white md:text-5xl font-heading font-bold mb-6">Search Products</h1>

                    <form onSubmit={handleSearch} className="max-w-2xl">
                        <div className="flex gap-4">
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search for products, ingredients, concerns..."
                                className="flex-1 px-6 py-4 rounded-lg text-primary focus:outline-none focus:ring-2 focus:ring-secondary"
                            />
                            <button
                                type="submit"
                                className="px-8 py-4 bg-secondary text-primary rounded-lg font-semibold hover:bg-secondary-dark transition-colors"
                            >
                                Search
                            </button>
                        </div>
                    </form>
                </Container>
            </div>

            <Container className="py-12">
                {hasSearched && (
                    <>
                        <p className="text-neutral-gray mb-6">
                            {results.length} {results.length === 1 ? 'result' : 'results'} for "{query}"
                        </p>

                        {results.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {results.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-xl text-neutral-gray mb-4">No products found</p>
                                <p className="text-neutral-gray">Try searching with different keywords</p>
                            </div>
                        )}
                    </>
                )}

                {!hasSearched && (
                    <div className="text-center py-12">
                        <svg className="w-24 h-24 mx-auto text-neutral-gray/30 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <p className="text-neutral-gray">Enter a search term to find products</p>
                    </div>
                )}
            </Container>
        </div>
    );
}
