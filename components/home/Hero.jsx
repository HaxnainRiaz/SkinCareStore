'use client';

import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { useCore } from '@/context/CoreContext';

export default function Hero() {
    const { cms } = useCore();

    return (
        <section className="relative min-h-[90vh] flex items-center overflow-hidden">
            <Container className="relative z-10">
                <div className="max-w-3xl">
                    <h1 className="text-4xl md:text-6xl font-heading font-bold text-[#0B2F26] mb-6 animate-slideDown">
                        {cms?.heroHeadline || "Transform your Skin"}
                    </h1>

                    <p className="text-lg md:text-xl text-[#6B6B6B] mb-8 animate-fadeIn animation-delay-200">
                        {cms?.heroSubheadline || "An organic, skin-loving cleanse infused with Kalonji, Neem, and Kojic Acid for women who choose care over chemicals."}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 animate-fadeIn animation-delay-400">
                        <Link href="/shop">
                            <Button size="lg" variant="primary">
                                Shop Now
                            </Button>
                        </Link>
                        <Link href="/about">
                            <Button size="lg" variant="outline">
                                Why it Works
                            </Button>
                        </Link>
                    </div>

                    <div className="mt-12 flex items-center gap-8 animate-fadeIn animation-delay-600">
                        <div className="text-center">
                            <p className="text-3xl font-heading font-semibold text-[#0B2F26]">100%</p>
                            <p className="text-sm text-[#6B6B6B]">Natural</p>
                        </div>
                        <div className="text-center">
                            <p className="text-3xl font-heading font-semibold text-[#0B2F26]">Cruelty</p>
                            <p className="text-sm text-[#6B6B6B]">Free</p>
                        </div>
                        <div className="text-center">
                            <p className="text-3xl font-heading font-semibold text-[#0B2F26]">Vegan</p>
                            <p className="text-sm text-[#6B6B6B]">Friendly</p>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
