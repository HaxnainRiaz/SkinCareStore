'use client';

import { useState } from 'react';
import { useStoreAuth } from '@/context/StoreAuthContext';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { Mail, Lock, ArrowRight } from 'lucide-react';

export default function StoreLoginPage() {
    const [email, setEmail] = useState('elena@example.com');
    const [password, setPassword] = useState('password123');
    const [error, setError] = useState('');
    const { login } = useStoreAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        const result = login(email, password);
        if (!result.success) {
            setError(result.message);
        }
    };

    return (
        <div className="bg-neutral-beige/30 min-h-[80vh] flex items-center">
            <Container className="max-w-md py-12">
                <div className="bg-white p-10 rounded-[2rem] shadow-soft border border-neutral-beige relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-primary/20" />

                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-heading font-bold text-primary mb-2">Welcome Back</h1>
                        <p className="text-sm text-neutral-gray">Sign in to your Luminelle account</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-xs font-bold text-center">
                                {error}
                            </div>
                        )}

                        <div>
                            <label className="block text-xs font-bold text-primary uppercase tracking-widest mb-2 ml-1">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-300" size={18} />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-neutral-50 border border-neutral-beige rounded-2xl focus:ring-1 focus:ring-primary focus:outline-none transition-all placeholder:text-neutral-300"
                                    placeholder="elena@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-primary uppercase tracking-widest mb-2 ml-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-300" size={18} />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-neutral-50 border border-neutral-beige rounded-2xl focus:ring-1 focus:ring-primary focus:outline-none transition-all placeholder:text-neutral-300"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button type="button" className="text-xs text-secondary-dark font-medium hover:underline">Forgot password?</button>
                        </div>

                        <Button type="submit" className="w-full rounded-2xl py-6 text-base font-bold shadow-lg shadow-primary/10">
                            Sign In
                        </Button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-neutral-beige text-center">
                        <p className="text-sm text-neutral-gray mb-4">Don't have an account?</p>
                        <Link href="/account/register">
                            <button className="flex items-center gap-2 mx-auto text-primary font-bold hover:gap-3 transition-all">
                                Create Account <ArrowRight size={16} />
                            </button>
                        </Link>
                    </div>
                </div>
            </Container>
        </div>
    );
}
