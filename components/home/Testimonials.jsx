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
            text: 'I have sensitive skin and most products irritate it, but Luminelle Organics is so gentle yet effective. The Deep Hydration Cream is my holy grail!',
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
        <section className="section-padding bg-white">
            <Container>
                <div className="text-center mb-12">
                    <h2 className="text-4xl text-[#0B2F26] md:text-5xl font-heading font-bold mb-4">
                        What Our Customers Say
                    </h2>
                    <p className="text-lg text-[#6B6B6B] max-w-2xl mx-auto">
                        Real results from real people
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <Card className="p-8 md:p-12">
                        <div className="flex items-center justify-center mb-6">
                            {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                                <svg
                                    key={i}
                                    className="w-6 h-6 text-yellow-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>

                        <p className="text-xl md:text-2xl text-[#6B6B6B] text-center mb-8 italic">
                            "{testimonials[currentIndex].text}"
                        </p>

                        <div className="text-center">
                            <p className="font-heading text-lg font-semibold text-[#0B2F26]">
                                {testimonials[currentIndex].name}
                            </p>
                            <p className="text-[#6B6B6B]">
                                {testimonials[currentIndex].location}
                            </p>
                            <p className="text-sm text-[#B8A68A] mt-2">
                                Verified Purchase: {testimonials[currentIndex].product}
                            </p>
                        </div>
                    </Card>

                    <div className="flex items-center justify-center gap-4 mt-8">
                        <button
                            onClick={prev}
                            className="w-12 h-12 rounded-full border-2 border-[#0B2F26] text-[#0B2F26] hover:bg-[#0B2F26] hover:text-white transition-colors flex items-center justify-center"
                            aria-label="Previous testimonial"
                        >
                            ←
                        </button>

                        <div className="flex gap-2">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? 'bg-[#0B2F26] w-8' : 'bg-[#F5F3F0]'
                                        }`}
                                    aria-label={`Go to testimonial ${index + 1}`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={next}
                            className="w-12 h-12 rounded-full border-2 border-[#0B2F26] text-[#0B2F26] hover:bg-[#0B2F26] hover:text-white transition-colors flex items-center justify-center"
                            aria-label="Next testimonial"
                        >
                            →
                        </button>
                    </div>
                </div>
            </Container>
        </section>
    );
}
