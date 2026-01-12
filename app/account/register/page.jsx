'use client';

import { useState } from 'react';
import { useStoreAuth } from '@/context/StoreAuthContext';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Link from 'next/link';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const { register } = useStoreAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        const result = await register(formData.name, formData.email, formData.password);
        if (!result.success) {
            setError(result.message);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="bg-[#F5F3F0]/30 min-h-[80vh] flex items-center">
            <Container className="max-w-[500px] w-full mx-auto">
                <div className="bg-white p-10 rounded-[2rem] shadow-[0_4px_20px_rgba(11,47,38,0.08)] border border-[#F5F3F0] relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-[#0a4019]/20" />

                    <div className="text-center mb-4">
                        <h1 className="text-3xl font-heading font-bold text-[#0a4019] mb-2">Create Account</h1>
                        <p className="text-sm text-[#6B6B6B]">Join the Luminelle family</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {error && (
                            <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-xs font-bold text-center">
                                {error}
                            </div>
                        )}

                        <Input
                            label="Full Name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Jane Doe"
                            icon={User}
                        />

                        <Input
                            label="Email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="jane@example.com"
                            icon={Mail}
                        />

                        <Input
                            label="Password"
                            name="password"
                            type="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            icon={Lock}
                        />

                        <Input
                            label="Confirm Password"
                            name="confirmPassword"
                            type="password"
                            required
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="••••••••"
                            icon={Lock}
                        />

                        <Button type="submit" className="w-full rounded-2xl py-3 text-base font-bold shadow-lg shadow-[#0a4019]/10 mt-2">
                            Create Account
                        </Button>
                    </form>

                    <div className="pt-8 border-t border-[#F5F3F0] text-center">
                        <p className="text-sm text-[#6B6B6B] mb-4">Already have an account?</p>
                        <Link href="/account/login">
                            <button className="flex items-center gap-2 mx-auto text-[#0a4019] font-bold hover:gap-3 transition-all">
                                Sign In Instead <ArrowRight size={16} />
                            </button>
                        </Link>
                    </div>
                </div>
            </Container>
        </div>
    );
}
