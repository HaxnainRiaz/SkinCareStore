'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { getCart, addToCart as addToCartUtil, removeFromCart as removeFromCartUtil, updateCartItemQuantity as updateQuantityUtil, clearCart as clearCartUtil, getCartTotal, getCartItemCount } from '@/lib/cart';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [isClient, setIsClient] = useState(false);

    // Initialize cart from localStorage on mount
    useEffect(() => {
        setIsClient(true);
        setCart(getCart());
    }, []);

    // Listen for storage events to sync across tabs
    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === 'skincare-cart') {
                setCart(getCart());
            }
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const addToCart = (product, quantity = 1) => {
        const updatedCart = addToCartUtil(product, quantity);
        setCart([...updatedCart]); // Create new reference to trigger render
    };

    const removeFromCart = (productId) => {
        const updatedCart = removeFromCartUtil(productId);
        setCart([...updatedCart]);
    };

    const updateQuantity = (productId, quantity) => {
        const updatedCart = updateQuantityUtil(productId, quantity);
        setCart([...updatedCart]);
    };

    const clearCart = () => {
        const updatedCart = clearCartUtil();
        setCart(updatedCart);
    };

    const total = getCartTotal(cart);
    const itemCount = getCartItemCount(cart);

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            total,
            itemCount,
            isClient
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
