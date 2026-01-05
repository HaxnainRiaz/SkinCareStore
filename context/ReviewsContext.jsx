'use client';

import { createContext, useContext, useState, useCallback } from 'react';

const ReviewsContext = createContext();
const API_URL = process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/api` : "http://localhost:5000/api";

export function ReviewsProvider({ children }) {
    const [reviews, setReviews] = useState({}); // { [productId]: Review[] }
    const [isClient, setIsClient] = useState(true);

    const fetchReviews = useCallback(async (productId) => {
        try {
            const res = await fetch(`${API_URL}/reviews/product/${productId}`);
            const data = await res.json();

            if (data.success) {
                setReviews(prev => ({
                    ...prev,
                    [productId]: data.data
                }));
            }
        } catch (err) {
            console.error("Failed to fetch reviews", err);
        }
    }, []);

    const addReview = async (productId, reviewData) => {
        // reviewData contains rating, comment, title, resultsTime, skinType, recommend
        const token = localStorage.getItem("token");
        if (!token) return { success: false, message: "Please login to review" };

        try {
            const payload = {
                product: productId,
                ...reviewData
            };

            const res = await fetch(`${API_URL}/reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });
            const data = await res.json();

            if (data.success) {
                // Refresh reviews for this product
                await fetchReviews(productId);
                return { success: true };
            } else {
                return { success: false, message: data.message };
            }
        } catch (err) {
            return { success: false, message: err.message };
        }
    };

    const getReviews = (productId) => {
        return reviews[productId] || [];
    };

    return (
        <ReviewsContext.Provider value={{
            reviews,
            fetchReviews,
            addReview,
            getReviews,
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
