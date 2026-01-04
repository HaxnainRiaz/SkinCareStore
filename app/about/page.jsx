import { Container } from '@/components/ui/Container';

export const metadata = {
    title: 'About Us - Luxe Botanica',
    description: 'Learn about our mission to create premium, ethical skincare products.',
};

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-neutral-cream">
            <div className="bg-primary text-white py-16">
                <Container>
                    <h1 className="text-4xl md:text-5xl font-heading font-bold">About Luxe Botanica</h1>
                </Container>
            </div>

            <Container className="py-16">
                <div className="max-w-4xl mx-auto space-y-12">
                    <section id="story">
                        <h2 className="text-3xl font-heading font-bold text-primary mb-6">Our Story</h2>
                        <div className="space-y-4 text-lg text-neutral-gray">
                            <p>
                                Founded in 2020, Luxe Botanica was born from a passion for clean, effective skincare that honors both your skin and our planet. Our founder, inspired by the healing power of botanical ingredients, set out to create a luxury skincare line that would deliver transformative results without compromise.
                            </p>
                            <p>
                                Every product in our collection is thoughtfully formulated with premium natural ingredients, combining ancient botanical wisdom with modern scientific innovation. We believe that true luxury lies not just in beautiful packaging and elegant textures, but in the integrity of our ingredients and our commitment to sustainability.
                            </p>
                            <p>
                                Today, Luxe Botanica is trusted by over 50,000 customers worldwide who share our values of clean beauty, ethical sourcing, and environmental responsibility.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-3xl font-heading font-bold text-primary mb-6">Our Values</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-white p-6 rounded-2xl shadow-soft">
                                <h3 className="text-xl font-heading font-semibold text-primary mb-3">Clean Ingredients</h3>
                                <p className="text-neutral-gray">
                                    We use only the finest natural and organic ingredients, free from parabens, sulfates, phthalates, and other harmful chemicals.
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-soft">
                                <h3 className="text-xl font-heading font-semibold text-primary mb-3">Cruelty-Free</h3>
                                <p className="text-neutral-gray">
                                    We never test on animals and are certified cruelty-free. All our products are 100% vegan.
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-soft">
                                <h3 className="text-xl font-heading font-semibold text-primary mb-3">Sustainable</h3>
                                <p className="text-neutral-gray">
                                    Our packaging is recyclable, and we're committed to reducing our carbon footprint through sustainable practices.
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-soft">
                                <h3 className="text-xl font-heading font-semibold text-primary mb-3">Ethical Sourcing</h3>
                                <p className="text-neutral-gray">
                                    We partner with fair-trade suppliers and support local communities where our ingredients are sourced.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section id="sustainability">
                        <h2 className="text-3xl font-heading font-bold text-primary mb-6">Sustainability Commitment</h2>
                        <div className="bg-gradient-organic p-8 rounded-2xl">
                            <p className="text-lg text-neutral-gray mb-6">
                                We're committed to minimizing our environmental impact at every step of our journey:
                            </p>
                            <ul className="space-y-3 text-neutral-gray">
                                <li className="flex items-start gap-3">
                                    <span className="text-primary mt-1">✓</span>
                                    <span>100% recyclable and biodegradable packaging materials</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-primary mt-1">✓</span>
                                    <span>Carbon-neutral shipping on all orders</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-primary mt-1">✓</span>
                                    <span>Sustainably sourced ingredients from certified organic farms</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-primary mt-1">✓</span>
                                    <span>Partnership with reforestation programs - one tree planted for every order</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-primary mt-1">✓</span>
                                    <span>Zero-waste manufacturing processes</span>
                                </li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-3xl font-heading font-bold text-primary mb-6">Our Promise</h2>
                        <p className="text-lg text-neutral-gray">
                            We promise to always prioritize your skin's health, our planet's wellbeing, and ethical business practices. Every product we create is a testament to our commitment to clean, effective, and luxurious skincare that you can feel good about using.
                        </p>
                    </section>
                </div>
            </Container>
        </div>
    );
}
