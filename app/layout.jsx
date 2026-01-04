import { Inter, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import { CartProvider } from '@/context/CartContext';
import { ReviewsProvider } from '@/context/ReviewsContext';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

const cormorant = Cormorant_Garamond({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
    variable: '--font-cormorant',
    display: 'swap',
});

export const metadata = {
    title: 'Luminelle Organics - Premium Luxury Skincare',
    description: 'Discover our collection of premium, botanical-infused skincare products. Luxury formulations for radiant, healthy skin.',
    keywords: 'luxury skincare, premium skincare, botanical skincare, natural beauty, anti-aging, serums, moisturizers',
    openGraph: {
        title: 'Luminelle Organics - Premium Luxury Skincare',
        description: 'Discover our collection of premium, botanical-infused skincare products.',
        type: 'website',
        locale: 'en_US',
        siteName: 'Luminelle Organics',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Luminelle Organics - Premium Luxury Skincare',
        description: 'Discover our collection of premium, botanical-infused skincare products.',
    },
};

import { StoreAuthProvider } from '@/context/StoreAuthContext';
import { CoreProvider } from '@/context/CoreContext';

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={`${inter.variable} ${cormorant.variable}`} suppressHydrationWarning>
            <body className="font-body antialiased bg-neutral-cream text-neutral-gray" suppressHydrationWarning>
                <StoreAuthProvider>
                    <CoreProvider>
                        <CartProvider>
                            <ReviewsProvider>
                                <AnnouncementBar />
                                <Header />
                                <main className="min-h-screen">
                                    {children}
                                </main>
                                <Footer />
                            </ReviewsProvider>
                        </CartProvider>
                    </CoreProvider>
                </StoreAuthProvider>
            </body>
        </html>
    );
}
