'use client';

import { useParams } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import ProductCard from '@/components/commerce/ProductCard';
import { getProductsByConcern, getBestsellers, getAllProducts, getProductsByCategory } from '@/lib/products';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function CollectionPage() {
    const params = useParams();
    const slug = params.slug;

    const getCollectionData = (slug) => {
        switch (slug) {
            case 'bestsellers':
                return {
                    title: 'Bestsellers',
                    description: 'Our most-loved products trusted by thousands.',
                    products: getBestsellers(),
                };
            case 'new-arrivals':
                // Simulating new arrivals with the first 4 products
                return {
                    title: 'New Arrivals',
                    description: 'Discover our latest skincare innovations.',
                    products: getAllProducts().slice(0, 4),
                };
            case 'sale':
                return {
                    title: 'Sale',
                    description: 'Limited-time offers on premium products.',
                    products: getAllProducts().filter(p => p.salePrice),
                };
            case 'anti-aging':
                return {
                    title: 'Anti-Aging Collection',
                    description: 'Target fine lines, wrinkles, and loss of firmness.',
                    products: getProductsByConcern('anti-aging'),
                };
            case 'hydration':
                return {
                    title: 'Hydration Heroes',
                    description: 'Deep moisture for plump, dewy skin.',
                    products: getProductsByConcern('dryness').concat(getProductsByConcern('dehydration')),
                };
            case 'brightening':
                return {
                    title: 'Brightening Collection',
                    description: 'Even tone and radiate glow.',
                    products: getProductsByConcern('brightening').concat(getProductsByConcern('dullness')),
                };
            default:
                // Try to find by category if not a special collection
                const categoryProducts = getProductsByCategory(slug);
                if (categoryProducts.length > 0) {
                    return {
                        title: slug.charAt(0).toUpperCase() + slug.slice(1).replace('-', ' '),
                        description: `Explore our premium range of ${slug.replace('-', ' ')}.`,
                        products: categoryProducts,
                    };
                }
                return null;
        }
    };

    const collection = getCollectionData(slug);

    if (!collection) {
        return (
            <Container className="py-24 text-center">
                <h1 className="text-3xl font-heading font-bold text-[#0a4019] mb-4">Collection Not Found</h1>
                <p className="text-[#6B6B6B] mb-8">
                    The collection you are looking for does not exist.
                </p>
                <Link href="/shop">
                    <Button>Back to Shop</Button>
                </Link>
            </Container>
        );
    }

    // Remove duplicates if any (e.g. from combined concerns)
    const uniqueProducts = Array.from(new Set(collection.products.map(p => p.id)))
        .map(id => collection.products.find(p => p.id === id));

    return (
        <div className="min-h-screen bg-[#FDFCFB]">
            <div className="bg-[#0a4019] text-white py-16">
                <Container>
                    <h1 className="text-4xl text-white md:text-5xl font-heading font-bold mb-4">
                        {collection.title}
                    </h1>
                    <p className="text-lg text-white/80">
                        {collection.description}
                    </p>
                </Container>
            </div>

            <Container className="py-12">
                <p className="text-[#6B6B6B] mb-6">
                    Showing {uniqueProducts.length} {uniqueProducts.length === 1 ? 'product' : 'products'}
                </p>

                {uniqueProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {uniqueProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-xl text-[#6B6B6B] mb-4">No products found in this collection</p>
                        <Link href="/shop">
                            <Button variant="outline">Browse All Products</Button>
                        </Link>
                    </div>
                )}
            </Container>
        </div>
    );
}
