import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import Link from 'next/link';

export const metadata = {
    title: 'Collections - Luminelle Organics',
};

export default function CollectionsPage() {
    const collections = [
        {
            slug: 'bestsellers',
            title: 'Bestsellers',
            description: 'Our most-loved products trusted by thousands',
            icon: '⭐',
        },
        {
            slug: 'new-arrivals',
            title: 'New Arrivals',
            description: 'Discover our latest skincare innovations',
            icon: '✨',
        },
        {
            slug: 'sale',
            title: 'Sale',
            description: 'Limited-time offers on premium products',
            icon: '🏷️',
        },
        {
            slug: 'anti-aging',
            title: 'Anti-Aging Collection',
            description: 'Target fine lines and wrinkles',
            icon: '🌟',
        },
        {
            slug: 'hydration',
            title: 'Hydration Heroes',
            description: 'Deep moisture for plump, dewy skin',
            icon: '💧',
        },
        {
            slug: 'brightening',
            title: 'Brightening Collection',
            description: 'Even tone and radiant glow',
            icon: '☀️',
        },
    ];

    return (
        <div className="min-h-screen bg-neutral-cream">
            <div className="bg-primary text-white py-16">
                <Container>
                    <h1 className="text-4xl text-white md:text-5xl font-heading font-bold mb-4">
                        Shop by Collection
                    </h1>
                    <p className="text-lg text-white/80">
                        Curated selections for every skin need
                    </p>
                </Container>
            </div>

            <Container className="py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {collections.map((collection) => (
                        <Link key={collection.slug} href={`/collections/${collection.slug}`}>
                            <Card hover className="text-center p-8 h-full">
                                <div className="text-6xl mb-4">{collection.icon}</div>
                                <h2 className="text-2xl font-heading font-semibold text-primary mb-2">
                                    {collection.title}
                                </h2>
                                <p className="text-neutral-gray">
                                    {collection.description}
                                </p>
                            </Card>
                        </Link>
                    ))}
                </div>
            </Container>
        </div>
    );
}
