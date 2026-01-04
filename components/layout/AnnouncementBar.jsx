'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { useCore } from '@/context/CoreContext';

export default function AnnouncementBar() {
    const { cms } = useCore();
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible || !cms?.announcement) return null;

    return (
        <div className="bg-primary text-white py-2 text-xs md:text-sm relative z-50">
            <Container>
                <div className="flex items-center justify-center gap-2 px-8">
                    <p className="text-center font-medium tracking-wide">
                        {cms.announcement}
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
