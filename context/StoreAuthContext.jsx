'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from './ToastContext';

const StoreAuthContext = createContext();

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

export function StoreAuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { addToast } = useToast();

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
                addToast(`Welcome back, ${data.user.name.split(' ')[0]}!`, 'success');
                router.push("/account");
                return { success: true };
            } else {
                addToast(data.message || "Login failed", 'error');
                return { success: false, message: data.message };
            }
        } catch (error) {
            addToast("Server connection failed", 'error');
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
                body: JSON.stringify({ name, email, password, role: 'customer' })
            });
            const data = await res.json();

            if (data.success) {
                localStorage.setItem("token", data.token);
                setUser(data.user);
                addToast("Account created successfully! Welcome to Luminelle.", 'success');
                router.push("/account");
                return { success: true };
            } else {
                addToast(data.message || "Registration failed", 'error');
                return { success: false, message: data.message };
            }
        } catch (error) {
            addToast("Registration failed. Please try again later.", 'error');
            return { success: false, message: "Server error" };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
        addToast("Signed out successfully", 'info');
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
                addToast("Address added successfully", 'success');
                return true;
            }
        } catch (err) {
            console.error(err);
        }
        return false;
    };

    const deleteAddress = async (addressId) => {
        const token = localStorage.getItem("token");
        try {
            const res = await fetch(`${API_URL}/users/addresses/${addressId}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.success) {
                setUser(prev => ({ ...prev, addresses: data.data }));
                addToast("Address removed", 'info');
                return true;
            }
        } catch (err) {
            console.error(err);
        }
        return false;
    };

    const updateProfile = async (profileData) => {
        const token = localStorage.getItem("token");
        try {
            const res = await fetch(`${API_URL}/users/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(profileData)
            });
            const data = await res.json();
            if (data.success) {
                setUser(data.data);
                addToast("Profile updated successfully", 'success');
                return true;
            } else {
                addToast(data.message || "Failed to update profile", 'error');
            }
        } catch (err) {
            console.error(err);
            addToast("Server error updating profile", 'error');
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
        <StoreAuthContext.Provider value={{
            user,
            loading,
            login,
            register,
            logout,
            toggleWishlist,
            addAddress,
            deleteAddress,
            getOrders,
            updateProfile
        }}>
            {children}
        </StoreAuthContext.Provider>
    );
}

export const useStoreAuth = () => useContext(StoreAuthContext);
