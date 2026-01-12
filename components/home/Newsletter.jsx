'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export default function Newsletter() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            setStatus('success');
            setEmail('');
            setTimeout(() => setStatus(''), 3000);
        }
    };

    return (
        <section id="newsletter" className="py-3 md:py-6 lg:py-8 bg-[#f3f4f0] overflow-hidden relative">
            {/* Ambient Background Decoration */}
            <div className="absolute top-0 right-0 w-[40%] aspect-square bg-white opacity-20 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />

            <Container>
                <div className="max-w-3xl mx-auto text-center space-y-3 md:space-y-6 lg:space-y-8">
                    <div className="space-y-4">
                        <h2 className="text-[#0a4019] [font-size:clamp(1.875rem,2rem+2vw,3.5rem)] leading-tight">
                            Join Our Community
                        </h2>
                        <p className="text-base md:text-lg text-[#0a4019CC] max-w-xl mx-auto leading-relaxed">
                            Subscribe to receive exclusive offers, skincare tips, and early access to new botanical formulations.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto relative group">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                            className="flex-1 px-10 py-5 h-16 rounded-full bg-white/50 backdrop-blur-sm border-2 border-[#0a4019]/10 focus:border-[#0a4019] focus:bg-white focus:outline-none transition-all duration-300 text-[#0a4019] placeholder-[#0a401966]"
                        />
                        <Button type="submit" className="h-16 px-10 rounded-full bg-[#0a4019] text-white font-bold uppercase tracking-widest text-[11px] shadow-2xl shadow-[#0a4019]/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                            Subscribe
                        </Button>
                    </form>

                    <div className="space-y-3">
                        {status === 'success' && (
                            <p className="text-[#0a4019] font-bold text-sm flex items-center justify-center gap-2 animate-fadeIn">
                                <span className="w-5 h-5 rounded-full bg-[#0a4019] text-[#d3d3d3] flex items-center justify-center text-[10px]">✓</span>
                                Welcome to the fold.
                            </p>
                        )}

                        <p className="text-[10px] md:text-xs font-medium text-[#0a4019]/60 uppercase tracking-widest">
                            Privacy honored. Rituals respected. Unsubscribe anytime.
                        </p>
                    </div>
                </div>
            </Container>
        </section>

    );
}
