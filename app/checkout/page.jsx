'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/lib/utils';
import { useCore } from '@/context/CoreContext';

export default function CheckoutPage() {
    const { cart, total } = useCart();
    const { discounts } = useCore();

    const [couponInput, setCouponInput] = useState('');
    const [appliedDiscount, setAppliedDiscount] = useState(null);
    const [couponError, setCouponError] = useState('');

    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'United States',
        phone: '',
    });

    const handleApplyCoupon = () => {
        setCouponError('');
        const found = discounts.find(d => d.code === couponInput);
        if (!found) {
            setCouponError('Invalid coupon code');
            return;
        }
        if (total < found.minSpend) {
            setCouponError(`Minimum spend of $${found.minSpend} required`);
            return;
        }
        setAppliedDiscount(found);
        setCouponInput('');
    };

    const discountAmount = appliedDiscount
        ? (appliedDiscount.type === 'percent' ? (total * appliedDiscount.value / 100) : appliedDiscount.value)
        : 0;

    const shipping = total > 75 ? 0 : 10;
    const tax = (total - discountAmount) * 0.08;
    const grandTotal = total - discountAmount + shipping + tax;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('This is a demo checkout. In production, this would process the payment.');
    };

    if (cart.length === 0) {
        return (
            <Container className="py-24 text-center">
                <h1 className="text-3xl font-heading font-bold text-primary mb-4">Your cart is empty</h1>
                <Link href="/shop">
                    <Button>Continue Shopping</Button>
                </Link>
            </Container>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-cream">
            <Container className="py-12">
                <h1 className="text-4xl font-heading font-bold text-primary mb-8">Checkout</h1>

                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Contact Information */}
                            <div className="bg-white p-6 rounded-2xl shadow-soft">
                                <h2 className="text-2xl font-heading font-semibold text-primary mb-6">
                                    Contact Information
                                </h2>
                                <div>
                                    <label className="block text-sm font-medium text-primary mb-2">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="input-field"
                                    />
                                </div>
                            </div>

                            {/* Shipping Address */}
                            <div className="bg-white p-6 rounded-2xl shadow-soft">
                                <h2 className="text-2xl font-heading font-semibold text-primary mb-6">
                                    Shipping Address
                                </h2>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-primary mb-2">
                                            First Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            required
                                            className="input-field"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-primary mb-2">
                                            Last Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            required
                                            className="input-field"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-primary mb-2">
                                            Address *
                                        </label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            required
                                            className="input-field"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-primary mb-2">
                                            City *
                                        </label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            required
                                            className="input-field"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-primary mb-2">
                                            State *
                                        </label>
                                        <input
                                            type="text"
                                            name="state"
                                            value={formData.state}
                                            onChange={handleChange}
                                            required
                                            className="input-field"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-primary mb-2">
                                            ZIP Code *
                                        </label>
                                        <input
                                            type="text"
                                            name="zipCode"
                                            value={formData.zipCode}
                                            onChange={handleChange}
                                            required
                                            className="input-field"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-primary mb-2">
                                            Phone *
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                            className="input-field"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Payment (Demo) */}
                            <div className="bg-white p-6 rounded-2xl shadow-soft">
                                <h2 className="text-2xl font-heading font-semibold text-primary mb-6">
                                    Payment Method
                                </h2>
                                <p className="text-neutral-gray mb-4">
                                    This is a demo checkout. No actual payment will be processed.
                                </p>
                                <div className="flex gap-4">
                                    <div className="w-12 h-8 bg-neutral-beige rounded flex items-center justify-center text-xs">
                                        VISA
                                    </div>
                                    <div className="w-12 h-8 bg-neutral-beige rounded flex items-center justify-center text-xs">
                                        MC
                                    </div>
                                    <div className="w-12 h-8 bg-neutral-beige rounded flex items-center justify-center text-xs">
                                        AMEX
                                    </div>
                                </div>
                            </div>

                            <Button type="submit" size="lg" className="w-full">
                                Place Order (Demo)
                            </Button>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-2xl shadow-soft sticky top-24">
                            <h2 className="text-2xl font-heading font-bold text-primary mb-6">
                                Order Summary
                            </h2>

                            <div className="space-y-4 mb-6">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex gap-3">
                                        <div className="w-16 h-16 bg-neutral-beige rounded-xl overflow-hidden shrink-0">
                                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-primary text-sm line-clamp-1">
                                                {item.title}
                                            </p>
                                            <p className="text-sm text-neutral-gray font-medium">
                                                Qty: {item.quantity}
                                            </p>
                                        </div>
                                        <p className="font-bold text-primary text-sm">
                                            {formatPrice(item.price * item.quantity)}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* Coupon Input */}
                            <div className="mb-6 pt-6 border-t border-neutral-beige/50">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Promo Code"
                                        className="flex-1 px-3 py-2 text-sm border border-neutral-beige rounded-xl focus:outline-none focus:ring-1 focus:ring-primary uppercase tracking-widest font-bold"
                                        value={couponInput}
                                        onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                                    />
                                    <button
                                        onClick={handleApplyCoupon}
                                        className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl hover:bg-primary-dark transition-colors"
                                    >
                                        Apply
                                    </button>
                                </div>
                                {couponError && <p className="text-[10px] text-red-500 font-bold mt-2 ml-1">{couponError}</p>}
                                {appliedDiscount && (
                                    <div className="mt-2 flex items-center justify-between bg-green-50 px-3 py-2 rounded-xl border border-green-100">
                                        <span className="text-[10px] font-bold text-green-700 uppercase tracking-widest">
                                            Applied: {appliedDiscount.code}
                                        </span>
                                        <button onClick={() => setAppliedDiscount(null)} className="text-green-700 hover:text-green-900">✕</button>
                                    </div>
                                )}
                            </div>

                            <div className="border-t border-neutral-beige pt-4 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-neutral-gray">Subtotal</span>
                                    <span className="font-medium">{formatPrice(total)}</span>
                                </div>
                                {discountAmount > 0 && (
                                    <div className="flex justify-between text-sm text-green-600 font-bold">
                                        <span>Discount ({appliedDiscount.code})</span>
                                        <span>-{formatPrice(discountAmount)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-sm">
                                    <span className="text-neutral-gray">Shipping</span>
                                    <span className="font-medium">{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-neutral-gray">Tax</span>
                                    <span className="font-medium">{formatPrice(tax)}</span>
                                </div>
                                <div className="flex justify-between text-xl font-heading font-bold pt-4 border-t border-neutral-beige mt-4">
                                    <span className="text-primary">Total</span>
                                    <span className="text-primary">{formatPrice(grandTotal)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}
