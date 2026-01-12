'use client';

import { Container } from '@/components/ui/Container';
import ProductCard from '@/components/commerce/ProductCard';
import { useCore } from '@/context/CoreContext';

export default function FeaturedProducts() {
    const { products } = useCore();
    const featured = products.filter(product => product.isFeatured);

    if (featured.length === 0) return null;

    return (
        <section className="py-3 md:py-6 lg:py-8 bg-white overflow-hidden">
            <Container>
                <div className="space-y-3 md:space-y-6 lg:space-y-8">
                    <div className="text-center space-y-4">
                        <h2 className="text-[#0a4019] [font-size:clamp(1.875rem,1.5rem+2vw,3.5rem)] leading-tight">
                            Featured Collection
                        </h2>
                        <p className="text-base md:text-lg text-[#6B6B6B] max-w-2xl mx-auto leading-relaxed">
                            Discover our handpicked selection of premium skincare essentials, carefully formulated to transform your skin.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
                        {featured.map((product) => (
                            <ProductCard key={product._id || product.id} product={product} />
                        ))}
                    </div>
                </div>
            </Container>
        </section>

    );
}
