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
        <section className="section-padding bg-secondary">
            <Container>
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">
                        Join Our Community
                    </h2>
                    <p className="text-lg text-primary/80 mb-8">
                        Subscribe to receive exclusive offers, skincare tips, and early access to new products
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                            className="flex-1 px-6 py-3 rounded-lg border-2 border-primary/20 focus:border-primary focus:outline-none transition-colors"
                        />
                        <Button type="submit" variant="primary">
                            Subscribe
                        </Button>
                    </form>

                    {status === 'success' && (
                        <p className="mt-4 text-primary font-medium">
                            ✓ Thank you for subscribing!
                        </p>
                    )}

                    <p className="text-sm text-primary/60 mt-6">
                        By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
                    </p>
                </div>
            </Container>
        </section>
    );
}
