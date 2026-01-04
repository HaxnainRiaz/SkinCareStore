'use client';

import { useStoreAuth } from '@/context/StoreAuthContext';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { ShoppingBag, Star, Heart, Settings, LogOut, Package, CreditCard } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default function AccountPage() {
    const { user, loading, logout } = useStoreAuth();

    if (loading) return null;
    if (!user) redirect('/account/login');

    const stats = [
        { label: 'Total Orders', value: '12', icon: ShoppingBag },
        { label: 'Reward Points', value: user.points, icon: Star },
        { label: 'Wishlist Items', value: '5', icon: Heart },
    ];

    const recentOrders = [
        { id: 'ORD-7782', date: 'Dec 22, 2023', status: 'Delivered', total: '$145.00' },
        { id: 'ORD-7691', date: 'Nov 15, 2023', status: 'Delivered', total: '$89.50' },
    ];

    return (
        <div className="bg-neutral-beige/20 min-h-screen py-12">
            <Container>
                {/* Header */}
                <div className="bg-white rounded-3xl p-8 shadow-soft border border-neutral-beige mb-8">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="w-24 h-24 rounded-3xl bg-primary overflow-hidden border-4 border-neutral-cream shadow-lg">
                            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h1 className="text-3xl font-heading font-bold text-primary mb-1">{user.name}</h1>
                            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-2">
                                <span className="bg-secondary/20 text-primary-light text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-secondary/20">
                                    {user.tier} Member
                                </span>
                                <span className="text-neutral-gray text-xs font-medium">{user.email}</span>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <Button variant="outline" size="sm" onClick={logout} className="flex items-center gap-2">
                                <LogOut size={16} /> Logout
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Sidebar Nav */}
                    <div className="lg:col-span-1 space-y-4">
                        <div className="bg-white rounded-2xl p-4 shadow-soft border border-neutral-beige">
                            <nav className="space-y-1">
                                {[
                                    { label: 'Dashboard', icon: Package, active: true },
                                    { label: 'Orders', icon: ShoppingBag },
                                    { label: 'Payments', icon: CreditCard },
                                    { label: 'Settings', icon: Settings },
                                ].map((item) => (
                                    <button
                                        key={item.label}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${item.active ? 'bg-primary text-white font-bold shadow-md' : 'text-neutral-gray hover:bg-neutral-50'}`}
                                    >
                                        <item.icon size={18} />
                                        <span className="text-sm">{item.label}</span>
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3 space-y-8">
                        {/* Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {stats.map((stat) => (
                                <div key={stat.label} className="bg-white p-6 rounded-2xl shadow-soft border border-neutral-beige">
                                    <div className="p-3 bg-secondary/10 text-primary rounded-xl inline-block mb-4">
                                        <stat.icon size={20} />
                                    </div>
                                    <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">{stat.label}</p>
                                    <p className="text-2xl font-bold text-primary">{stat.value}</p>
                                </div>
                            ))}
                        </div>

                        {/* Recent Orders */}
                        <div className="bg-white rounded-2xl shadow-soft border border-neutral-beige overflow-hidden">
                            <div className="p-6 border-b border-neutral-beige flex justify-between items-center">
                                <h3 className="font-heading font-bold text-xl text-primary">Recent Orders</h3>
                                <button className="text-xs font-bold text-secondary-dark hover:underline">View All</button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-neutral-50 text-[10px] uppercase text-neutral-400 tracking-widest font-bold">
                                        <tr>
                                            <th className="p-4">Order ID</th>
                                            <th className="p-4">Date</th>
                                            <th className="p-4">Status</th>
                                            <th className="p-4">Total</th>
                                            <th className="p-4 text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-neutral-beige">
                                        {recentOrders.map((order) => (
                                            <tr key={order.id} className="text-sm">
                                                <td className="p-4 font-bold text-primary">{order.id}</td>
                                                <td className="p-4 text-neutral-gray">{order.date}</td>
                                                <td className="p-4">
                                                    <span className="px-2 py-0.5 bg-green-50 text-green-700 rounded-full text-[10px] font-bold border border-green-100">
                                                        {order.status}
                                                    </span>
                                                </td>
                                                <td className="p-4 font-medium">{order.total}</td>
                                                <td className="p-4 text-right">
                                                    <button className="text-xs font-bold text-secondary-dark hover:underline">Track</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}
