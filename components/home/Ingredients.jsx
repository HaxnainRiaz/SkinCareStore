import { Container } from '@/components/ui/Container';

export default function Ingredients() {
    const ingredients = [
        {
            name: 'Vitamin C',
            benefit: 'Brightens and evens skin tone',
            description: 'Powerful antioxidant that reduces dark spots and boosts radiance',
        },
        {
            name: 'Hyaluronic Acid',
            benefit: 'Deep hydration',
            description: 'Holds 1000x its weight in water for plump, dewy skin',
        },
        {
            name: 'Retinol',
            benefit: 'Anti-aging powerhouse',
            description: 'Reduces wrinkles and improves skin texture',
        },
        {
            name: 'Niacinamide',
            benefit: 'Refines pores',
            description: 'Minimizes pores and balances oil production',
        },
    ];

    return (
        <section className="section-padding bg-white">
            <Container>
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6">
                            Powered by Nature's Finest
                        </h2>
                        <p className="text-lg text-neutral-gray mb-8">
                            We carefully select premium botanical ingredients backed by science to deliver visible results. Each formula is crafted with intention and care.
                        </p>

                        <div className="space-y-6">
                            {ingredients.map((ingredient) => (
                                <div key={ingredient.name} className="border-l-4 border-secondary pl-6">
                                    <h3 className="text-xl font-heading font-semibold text-primary mb-1">
                                        {ingredient.name}
                                    </h3>
                                    <p className="text-secondary-dark font-medium mb-2">
                                        {ingredient.benefit}
                                    </p>
                                    <p className="text-neutral-gray">
                                        {ingredient.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative">
                        <div className="aspect-square bg-gradient-organic rounded-3xl p-8 flex items-center justify-center">
                            <div className="text-center">
                                <p className="text-6xl mb-4">🌿</p>
                                <p className="text-2xl font-heading font-semibold text-primary mb-2">
                                    100% Natural Ingredients
                                </p>
                                <p className="text-neutral-gray">
                                    Sustainably sourced from around the world
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
