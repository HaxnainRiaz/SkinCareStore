'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function MobileMenu({ isOpen, onClose, navigation }) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 z-50 lg:hidden"
                onClick={onClose}
            />

            {/* Menu */}
            <div className="fixed inset-y-0 left-0 w-80 bg-white z-50 lg:hidden shadow-large overflow-y-auto">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-heading font-semibold text-primary">Menu</h2>
                        <button
                            onClick={onClose}
                            className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                            aria-label="Close menu"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <nav className="space-y-4">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={onClose}
                                className="block py-3 text-lg text-primary hover:text-primary-light transition-colors font-medium"
                            >
                                {item.name}
                            </Link>
                        ))}

                        <hr className="my-4 border-neutral-beige" />

                        <Link
                            href="/account/login"
                            onClick={onClose}
                            className="block py-3 text-lg text-primary hover:text-primary-light transition-colors font-medium"
                        >
                            Account
                        </Link>
                    </nav>
                </div>
            </div>
        </>
    );
}
