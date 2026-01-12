'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Container, Button } from '@/components/ui';
import { useCore } from '@/context/CoreContext';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const HERO_IMAGES = [
    "/hero1.png",
    "/hero2.png",
    "/hero3.png"
];

export default function Hero() {
    const { cms } = useCore();
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (

        <section className="relative min-h-[85vh] md:min-h-[90vh] flex items-center overflow-hidden py-3 md:py-6 lg:py-8">
            {/* Background Image Slider - Pure Image, No Overlays */}
            <div className="absolute inset-0 -z-20">
                <AnimatePresence mode="popLayout">
                    <motion.img
                        key={currentImage}
                        src={HERO_IMAGES[currentImage]}
                        alt="Hero Background"
                        className="absolute inset-0 w-full h-full object-cover"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                    />
                </AnimatePresence>
            </div>

            <Container className="relative z-10 box-border">
                <div className="max-w-3xl space-y-3 md:space-y-6">
                    <div className="space-y-6">
                        <h1 className="text-[#0a4019] leading-[1.1] animate-slideDown [font-size:clamp(2.25rem,1.5rem+4vw,4.5rem)]">
                            {cms?.heroHeadline || "Transform your Skin"}
                        </h1>

                        <p className="text-base md:text-xl text-[#ffffff] max-w-2xl animate-fadeIn animation-delay-200 leading-relaxed md:leading-loose">
                            {cms?.heroSubheadline || "An organic, skin-loving cleanse infused with Kalonji, Neem, and Kojic Acid for women who choose care over chemicals."}
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 animate-fadeIn animation-delay-400">
                        <Link href="/shop" className="w-full sm:w-auto">
                            <Button size="lg" className="w-full px-10 h-16 rounded-full font-bold uppercase tracking-widest text-[11px] shadow-2xl shadow-[#0a4019]/10">
                                <Sparkles size={18} className="mr-3" />
                                Shop Now
                            </Button>
                        </Link>
                        <Link href="/about" className="w-full sm:w-auto">
                            <Button size="lg" variant="outline" className="w-full px-10 h-16 rounded-full font-bold uppercase tracking-widest text-[11px] border-[#0a4019]/10 hover:border-[#0a4019] bg-white/40 backdrop-blur-md">
                                Why it Works
                                <ArrowRight size={18} className="ml-3" />
                            </Button>
                        </Link>
                    </div>

                    <div className="pt-4 flex flex-wrap items-center gap-x-12 gap-y-8 animate-fadeIn animation-delay-600">
                        <div className="space-y-1 border-l-2 border-[#d3d3d3] pl-6">
                            <p className="text-2xl md:text-4xl font-heading font-bold text-[#0a4019]">100%</p>
                            <p className="text-[10px] font-bold text-[#ffffff]/60 uppercase tracking-widest">Natural Origin</p>
                        </div>
                        <div className="space-y-1 border-l-2 border-[#d3d3d3] pl-6">
                            <p className="text-2xl md:text-4xl font-heading font-bold text-[#0a4019]">Cruelty</p>
                            <p className="text-[10px] font-bold text-[#ffffff]/60 uppercase tracking-widest">Free Rituals</p>
                        </div>
                        <div className="space-y-1 border-l-2 border-[#d3d3d3] pl-6">
                            <p className="text-2xl md:text-4xl font-heading font-bold text-[#0a4019]">Vegan</p>
                            <p className="text-[10px] font-bold text-[#6B6B6B]/60 uppercase tracking-widest">Friendly</p>
                        </div>
                    </div>
                </div>
            </Container>
        </section>

    );
}
