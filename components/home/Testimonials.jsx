'use client';

import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { useState } from 'react';

export default function Testimonials() {
    const testimonials = [
        {
            name: 'Sarah Mitchell',
            location: 'New York, NY',
            rating: 5,
            text: 'The Radiant Glow Serum has completely transformed my skin! I noticed a visible difference in just two weeks. My complexion is brighter and more even.',
            product: 'Radiant Glow Serum',
        },
        {
            name: 'Emily Chen',
            location: 'Los Angeles, CA',
            rating: 5,
            text: 'I have sensitive skin and most products irritate it, but Luminelle is so gentle yet effective. The Deep Hydration Cream is my holy grail!',
            product: 'Deep Hydration Cream',
        },
        {
            name: 'Jessica Rodriguez',
            location: 'Miami, FL',
            rating: 5,
            text: 'Finally found a luxury skincare brand that actually delivers on its promises. The quality is exceptional and my skin has never looked better.',
            product: 'Retinol Night Treatment',
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const next = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prev = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <section className="py-3 md:py-6 lg:py-8 bg-white overflow-hidden relative">
            <Container>
                <div className="space-y-3 md:space-y-6 lg:space-y-8">
                    <div className="text-center space-y-4">
                        <h2 className="text-[#0a4019] [font-size:clamp(1.875rem,1.5rem+2vw,3.5rem)] leading-tight">
                            Community Narratives
                        </h2>
                        <p className="text-base md:text-lg text-[#6B6B6B] max-w-2xl mx-auto leading-relaxed">
                            Real results and botanic rituals shared by our refined community.
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto relative group">
                        <Card className="p-3 md:p-6 lg:p-8 relative overflow-hidden bg-[#FDFCFB] border-[#F5F3F0]">
                            {/* Decorative Quote Mark */}
                            <div className="absolute top-0 left-0 p-3 md:p-6 lg:p-8 opacity-[0.03] select-none pointer-events-none">
                                <svg className="w-24 h-24 md:w-40 md:h-40" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C14.9124 8 14.017 7.10457 14.017 6V3H21.017V15C21.017 18.3137 18.3307 21 15.017 21H14.017ZM3.01697 21L3.01697 18C3.01697 16.8954 3.9124 16 5.01697 16H8.01697C8.56925 16 9.01697 15.5523 9.01697 15V9C9.01697 8.44772 8.56925 8 8.01697 8H5.01697C3.9124 8 3.01697 7.10457 3.01697 6V3H10.017V15C10.017 18.3137 7.33068 21 4.01697 21H3.01697Z" />
                                </svg>
                            </div>

                            <div className="relative space-y-10 text-center">
                                <div className="flex items-center justify-center gap-1">
                                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                                        <svg key={i} className="w-5 h-5 text-[#d3d3d3]" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>

                                <p className="text-xl md:text-2xl lg:text-3xl font-heading text-[#0a4019] italic leading-relaxed md:leading-loose">
                                    "{testimonials[currentIndex].text}"
                                </p>

                                <div className="space-y-3">
                                    <div className="h-px w-12 bg-[#d3d3d3] mx-auto opacity-30" />
                                    <div className="text-center">
                                        <p className="font-bold text-[#0a4019] uppercase tracking-[0.2em] text-[10px] md:text-sm">
                                            {testimonials[currentIndex].name}
                                        </p>
                                        <p className="text-[10px] md:text-xs font-medium text-[#6B6B6B]/60 uppercase tracking-widest mt-1">
                                            {testimonials[currentIndex].location}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Navigation Controls */}
                        <div className="flex items-center justify-center gap-6 mt-12">
                            <button
                                onClick={prev}
                                className="w-14 h-14 rounded-full border border-[#F5F3F0] text-[#0a4019] hover:bg-[#0a4019] hover:text-white transition-all flex items-center justify-center shadow-sm group/btn"
                                aria-label="Previous testimonial"
                            >
                                <svg className="w-6 h-6 group-hover/btn:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" /></svg>
                            </button>

                            <div className="flex gap-3">
                                {testimonials.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentIndex(index)}
                                        className={`h-1.5 rounded-full transition-all duration-500 ${index === currentIndex ? 'bg-[#0a4019] w-12' : 'bg-[#F5F3F0] w-3 hover:bg-[#B8A68A]'
                                            }`}
                                        aria-label={`Go to testimonial ${index + 1}`}
                                    />
                                ))}
                            </div>

                            <button
                                onClick={next}
                                className="w-14 h-14 rounded-full border border-[#F5F3F0] text-[#0a4019] hover:bg-[#0a4019] hover:text-white transition-all flex items-center justify-center shadow-sm group/btn"
                                aria-label="Next testimonial"
                            >
                                <svg className="w-6 h-6 group-hover/btn:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" /></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </Container>
        </section>

    );
}
