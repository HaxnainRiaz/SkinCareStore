import { Container } from '@/components/ui/Container';

export const metadata = {
    title: 'About Us - Luminelle',
    description: 'Learn about our mission to create premium, ethical skincare products.',
};

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[#FDFCFB]">
            <div className="bg-[#0a4019] py-16">
                <Container>
                    <h1 className="text-4xl text-white md:text-5xl font-heading font-bold">Who We Are</h1>
                </Container>
            </div>

            <Container className="py-16">
                <div className="max-w-4xl mx-auto space-y-12">
                    <section id="story">
                        <h2 className="text-3xl font-heading font-bold text-[#0a4019] mb-6">Who We Are</h2>
                        <div className="space-y-4 text-lg text-[#6B6B6B]">
                            <p>
                                At Luminelle, we believe healthy, radiant skin comes from nature, not chemicals. We craft organic soaps using Aloe Vera, Neem, Kalonji, Carrot Seed Oil, Licorice Root, Witch Hazel, and Kojic Acid — combining nature’s best with modern knowledge.
                            </p>
                            <p>
                                We were tired of complicated skincare routines and chemical-filled promises. After a year of experimenting with Neem, Kalonji, Aloe Vera, and essential oils, we created soaps that truly work. Each bar is crafted with care, research, and passion — nature simplified, made effective, and made for you.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-3xl font-heading font-bold text-[#0a4019] mb-6">Our Values</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-white p-6 rounded-2xl shadow-[0_4px_20px_rgba(11,47,38,0.08)]">
                                <h3 className="text-xl font-heading font-semibold text-[#0a4019] mb-3">Clean Ingredients</h3>
                                <p className="text-[#6B6B6B]">
                                    We use only the finest natural and organic ingredients, free from parabens, sulfates, phthalates, and other harmful chemicals.
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-[0_4px_20px_rgba(11,47,38,0.08)]">
                                <h3 className="text-xl font-heading font-semibold text-[#0a4019] mb-3">Cruelty-Free</h3>
                                <p className="text-[#6B6B6B]">
                                    We never test on animals and are certified cruelty-free. All our products are 100% vegan.
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-[0_4px_20px_rgba(11,47,38,0.08)]">
                                <h3 className="text-xl font-heading font-semibold text-[#0a4019] mb-3">Sustainable</h3>
                                <p className="text-[#6B6B6B]">
                                    Our packaging is recyclable, and we're committed to reducing our carbon footprint through sustainable practices.
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-[0_4px_20_rgba(11,47,38,0.08)]">
                                <h3 className="text-xl font-heading font-semibold text-[#0a4019] mb-3">Ethical Sourcing</h3>
                                <p className="text-[#6B6B6B]">
                                    We partner with fair-trade suppliers and support local communities where our ingredients are sourced.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section id="sustainability">
                        <h2 className="text-3xl font-heading font-bold text-[#0a4019] mb-6">Sustainability Commitment</h2>
                        <div className="bg-[linear-gradient(135deg,#FDFCFB_0%,#F5F3F0_100%)] p-8 rounded-2xl">
                            <p className="text-lg text-[#6B6B6B] mb-6">
                                We're committed to minimizing our environmental impact at every step of our journey:
                            </p>
                            <ul className="space-y-3 text-[#6B6B6B]">
                                <li className="flex items-start gap-3">
                                    <span className="text-[#0a4019] mt-1">✓</span>
                                    <span>100% recyclable and biodegradable packaging materials</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-[#0a4019] mt-1">✓</span>
                                    <span>Carbon-neutral shipping on all orders</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-[#0a4019] mt-1">✓</span>
                                    <span>Sustainably sourced ingredients from certified organic farms</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-[#0a4019] mt-1">✓</span>
                                    <span>Partnership with reforestation programs - one tree planted for every order</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-[#0a4019] mt-1">✓</span>
                                    <span>Zero-waste manufacturing processes</span>
                                </li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-3xl font-heading font-bold text-[#0a4019] mb-6">Our Promise</h2>
                        <p className="text-lg text-[#6B6B6B]">
                            We promise to always prioritize your skin's health, our planet's wellbeing, and ethical business practices. Every product we create is a testament to our commitment to clean, effective, and luxurious skincare that you can feel good about using.
                        </p>
                    </section>
                </div>
            </Container>
        </div>
    );
}
