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
        <section id="newsletter" className="section-padding bg-[#D1BFA3]">
            <Container>
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#0B2F26] mb-4">
                        Join Our Community
                    </h2>
                    <p className="text-lg text-[#0B2F26CC] mb-8">
                        Subscribe to receive exclusive offers, skincare tips, and early access to new products
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                            className="flex-1 px-6 py-3 rounded-lg border-2 border-[#0B2F2633] focus:border-[#0B2F26] focus:outline-none transition-colors"
                        />
                        <Button type="submit" variant="primary">
                            Subscribe
                        </Button>
                    </form>

                    {status === 'success' && (
                        <p className="mt-4 text-[#0B2F26] font-medium">
                            ✓ Thank you for subscribing!
                        </p>
                    )}

                    <p className="text-sm text-[#0B2F2699] mt-6">
                        By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
                    </p>
                </div>
            </Container>
        </section>
    );
}
