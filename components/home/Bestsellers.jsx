'use client';

import { Container } from '@/components/ui/Container';
import ProductCard from '@/components/commerce/ProductCard';
import { useCore } from '@/context/CoreContext';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function Bestsellers() {
    const { products } = useCore();

    // Logic for bestsellers: Manual flag OR Highest rated
    const bestsellers = [...products]
        .filter(p => p.isBestSeller || p.rating >= 4)
        .sort((a, b) => {
            if (a.isBestSeller && !b.isBestSeller) return -1;
            if (!a.isBestSeller && b.isBestSeller) return 1;
            return b.totalReviews - a.totalReviews;
        })
        .slice(0, 4);

    if (bestsellers.length === 0) return null;

    return (
        <section className="section-padding bg-neutral-cream">
            <Container>
                <div className="text-center mb-12">
                    <h2 className="text-4xl text-white md:text-5xl font-heading font-bold text-primary mb-4">
                        Best Sellers
                    </h2>
                    <p className="text-lg text-neutral-gray max-w-2xl mx-auto">
                        Our most-loved products, trusted by thousands for transformative results
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {bestsellers.map((product) => (
                        <ProductCard key={product._id || product.id} product={product} />
                    ))}
                </div>

                <div className="text-center">
                    <Link href="/shop">
                        <Button variant="primary" size="lg">
                            View All Products
                        </Button>
                    </Link>
                </div>
            </Container>
        </section>
    );
}
