'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export default function LoginPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('This is a demo login. In production, this would authenticate the user.');
    };

    return (
        <div className="min-h-screen bg-neutral-cream flex items-center justify-center py-12">
            <Container>
                <div className="max-w-md mx-auto">
                    <div className="bg-white p-8 rounded-2xl shadow-soft">
                        <h1 className="text-3xl font-heading font-bold text-primary mb-2 text-center">
                            Welcome Back
                        </h1>
                        <p className="text-neutral-gray text-center mb-8">
                            Sign in to your account
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-4">
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

                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center">
                                    <input type="checkbox" className="mr-2" />
                                    <span className="text-neutral-gray">Remember me</span>
                                </label>
                                <a href="#" className="text-primary hover:underline">
                                    Forgot password?
                                </a>
                            </div>

                            <Button type="submit" className="w-full" size="lg">
                                Sign In
                            </Button>
                        </form>

                        <p className="text-center text-neutral-gray mt-6">
                            Don't have an account?{' '}
                            <Link href="/account/register" className="text-primary hover:underline font-medium">
                                Create one
                            </Link>
                        </p>
                    </div>
                </div>
            </Container>
        </div>
    );
}
