'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const StoreAuthContext = createContext();

export function StoreAuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem('luminelle_customer');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        const users = JSON.parse(localStorage.getItem('luminelle_users') || '[]');
        const foundUser = users.find(u => u.email === email && u.password === password);

        if (foundUser) {
            const customer = { ...foundUser };
            delete customer.password; // Don't store password in session
            setUser(customer);
            localStorage.setItem('luminelle_customer', JSON.stringify(customer));
            router.push('/account');
            return { success: true };
        }

        // Demo fallback
        if (email === 'elena@example.com' && password === 'password123') {
            const customer = {
                id: 'c101',
                name: 'Elena Fisher',
                email: email,
                points: 125,
                tier: 'Gold',
                avatar: `https://ui-avatars.com/api/?name=Elena+Fisher&background=0B2F26&color=fff`
            };
            setUser(customer);
            localStorage.setItem('luminelle_customer', JSON.stringify(customer));
            router.push('/account');
            return { success: true };
        }

        return { success: false, message: 'Invalid email or password.' };
    };

    const register = (name, email, password) => {
        const users = JSON.parse(localStorage.getItem('luminelle_users') || '[]');

        if (users.find(u => u.email === email)) {
            return { success: false, message: 'Email already registered.' };
        }

        const newUser = {
            id: 'c' + Date.now(),
            name,
            email,
            password,
            points: 0,
            tier: 'Bronze',
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0B2F26&color=fff`
        };

        users.push(newUser);
        localStorage.setItem('luminelle_users', JSON.stringify(users));

        // Auto login after register
        const customer = { ...newUser };
        delete customer.password;
        setUser(customer);
        localStorage.setItem('luminelle_customer', JSON.stringify(customer));

        router.push('/account');
        return { success: true };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('luminelle_customer');
        router.push('/');
    };

    return (
        <StoreAuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </StoreAuthContext.Provider>
    );
}

export const useStoreAuth = () => useContext(StoreAuthContext);
