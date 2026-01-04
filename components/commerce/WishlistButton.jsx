'use client';

import { useState, useEffect } from 'react';
import { isInWishlist, toggleWishlist } from '@/lib/cart';

export default function WishlistButton({ productId, className = '' }) {
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        setIsWishlisted(isInWishlist(productId));
    }, [productId]);

    const handleToggle = (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(productId);
        setIsWishlisted(!isWishlisted);
    };

    if (!isClient) return null;

    return (
        <button
            onClick={handleToggle}
            className={`p-2 bg-white rounded-full shadow-soft hover:shadow-medium transition-all ${className}`}
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
            <svg
                className={`w-5 h-5 transition-colors ${isWishlisted ? 'fill-red-500 text-red-500' : 'fill-none text-primary'}`}
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
        </button>
    );
}
