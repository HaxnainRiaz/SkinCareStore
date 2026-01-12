'use client';

import { Container, Button } from '@/components/ui';
import ProductCard from '@/components/commerce/ProductCard';
import { useCore } from '@/context/CoreContext';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Bestsellers() {
    const { products } = useCore();

    // Logic for bestsellers: Manual flag OR Highest rated
    const bestsellers = [...products]
        .filter(p => p.isBestSeller)
        .sort((a, b) => {
            if (a.isBestSeller && !b.isBestSeller) return -1;
            if (!a.isBestSeller && b.isBestSeller) return 1;
            return b.totalReviews - a.totalReviews;
        })
        .slice(0, 4);

    if (bestsellers.length === 0) return null;

    return (
        <section className="py-3 md:py-6 lg:py-8 bg-[#FDFCFB] overflow-hidden">
            <Container>
                <div className="space-y-3 md:space-y-6 lg:space-y-8">
                    <div className="text-center space-y-4">
                        <h2 className="text-[#0a4019] [font-size:clamp(1.875rem,1.5rem+2vw,3.5rem)] leading-tight">
                            Best Sellers
                        </h2>
                        <p className="text-base md:text-lg text-[#6B6B6B] max-w-2xl mx-auto leading-relaxed">
                            Our most-loved products, trusted by thousands for transformative results
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 lg:gap-8">
                        {bestsellers.map((product) => (
                            <ProductCard key={product._id || product.id} product={product} />
                        ))}
                    </div>

                    <div className="text-center pt-4">
                        <Link href="/shop" className="inline-block w-full sm:w-auto">
                            <Button size="lg" className="w-full sm:w-auto px-10 h-16 rounded-full font-bold uppercase tracking-widest text-[11px] shadow-2xl shadow-[#0a4019]/10">
                                Explore the Collection
                                <ArrowRight size={18} className="ml-3 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </Container>
        </section>

    );
}
