'use client';
import { Container } from '@/components/ui/Container';

export default function BrandStory() {
    return (
        <section className="section-padding bg-[linear-gradient(135deg,#D1BFA31A_0%,#0B2F260D_100%)]">
            <Container>
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl text-[#0B2F26] md:text-5xl font-heading font-bold mb-6">
                        Our Story
                    </h2>

                    <p className="text-lg text-[#6B6B6B] mb-6">
                        We were tired of complicated skincare routines and chemical-filled promises. After a year of experimenting with Neem, Kalonji, Aloe Vera, and essential oils, we created soaps that truly work.
                    </p>

                    <p className="text-lg text-[#6B6B6B] mb-6">
                        Each bar is crafted with care, research, and passion — nature simplified, made effective, and made for you. We believe in trust, transparency, and the power of nature.
                    </p>

                    <p className="text-lg text-[#6B6B6B] mb-12">
                        Our mission is to simplify skincare using proven, organic ingredients that deliver real results. Join our community and choose care over chemicals.
                    </p>

                    <div className="flex justify-center mb-16">
                        <button
                            onClick={() => document.getElementById('newsletter')?.scrollIntoView({ behavior: 'smooth' })}
                            className="bg-[#0B2F26] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#0F3A2F] transition-all shadow-[0_4px_20px_#0B2F2614]"
                        >
                            Join Our Community
                        </button>
                    </div>

                    <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
                        <div className="text-center">
                            <p className="text-4xl font-heading font-bold text-[#0B2F26] mb-2">50K+</p>
                            <p className="text-[#6B6B6B]">Happy Customers</p>
                        </div>
                        <div className="text-center">
                            <p className="text-4xl font-heading font-bold text-[#0B2F26] mb-2">4.8</p>
                            <p className="text-[#6B6B6B]">Average Rating</p>
                        </div>
                        <div className="text-center">
                            <p className="text-4xl font-heading font-bold text-[#0B2F26] mb-2">100%</p>
                            <p className="text-[#6B6B6B]">Natural</p>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
