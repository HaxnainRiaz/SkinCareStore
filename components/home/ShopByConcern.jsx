import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';

export default function ShopByConcern() {
    const concerns = [
        {
            title: 'Anti-Aging',
            description: 'Reduce fine lines and wrinkles',
            icon: '✨',
            href: '/shop?concern=anti-aging',
            color: 'bg-purple-50',
        },
        {
            title: 'Brightening',
            description: 'Even tone and radiance',
            icon: '☀️',
            href: '/shop?concern=brightening',
            color: 'bg-yellow-50',
        },
        {
            title: 'Hydration',
            description: 'Deep moisture and plumpness',
            icon: '💧',
            href: '/shop?concern=dryness',
            color: 'bg-blue-50',
        },
        {
            title: 'Sensitivity',
            description: 'Gentle, soothing care',
            icon: '🌸',
            href: '/shop?concern=sensitivity',
            color: 'bg-pink-50',
        },
        {
            title: 'Acne & Pores',
            description: 'Clear, refined skin',
            icon: '🍃',
            href: '/shop?concern=pores',
            color: 'bg-green-50',
        },
        {
            title: 'Dark Circles',
            description: 'Bright, refreshed eyes',
            icon: '👁️',
            href: '/shop?concern=dark-circles',
            color: 'bg-indigo-50',
        },
    ];

    return (
        <section className="section-padding bg-[#FDFCFB]">
            <Container>
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#0a4019] mb-4">
                        Shop by Concern
                    </h2>
                    <p className="text-lg text-[#6B6B6B] max-w-2xl mx-auto">
                        Find the perfect solution for your unique skin needs
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {concerns.map((concern) => (
                        <Link key={concern.title} href={concern.href}>
                            <Card hover className="text-center p-8 h-full">
                                <div className={`w-16 h-16 ${concern.color} rounded-full flex items-center justify-center text-3xl mx-auto mb-4`}>
                                    {concern.icon}
                                </div>
                                <h3 className="text-xl font-heading font-semibold text-[#0a4019] mb-2">
                                    {concern.title}
                                </h3>
                                <p className="text-[#6B6B6B]">
                                    {concern.description}
                                </p>
                            </Card>
                        </Link>
                    ))}
                </div>
            </Container>
        </section>
    );
}
