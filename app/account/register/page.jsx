'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        alert('This is a demo registration. In production, this would create a new account.');
    };

    return (
        <div className="min-h-screen bg-neutral-cream flex items-center justify-center py-12">
            <Container>
                <div className="max-w-md mx-auto">
                    <div className="bg-white p-8 rounded-2xl shadow-soft">
                        <h1 className="text-3xl font-heading font-bold text-primary mb-2 text-center">
                            Create Account
                        </h1>
                        <p className="text-neutral-gray text-center mb-8">
                            Join Luminelle Organics today
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-medium text-primary mb-2">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                        className="input-field"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="block text-sm font-medium text-primary mb-2">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        required
                                        className="input-field"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="input-field"
                                    placeholder="you@example.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-primary mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="input-field"
                                    placeholder="••••••••"
                                />
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-primary mb-2">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    className="input-field"
                                    placeholder="••••••••"
                                />
                            </div>

                            <div className="text-sm">
                                <label className="flex items-start">
                                    <input type="checkbox" required className="mr-2 mt-1" />
                                    <span className="text-neutral-gray">
                                        I agree to the{' '}
                                        <Link href="/terms" className="text-primary hover:underline">
                                            Terms of Service
                                        </Link>{' '}
                                        and{' '}
                                        <Link href="/privacy" className="text-primary hover:underline">
                                            Privacy Policy
                                        </Link>
                                    </span>
                                </label>
                            </div>

                            <Button type="submit" className="w-full" size="lg">
                                Create Account
                            </Button>
                        </form>

                        <p className="text-center text-neutral-gray mt-6">
                            Already have an account?{' '}
                            <Link href="/account/login" className="text-primary hover:underline font-medium">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </Container>
        </div>
    );
}
