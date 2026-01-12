'use client';
import { Container } from '@/components/ui/Container';

export default function BrandStory() {
    return (
        <section className="py-3 md:py-6 lg:py-8 bg-[linear-gradient(135deg,#d3d3d31A_0%,#0a40190D_100%)] overflow-hidden">
            <Container>
                <div className="max-w-4xl mx-auto space-y-3 md:space-y-6 lg:space-y-8">
                    <div className="text-center space-y-4">
                        <h2 className="text-[#0a4019] [font-size:clamp(1.875rem,1.5rem+2vw,3.5rem)] leading-tight">
                            Our Story
                        </h2>
                    </div>

                    <div className="space-y-3 md:space-y-6 lg:space-y-8 text-center">
                        <p className="text-base md:text-lg text-[#6B6B6B] leading-relaxed">
                            We were tired of complicated skincare routines and chemical-filled promises. After a year of experimenting with Neem, Kalonji, Aloe Vera, and essential oils, we created soaps that truly work.
                        </p>

                        <p className="text-base md:text-lg text-[#6B6B6B] leading-relaxed">
                            Each bar is crafted with care, research, and passion — nature simplified, made effective, and made for you. We believe in trust, transparency, and the power of nature.
                        </p>

                        <p className="text-base md:text-lg text-[#6B6B6B] leading-relaxed">
                            Our mission is to simplify skincare using proven, organic ingredients that deliver real results. Join our community and choose care over chemicals.
                        </p>

                        <div className="pt-6 flex justify-center">
                            <button
                                onClick={() => document.getElementById('newsletter')?.scrollIntoView({ behavior: 'smooth' })}
                                className="bg-[#0a4019] text-white px-10 h-16 rounded-full font-bold uppercase tracking-widest text-[11px] hover:bg-[#0F3A2F] active:scale-95 transition-all shadow-2xl shadow-[#0a4019]/10"
                            >
                                Join Our Community
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-6 lg:gap-8 max-w-3xl mx-auto border-t border-[#0a4019]/5 pt-3 md:pt-6 lg:pt-8">
                        <div className="text-center space-y-2">
                            <p className="text-4xl md:text-5xl font-heading font-bold text-[#0a4019]">50K+</p>
                            <p className="text-[10px] font-bold text-[#6B6B6B]/60 uppercase tracking-widest">Happy Customers</p>
                        </div>
                        <div className="text-center space-y-2 border-y sm:border-y-0 sm:border-x border-[#0a4019]/5 py-3 md:py-6 lg:py-8">
                            <p className="text-4xl md:text-5xl font-heading font-bold text-[#0a4019]">4.8</p>
                            <p className="text-[10px] font-bold text-[#6B6B6B]/60 uppercase tracking-widest">Average Rating</p>
                        </div>
                        <div className="text-center space-y-2">
                            <p className="text-4xl md:text-5xl font-heading font-bold text-[#0a4019]">100%</p>
                            <p className="text-[10px] font-bold text-[#6B6B6B]/60 uppercase tracking-widest">Natural Origin</p>
                        </div>
                    </div>
                </div>
            </Container>
        </section>

    );
}
