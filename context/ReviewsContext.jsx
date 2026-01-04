'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const ReviewsContext = createContext();

export function ReviewsProvider({ children }) {
    const [reviews, setReviews] = useState({});
    const [isClient, setIsClient] = useState(false);

    // Initialize reviews from localStorage on mount
    useEffect(() => {
        setIsClient(true);
        const savedReviews = localStorage.getItem('skincare-reviews');
        if (savedReviews) {
            setReviews(JSON.parse(savedReviews));
        } else {
            // Seed some initial demo reviews with the new rich structure
            const initialReviews = {
                '1': [ // Product ID 1
                    {
                        id: 'r1',
                        name: 'Sarah M.',
                        rating: 5,
                        date: '2023-11-15',
                        title: 'Visible glow in 2 weeks!',
                        comment: 'Absolutely love this serum! My skin tone became brighter and dark spots faded after two weeks. The serum absorbs fast and my face feels hydrated and softer. Highly recommend the bundle!',
                        resultsTime: '2 weeks',
                        skinType: 'Combination',
                        recommend: 'Yes'
                    },
                    {
                        id: 'r2',
                        name: 'Jessica K.',
                        rating: 4,
                        date: '2023-10-22',
                        title: 'Great product, but a bit pricey',
                        comment: 'The results are good, my skin feels smoother. Just wish the bottle was a bit bigger for the price.',
                        resultsTime: '3–4 weeks',
                        skinType: 'Dry',
                        recommend: 'Yes'
                    }
                ],
                '2': [
                    {
                        id: 'r3',
                        name: 'Emily R.',
                        rating: 5,
                        date: '2023-12-05',
                        title: 'Holy grail moisturizer',
                        comment: 'Best moisturizer I have ever used. Highly recommend for dry skin.',
                        resultsTime: '1 week',
                        skinType: 'Dry',
                        recommend: 'Yes'
                    }
                ]
            };
            setReviews(initialReviews);
            localStorage.setItem('skincare-reviews', JSON.stringify(initialReviews));
        }
    }, []);

    const addReview = (productId, review) => {
        const newReview = {
            id: Date.now().toString(),
            date: new Date().toISOString().split('T')[0],
            ...review
        };

        const updatedReviews = {
            ...reviews,
            [productId]: [newReview, ...(reviews[productId] || [])]
        };

        setReviews(updatedReviews);
        localStorage.setItem('skincare-reviews', JSON.stringify(updatedReviews));
    };

    const getReviews = (productId) => {
        return reviews[productId] || [];
    };

    const getAverageRating = (productId) => {
        const productReviews = reviews[productId] || [];
        if (productReviews.length === 0) return 0;
        const sum = productReviews.reduce((acc, review) => acc + review.rating, 0);
        return (sum / productReviews.length).toFixed(1);
    };

    return (
        <ReviewsContext.Provider value={{
            reviews,
            addReview,
            getReviews,
            getAverageRating,
            isClient
        }}>
            {children}
        </ReviewsContext.Provider>
    );
}

export function useReviews() {
    const context = useContext(ReviewsContext);
    if (!context) {
        throw new Error('useReviews must be used within a ReviewsProvider');
    }
    return context;
}
