'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { useCart } from '@/hooks/useCart';
import MobileMenu from './MobileMenu';
import CartDrawer from '@/components/commerce/CartDrawer';
import SearchOverlay from '@/components/commerce/SearchOverlay';

import { useStoreAuth } from '@/context/StoreAuthContext';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const { itemCount, isClient } = useCart();
    const { user } = useStoreAuth();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navigation = [
        { name: 'Shop', href: '/shop' },
        { name: 'Journal', href: '/blog' },
        { name: 'Collections', href: '/collections' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <>
            <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-[0_4px_20px_#0a401914]' : 'bg-[#FDFCFB]'}`}>
                <Container>
                    <div className="flex items-center justify-between h-20">
                        {/* Mobile menu button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="lg:hidden p-2 text-[#0a4019] hover:bg-[#0a40191A] rounded-lg transition-colors"
                            aria-label="Open menu"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>

                        {/* Logo */}
                        <Link href="/" className="flex items-center">
                            <span><img className="w-8 h-8" src="/logo.png" /></span>
                            <h1 className="text-2xl md:text-3xl text-[#0a4019] font-heading font-semibold">
                                Luminelle
                            </h1>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center gap-8">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="text-[#0a4019] hover:text-[#0F3A2F] transition-colors font-medium"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </nav>

                        {/* Right side icons */}
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setIsSearchOpen(true)}
                                className="p-2 text-[#0a4019] hover:bg-[#0a40191A] rounded-lg transition-colors"
                                aria-label="Search"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>

                            <Link href="/wishlist" className="p-2 text-[#0a4019] hover:bg-[#0a40191A] rounded-lg transition-colors" aria-label="Wishlist">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </Link>

                            <Link href={user ? "/account" : "/account/login"} className="hidden md:block p-2 text-[#0a4019] hover:bg-[#0a40191A] rounded-lg transition-colors relative" aria-label="Account">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                {isClient && user && (
                                    <span className="absolute bottom-1 right-1 w-2 h-2 bg-[#d3d3d3] rounded-full border border-white" />
                                )}
                            </Link>

                            <button
                                onClick={() => setIsCartOpen(true)}
                                className="relative p-2 text-[#0a4019] hover:bg-[#0a40191A] rounded-lg transition-colors"
                                aria-label="Shopping cart"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                {isClient && itemCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-[#0a4019] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                                        {itemCount}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                </Container>
            </header>

            <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} navigation={navigation} />
            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
            <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </>

    );
}
