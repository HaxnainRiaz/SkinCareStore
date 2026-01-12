'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const CoreContext = createContext();

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

export function CoreProvider({ children }) {
    const [settings, setSettings] = useState({
        announcementBarText: "Free Shipping on Orders Over Rs. 5,000",
        showNewsletterSection: true,
        showFeaturedCollection: true,
        showBlogSection: true
    });

    const [banners, setBanners] = useState([]);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(async () => {
        try {
            const [resProd, resCat, resBanners, resSettings, resBlogs] = await Promise.all([
                fetch(`${API_URL}/products`, { cache: 'no-store' }),
                fetch(`${API_URL}/categories`, { cache: 'no-store' }),
                fetch(`${API_URL}/banners`, { cache: 'no-store' }),
                fetch(`${API_URL}/settings`, { cache: 'no-store' }),
                fetch(`${API_URL}/blogs`, { cache: 'no-store' })
            ]);

            const dataProd = await resProd.json();
            if (dataProd.success) setProducts(dataProd.data);

            const dataCat = await resCat.json();
            if (dataCat.success) setCategories(dataCat.data);

            const dataBanners = await resBanners.json();
            if (dataBanners.success) setBanners(dataBanners.data);

            const dataSettings = await resSettings.json();
            if (dataSettings.success) setSettings(dataSettings.data);

            const dataBlogs = await resBlogs.json();
            if (dataBlogs.success) setBlogs(dataBlogs.data);

            setLoading(false);
        } catch (error) {
            console.error("Error fetching store data:", error);
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const subscribeNewsletter = async (email) => {
        try {
            const res = await fetch(`${API_URL}/newsletter`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const data = await res.json();
            return data;
        } catch (err) {
            return { success: false, message: 'Server error' };
        }
    };

    const submitSupportTicket = async (ticketData) => {
        try {
            const res = await fetch(`${API_URL}/support-tickets`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(ticketData)
            });
            const data = await res.json();
            return data;
        } catch (err) {
            return { success: false, message: 'Server error' };
        }
    };

    const addBlogComment = async (blogId, commentData) => {
        try {
            const res = await fetch(`${API_URL}/blogs/${blogId}/comments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(commentData)
            });
            const data = await res.json();
            if (data.success) {
                // Update local state for immediate feedback
                setBlogs(prev => prev.map(b => b._id === blogId ? {
                    ...b,
                    comments: [data.data, ...(b.comments || [])]
                } : b));
            }
            return data;
        } catch (err) {
            return { success: false, message: 'Server error' };
        }
    };

    return (
        <CoreContext.Provider value={{
            settings,
            banners,
            products,
            categories,
            blogs,
            loading,
            subscribeNewsletter,
            submitSupportTicket,
            addBlogComment,
            refreshData: fetchData
        }}>
            {children}
        </CoreContext.Provider>
    );
}

export const useCore = () => useContext(CoreContext);
