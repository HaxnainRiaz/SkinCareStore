'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const CoreContext = createContext();

export function CoreProvider({ children }) {
    // Default fallback data
    const [cms, setCms] = useState({
        announcement: "Free Shipping on Orders Over $75",
        heroHeadline: "Redefining Natural Luxury",
        heroSubheadline: "Clinically proven, organic skincare for the modern era.",
        sections: {
            featuredProducts: true,
            blog: true,
            newsletter: true
        }
    });

    const [discounts, setDiscounts] = useState([
        { id: 1, code: "WELCOME10", type: "percent", value: 10, minSpend: 50 },
        { id: 2, code: "FSHO", type: "flat", value: 15, minSpend: 100 },
    ]);

    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Sync with LocalStorage (shared with Admin conceptually)
        const updateSync = () => {
            const savedCms = localStorage.getItem('luminelle_cms');
            if (savedCms) setCms(JSON.parse(savedCms));

            const savedDiscounts = localStorage.getItem('luminelle_discounts');
            if (savedDiscounts) setDiscounts(JSON.parse(savedDiscounts));

            const savedProducts = localStorage.getItem('luminelle_products');
            if (savedProducts) setProducts(JSON.parse(savedProducts));
        };

        updateSync();
        // Listen for storage changes if multiple tabs are open
        window.addEventListener('storage', updateSync);
        return () => window.removeEventListener('storage', updateSync);
    }, []);

    return (
        <CoreContext.Provider value={{ cms, discounts, products }}>
            {children}
        </CoreContext.Provider>
    );
}

export const useCore = () => useContext(CoreContext);
