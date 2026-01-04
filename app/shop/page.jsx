'use client';

import { useState, useEffect, Suspense } from 'react';
import { Container } from '@/components/ui/Container';
import ProductCard from '@/components/commerce/ProductCard';
import { getAllProducts, categories, concerns, sortProducts, filterProducts } from '@/lib/products';
import { useSearchParams } from 'next/navigation';

function ShopContent() {
    const searchParams = useSearchParams();
    const [products, setProducts] = useState(getAllProducts());
    const [sortBy, setSortBy] = useState('featured');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedConcern, setSelectedConcern] = useState('');

    useEffect(() => {
        const concernParam = searchParams.get('concern');
        if (concernParam) {
            setSelectedConcern(concernParam);
        }
    }, [searchParams]);

    useEffect(() => {
        let filtered = getAllProducts();

        const filters = {
            category: selectedCategory,
            concern: selectedConcern,
        };

        filtered = filterProducts(filtered, filters);
        filtered = sortProducts(filtered, sortBy);

        setProducts(filtered);
    }, [sortBy, selectedCategory, selectedConcern]);

    return (
        <>
            <div className="bg-primary text-white py-16">
                <Container>
                    <h1 className="text-4xl text-white md:text-5xl font-heading font-bold mb-4">
                        Shop All Products
                    </h1>
                    <p className="text-lg text-white/80">
                        Discover our complete collection of luxury skincare
                    </p>
                </Container>
            </div>

            <Container className="py-12">
                {/* Filters */}
                <div className="mb-8 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                    <div className="flex flex-col sm:flex-row gap-4 flex-1">
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="px-4 py-2 border border-neutral-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                            {categories.map((cat) => (
                                <option key={cat.value} value={cat.value}>
                                    {cat.label}
                                </option>
                            ))}
                        </select>

                        <select
                            value={selectedConcern}
                            onChange={(e) => setSelectedConcern(e.target.value)}
                            className="px-4 py-2 border border-neutral-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                            <option value="">All Concerns</option>
                            {concerns.map((concern) => (
                                <option key={concern.value} value={concern.value}>
                                    {concern.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-4 py-2 border border-neutral-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                        <option value="featured">Featured</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="rating">Highest Rated</option>
                        <option value="newest">Newest</option>
                    </select>
                </div>

                {/* Results count */}
                <p className="text-neutral-gray mb-6">
                    Showing {products.length} {products.length === 1 ? 'product' : 'products'}
                </p>

                {/* Products grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {products.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-xl text-neutral-gray mb-4">No products found</p>
                        <button
                            onClick={() => {
                                setSelectedCategory('all');
                                setSelectedConcern('');
                                setSortBy('featured');
                            }}
                            className="text-primary hover:underline"
                        >
                            Clear filters
                        </button>
                    </div>
                )}
            </Container>
        </>
    );
}

export default function ShopPage() {
    return (
        <div className="min-h-screen bg-neutral-cream">
            <Suspense fallback={
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-primary">Loading shop...</div>
                </div>
            }>
                <ShopContent />
            </Suspense>
        </div>
    );
}
