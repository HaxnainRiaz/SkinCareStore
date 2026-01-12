'use client';

import { useState, useEffect } from 'react';
import { Container, Button, Input } from '@/components/ui';
import { useStoreAuth } from '@/context/StoreAuthContext';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

export default function ContactPage() {
    const { user } = useStoreAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);

    // Prefill user data
    useEffect(() => {
        if (user) {
            setFormData(prev => ({ ...prev, name: user.name, email: user.email }));
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus('');

        try {
            const token = localStorage.getItem('token');
            const headers = { 'Content-Type': 'application/json' };
            if (token) headers['Authorization'] = `Bearer ${token}`;

            const res = await fetch(`${API_URL}/support-tickets`, {
                method: 'POST',
                headers,
                body: JSON.stringify(formData)
            });
            const data = await res.json();

            if (data.success) {
                setStatus('success');
                setFormData({ name: user?.name || '', email: user?.email || '', subject: '', message: '' });
                // Reset success message after 5 seconds
                setTimeout(() => setStatus(''), 5000);
            } else {
                setStatus('error');
            }
        } catch (err) {
            setStatus('error');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen bg-[#FDFCFB]">
            <div className="bg-[#0a4019] text-white py-16">
                <Container>
                    <h1 className="text-4xl text-white md:text-5xl font-heading font-bold mb-4">Contact Us</h1>
                    <p className="text-lg text-white/80">We'd love to hear from you</p>
                </Container>
            </div>

            <Container className="py-16">
                <div className="grid lg:grid-cols-2 gap-12">
                    <div>
                        <h2 className="text-3xl font-heading font-bold text-[#0a4019] mb-6">Get in Touch</h2>
                        <p className="text-lg text-[#6B6B6B] mb-8">
                            Have a question about our products or need skincare advice? Our team is here to help.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4 text-xs md:text-sm">
                                <div className="w-12 h-12 bg-[#0a4019]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg className="w-6 h-6 text-[#0a4019]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-[#0a4019] mb-1">Email</h3>
                                    <p className="text-[#6B6B6B]">riazmaria458@gmail.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 text-xs md:text-sm">
                                <div className="w-12 h-12 bg-[#0a4019]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg className="w-6 h-6 text-[#0a4019]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-[#0a4019] mb-1">WhatsApp</h3>
                                    <p className="text-[#6B6B6B]">03174120567</p>
                                    <p className="text-xs text-[#6B6B6B] italic">Available 9am-6pm</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 text-xs md:text-sm">
                                <div className="w-12 h-12 bg-[#0a4019]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg className="w-6 h-6 text-[#0a4019]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-[#0a4019] mb-1">Location</h3>
                                    <p className="text-[#6B6B6B] italic">
                                        Crafted with care and nature's finest ingredients.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-[0_4px_20px_rgba(11,47,38,0.08)]">
                        <h2 className="text-2xl font-heading font-bold text-[#0a4019] mb-6">Send us a Message</h2>

                        {status === 'success' && (
                            <div className="mb-6 p-4 bg-green-50 text-green-800 rounded-lg border border-green-100 flex items-center gap-2 animate-fadeIn">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                <span>Message sent! We'll track this in your account support tickets.</span>
                            </div>
                        )}

                        {status === 'error' && (
                            <div className="mb-6 p-4 bg-red-50 text-red-800 rounded-lg border border-red-100 flex items-center gap-2 animate-fadeIn">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                <span>Failed to send message. Please try again.</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <Input
                                label="Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="Your full name"
                            />

                            <Input
                                label="Email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="you@example.com"
                            />

                            <Input
                                label="Subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                placeholder="How can we help?"
                            />

                            <div>
                                <label className="block text-xs font-bold text-[#0a4019] mb-2 uppercase tracking-widest ml-1">
                                    Message *
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    placeholder="Tell us more about your inquiry..."
                                    className="w-full px-6 py-4 bg-white border border-[#F5F3F0] rounded-2xl text-sm font-medium text-[#0a4019] placeholder-[#B8A68A] focus:outline-none focus:ring-2 focus:ring-[#d3d3d3]/30 focus:border-[#d3d3d3] transition-all duration-300 shadow-sm hover:shadow-md resize-none"
                                />
                            </div>

                            <Button type="submit" className="w-full h-14 rounded-xl text-sm font-bold uppercase tracking-widest shadow-xl shadow-[#0a4019]/10 transition-all hover:scale-[1.01] active:scale-[0.99]" disabled={loading}>
                                {loading ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        <span>Dispatching...</span>
                                    </div>
                                ) : 'Send Message'}
                            </Button>
                        </form>
                    </div>
                </div>
            </Container>
        </div>
    );
}
