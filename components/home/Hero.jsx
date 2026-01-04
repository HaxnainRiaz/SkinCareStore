'use client';

import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export default function Hero() {
    return (
        <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-organic">
            {/* Floating organic shapes */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-64 h-64 bg-secondary/20 organic-blob animate-float" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 organic-blob animate-float animation-delay-400" />
                <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-secondary-light/30 organic-blob animate-float animation-delay-200" />
            </div>

            <Container className="relative z-10">
                <div className="max-w-3xl">
                    <h1 className="text-5xl md:text-7xl font-heading font-bold text-primary mb-6 animate-fadeIn">
                        Transform your Skin
                    </h1>

                    <p className="text-xl md:text-2xl text-neutral-gray mb-8 animate-fadeIn animation-delay-200">
                        Get a Youthful, Radiant, and Healthy Glow through Organic Ingredients.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 animate-fadeIn animation-delay-400">
                        <Link href="/shop">
                            <Button size="lg" variant="primary">
                                Shop Collection
                            </Button>
                        </Link>
                        <Link href="/about">
                            <Button size="lg" variant="outline">
                                Our Story
                            </Button>
                        </Link>
                    </div>

                    <div className="mt-12 flex items-center gap-8 animate-fadeIn animation-delay-600">
                        <div className="text-center">
                            <p className="text-3xl font-heading font-semibold text-primary">100%</p>
                            <p className="text-sm text-neutral-gray">Natural</p>
                        </div>
                        <div className="text-center">
                            <p className="text-3xl font-heading font-semibold text-primary">Cruelty</p>
                            <p className="text-sm text-neutral-gray">Free</p>
                        </div>
                        <div className="text-center">
                            <p className="text-3xl font-heading font-semibold text-primary">Vegan</p>
                            <p className="text-sm text-neutral-gray">Friendly</p>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
