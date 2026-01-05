'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const StoreAuthContext = createContext();

const API_URL = process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/api` : "http://localhost:5000/api";

export function StoreAuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const loadUser = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setLoading(false);
            return;
        }

        try {
            const res = await fetch(`${API_URL}/auth/me`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await res.json();
            if (data.success) {
                setUser(data.data);
            } else {
                localStorage.removeItem("token");
                setUser(null);
            }
        } catch (error) {
            console.error("Error loading user:", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        loadUser();
    }, []);

    const login = async (email, password) => {
        try {
            const res = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();

            if (data.success) {
                localStorage.setItem("token", data.token);
                setUser(data.user);
                router.push("/account");
                return { success: true };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            return { success: false, message: "Server error" };
        }
    };

    const register = async (name, email, password) => {
        try {
            const res = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password, role: 'user' })
            });
            const data = await res.json();

            if (data.success) {
                localStorage.setItem("token", data.token);
                setUser(data.user);
                router.push("/account");
                return { success: true };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            return { success: false, message: "Server error" };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
        router.push('/');
    };

    // --- Wishlist & Addresses ---

    const toggleWishlist = async (productId) => {
        const token = localStorage.getItem("token");
        const isWishlisted = user?.wishlist?.includes(productId);
        const method = isWishlisted ? 'DELETE' : 'POST';

        try {
            const res = await fetch(`${API_URL}/users/wishlist/${productId}`, {
                method,
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.success) {
                setUser(prev => ({ ...prev, wishlist: data.data }));
                return true;
            }
        } catch (err) {
            console.error(err);
        }
        return false;
    };

    const addAddress = async (address) => {
        const token = localStorage.getItem("token");
        try {
            const res = await fetch(`${API_URL}/users/addresses`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(address)
            });
            const data = await res.json();
            if (data.success) {
                setUser(prev => ({ ...prev, addresses: data.data }));
                return true;
            }
        } catch (err) {
            console.error(err);
        }
        return false;
    };

    const getOrders = async () => {
        const token = localStorage.getItem("token");
        try {
            const res = await fetch(`${API_URL}/users/my-orders`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            return data.data;
        } catch (err) {
            console.error(err);
            return [];
        }
    };

    return (
        <StoreAuthContext.Provider value={{ user, loading, login, register, logout, toggleWishlist, addAddress, getOrders }}>
            {children}
        </StoreAuthContext.Provider>
    );
}

export const useStoreAuth = () => useContext(StoreAuthContext);
