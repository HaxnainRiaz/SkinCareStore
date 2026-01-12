'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/lib/utils';

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, total, itemCount } = useCart();

    const shipping = total > 75 ? 0 : 10;
    const tax = total * 0.08;
    const grandTotal = total + shipping + tax;

    return (
        <div className="min-h-screen bg-[#FDFCFB]">
            <div className="bg-[#0a4019] text-white py-10 md:py-16">
                <Container>
                    <h1 className="text-3xl md:text-5xl font-heading font-bold">
                        Shopping Cart
                    </h1>
                </Container>
            </div>

            <Container className="py-8 md:py-12">
                {cart.length === 0 ? (
                    <div className="text-center py-16 md:py-24">
                        <svg className="w-16 h-16 md:w-24 md:h-24 mx-auto text-[#6B6B6B]/30 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        <h2 className="text-xl md:text-2xl font-heading font-semibold text-[#0a4019] mb-4">
                            Your cart is empty
                        </h2>
                        <p className="text-[#6B6B6B] mb-8">
                            Looks like you haven't added anything to your cart yet
                        </p>
                        <Link href="/shop">
                            <Button size="lg">Continue Shopping</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Cart items */}
                        <div className="lg:col-span-2 space-y-4">
                            {cart.map((item) => (
                                <div key={item.id} className="bg-white rounded-2xl p-4 md:p-6 shadow-[0_4px_20px_rgba(11,47,38,0.08)]">
                                    <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
                                        <div className="relative w-full sm:w-32 h-48 sm:h-32 flex-shrink-0 bg-[#F5F3F0] rounded-lg overflow-hidden">
                                            <Image
                                                src={item.image || `https://placehold.co/300x300/E5D5C2/0B2F26?text=${encodeURIComponent(item.title)}`}
                                                alt={item.title}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 640px) 100vw, 128px"
                                            />
                                        </div>

                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <div className="flex justify-between items-start mb-2">
                                                    <Link
                                                        href={`/product/${item.slug}`}
                                                        className="font-heading text-lg md:text-xl font-semibold text-[#0a4019] hover:text-[#051712] transition-colors leading-tight"
                                                    >
                                                        {item.title}
                                                    </Link>
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="text-[#6B6B6B] hover:text-red-500 transition-colors p-1"
                                                        aria-label="Remove item"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </button>
                                                </div>

                                                <p className="text-xl md:text-2xl font-semibold text-[#0a4019] mb-4">
                                                    {formatPrice(item.price)}
                                                </p>
                                            </div>

                                            <div className="flex flex-wrap items-center justify-between gap-4">
                                                <div className="flex items-center border-2 border-[#F5F3F0] rounded-lg">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="px-3 py-1.5 md:px-4 md:py-2 hover:bg-[#F5F3F0] transition-colors"
                                                        aria-label="Decrease quantity"
                                                    >
                                                        −
                                                    </button>
                                                    <span className="px-4 py-1.5 md:px-6 md:py-2 border-x-2 border-[#F5F3F0] min-w-[3rem] text-center">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="px-3 py-1.5 md:px-4 md:py-2 hover:bg-[#F5F3F0] transition-colors"
                                                        aria-label="Increase quantity"
                                                    >
                                                        +
                                                    </button>
                                                </div>

                                                <p className="text-[#6B6B6B] text-sm md:text-base">
                                                    Subtotal: <span className="font-semibold text-[#0a4019]">
                                                        {formatPrice(item.price * item.quantity)}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order summary */}
                        <div className="lg:col-span-1 mt-8 lg:mt-0">
                            <div className="bg-white space-y-3 rounded-2xl p-6 shadow-[0_4px_20px_rgba(11,47,38,0.08)] sticky top-24">
                                <h2 className="text-2xl font-heading font-bold text-[#0a4019]">
                                    Order Summary
                                </h2>

                                <div className="space-y-4">
                                    <div className="flex justify-between">
                                        <span className="text-[#6B6B6B]">Subtotal ({itemCount} items)</span>
                                        <span className="font-semibold">{formatPrice(total)}</span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-[#6B6B6B]">Shipping</span>
                                        <span className="font-semibold">
                                            {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                                        </span>
                                    </div>

                                    {total < 75 && (
                                        <p className="text-sm text-[#B8A68A]">
                                            Add {formatPrice(75 - total)} more for free shipping!
                                        </p>
                                    )}

                                    <div className="flex justify-between">
                                        <span className="text-[#6B6B6B]">Estimated Tax</span>
                                        <span className="font-semibold">{formatPrice(tax)}</span>
                                    </div>

                                    <div className="border-t-2 border-[#F5F3F0] pt-4">
                                        <div className="flex justify-between text-xl">
                                            <span className="font-heading font-bold text-[#0a4019]">Total</span>
                                            <span className="font-heading font-bold text-[#0a4019]">
                                                {formatPrice(grandTotal)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <Link href="/checkout">
                                    <Button className="w-full mb-3" size="lg">
                                        Proceed to Checkout
                                    </Button>
                                </Link>

                                <Link href="/shop">
                                    <Button variant="outline" className="w-full">
                                        Continue Shopping
                                    </Button>
                                </Link>

                                <div className="mt-6 space-y-3 text-sm text-[#6B6B6B]">
                                    <div className="flex items-center gap-2">
                                        <svg className="w-5 h-5 text-[#0a4019]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>Free returns within 30 days</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <svg className="w-5 h-5 text-[#0a4019]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>Secure checkout</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <svg className="w-5 h-5 text-[#0a4019]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>Ships within 2-3 business days</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Container>
        </div>
    );
}
