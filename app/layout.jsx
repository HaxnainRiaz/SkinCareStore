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
    metadataBase: new URL('https://luminelle.org'),
    title: 'Luminelle - Your Skin Deserves Better',
    description: 'Proven organic skincare for radiant, healthy skin. Crafted with nature’s finest ingredients.',
    keywords: 'organic soap, natural skincare, botanical beauty, kalonji soap, neem soap, kojic acid, healthy skin, radiant glow',
    openGraph: {
        title: 'Luminelle - Your Skin Deserves Better',
        description: 'Proven organic skincare for radiant, healthy skin. Crafted with nature’s finest ingredients.',
        url: 'https://luminelle.org',
        type: 'website',
        locale: 'en_US',
        siteName: 'Luminelle',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Luminelle - Your Skin Deserves Better',
        description: 'Proven organic skincare for radiant, healthy skin. Crafted with nature’s finest ingredients.',
    },
    icons: {
        icon: '/favicon.png',
        apple: '/favicon.png',
    },
};

import { StoreAuthProvider } from '@/context/StoreAuthContext';
import { CoreProvider } from '@/context/CoreContext';

import { ToastProvider } from '@/context/ToastContext';

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={`${inter.variable} ${cormorant.variable}`} suppressHydrationWarning>
            <body className="font-body antialiased bg-[#FDFCFB] text-[#6B6B6B]" suppressHydrationWarning>
                <ToastProvider>
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
                </ToastProvider>
            </body>
        </html>
    );
}
