import { Inter, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import { CartProvider } from '@/context/CartContext';

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
    title: 'Luxe Botanica - Premium Luxury Skincare',
    description: 'Discover our collection of premium, botanical-infused skincare products. Luxury formulations for radiant, healthy skin.',
    keywords: 'luxury skincare, premium skincare, botanical skincare, natural beauty, anti-aging, serums, moisturizers',
    openGraph: {
        title: 'Luxe Botanica - Premium Luxury Skincare',
        description: 'Discover our collection of premium, botanical-infused skincare products.',
        type: 'website',
        locale: 'en_US',
        siteName: 'Luxe Botanica',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Luxe Botanica - Premium Luxury Skincare',
        description: 'Discover our collection of premium, botanical-infused skincare products.',
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
            <body className="font-body antialiased bg-neutral-cream text-neutral-gray">
                <CartProvider>
                    <AnnouncementBar />
                    <Header />
                    <main className="min-h-screen">
                        {children}
                    </main>
                    <Footer />
                </CartProvider>
            </body>
        </html>
    );
}
