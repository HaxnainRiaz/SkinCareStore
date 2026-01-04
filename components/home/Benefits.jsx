import { Container } from '@/components/ui/Container';

export default function Benefits() {
    const benefits = [
        {
            icon: '🌱',
            title: 'Vegan & Cruelty-Free',
            description: 'Never tested on animals, always kind to all beings',
        },
        {
            icon: '♻️',
            title: 'Sustainable Packaging',
            description: 'Recyclable materials and eco-conscious design',
        },
        {
            icon: '🔬',
            title: 'Science-Backed',
            description: 'Clinically tested formulas with proven results',
        },
        {
            icon: '🌍',
            title: 'Ethically Sourced',
            description: 'Fair trade ingredients from trusted suppliers',
        },
        {
            icon: '✨',
            title: 'Luxury Experience',
            description: 'Premium textures and elegant packaging',
        },
        {
            icon: '💚',
            title: 'Clean Beauty',
            description: 'Free from parabens, sulfates, and harmful chemicals',
        },
    ];

    return (
        <section className="section-padding bg-primary text-white">
            <Container>
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-white">
                        The Luxe Botanica Difference
                    </h2>
                    <p className="text-lg text-white/80 max-w-2xl mx-auto">
                        More than skincare—a commitment to your skin, our planet, and ethical beauty
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {benefits.map((benefit) => (
                        <div key={benefit.title} className="text-center">
                            <div className="text-5xl mb-4">{benefit.icon}</div>
                            <h3 className="text-xl font-heading font-semibold mb-2 text-white">
                                {benefit.title}
                            </h3>
                            <p className="text-white/80">
                                {benefit.description}
                            </p>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
