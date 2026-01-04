'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';

export default function AnnouncementBar() {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <div className="bg-primary text-white py-2 text-sm relative">
            <Container>
                <div className="flex items-center justify-center gap-2">
                    <p className="text-center">
                        ✨ Free shipping on orders over $75 | Shop our new arrivals
                    </p>
                    <button
                        onClick={() => setIsVisible(false)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 hover:opacity-70 transition-opacity"
                        aria-label="Close announcement"
                    >
                        ✕
                    </button>
                </div>
            </Container>
        </div>
    );
}
