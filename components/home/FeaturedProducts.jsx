import { Container } from '@/components/ui/Container';
import ProductCard from '@/components/commerce/ProductCard';
import { getFeaturedProducts } from '@/lib/products';

export default function FeaturedProducts() {
    const featured = getFeaturedProducts();

    return (
        <section className="section-padding bg-white">
            <Container>
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">
                        Featured Collection
                    </h2>
                    <p className="text-lg text-neutral-gray max-w-2xl mx-auto">
                        Discover our handpicked selection of premium skincare essentials, carefully formulated to transform your skin.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featured.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </Container>
        </section>
    );
}
