import { Container } from '@/components/ui/Container';

export default function BrandStory() {
    return (
        <section className="section-padding bg-gradient-organic">
            <Container>
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6">
                        Our Story
                    </h2>

                    <p className="text-lg text-neutral-gray mb-6">
                        Luxe Botanica was born from a simple belief: that luxury skincare should be both effective and ethical. Founded in 2020, we set out to create products that honor both your skin and our planet.
                    </p>

                    <p className="text-lg text-neutral-gray mb-6">
                        Every formula is crafted with intention, combining time-honored botanical wisdom with cutting-edge science. We source our ingredients from sustainable farms around the world, ensuring the highest quality while supporting local communities.
                    </p>

                    <p className="text-lg text-neutral-gray mb-8">
                        Our commitment extends beyond beautiful skin. We're dedicated to sustainable practices, from our recyclable packaging to our carbon-neutral shipping. Because true luxury means caring for the world we all share.
                    </p>

                    <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
                        <div className="text-center">
                            <p className="text-4xl font-heading font-bold text-primary mb-2">50K+</p>
                            <p className="text-neutral-gray">Happy Customers</p>
                        </div>
                        <div className="text-center">
                            <p className="text-4xl font-heading font-bold text-primary mb-2">4.8</p>
                            <p className="text-neutral-gray">Average Rating</p>
                        </div>
                        <div className="text-center">
                            <p className="text-4xl font-heading font-bold text-primary mb-2">100%</p>
                            <p className="text-neutral-gray">Natural</p>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
