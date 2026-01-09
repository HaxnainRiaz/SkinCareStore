'use client';

import { useStoreAuth } from '@/context/StoreAuthContext';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { ShoppingBag, Star, Heart, Settings, LogOut, Package, CreditCard, ChevronRight, MapPin, Trash2, Edit3, Save, X, Plus, LifeBuoy, Send, MessageSquare, ShieldCheck, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { formatPrice } from '@/lib/utils';
import { useCore } from '@/context/CoreContext';
import ProductCard from '@/components/commerce/ProductCard';

export default function AccountPage() {
    const { user, loading, logout, getOrders, updateProfile, addAddress, deleteAddress } = useStoreAuth();
    const { products } = useCore();
    const [orders, setOrders] = useState([]);
    const [activeTab, setActiveTab] = useState('Dashboard');
    const [ordersLoading, setOrdersLoading] = useState(true);
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [profileForm, setProfileForm] = useState({ name: '', avatar: '' });
    const [addressForm, setAddressForm] = useState({ show: false, fullName: '', street: '', city: '', state: '', postalCode: '', country: 'USA', isDefault: false });
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/account/login');
        }
        if (user) {
            setProfileForm({ name: user.name, avatar: user.avatar || '' });
        }
    }, [user, loading, router]);

    useEffect(() => {
        const fetchOrders = async () => {
            if (user) {
                const data = await getOrders();
                setOrders(data || []);
                setOrdersLoading(false);
            }
        };
        fetchOrders();
    }, [user, getOrders]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-cream">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
    );
    if (!user) return null;

    const stats = [
        { label: 'Total Orders', value: orders.length, icon: ShoppingBag },
        { label: 'Reward Points', value: user.points || 0, icon: Star },
        { label: 'Wishlist Items', value: user.wishlist?.length || 0, icon: Heart },
    ];

    const wishlistProducts = products.filter(p => user.wishlist?.includes(p._id));

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        const success = await updateProfile(profileForm);
        if (success) setIsEditingProfile(false);
    };

    const handleAddAddress = async (e) => {
        e.preventDefault();
        const success = await addAddress(addressForm);
        if (success) setAddressForm({ ...addressForm, show: false });
    };

    return (
        <div className="bg-neutral-beige/20 min-h-screen py-12">
            <Container>
                {/* Header Card */}
                <div className="bg-white rounded-[2.5rem] p-8 shadow-soft border border-neutral-beige mb-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-secondary/10 transition-colors" />

                    <div className="flex flex-col md:flex-row items-center gap-8 relative">
                        <div className="relative">
                            <div className="w-28 h-28 rounded-[2rem] bg-neutral-beige overflow-hidden border-4 border-white shadow-large transition-transform hover:scale-105">
                                <img
                                    src={user.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
                                    alt={user.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        <div className="flex-1 text-center md:text-left">
                            <h1 className="text-4xl font-heading font-bold text-primary mb-2 italic">{user.name}</h1>
                            <div className="flex flex-wrap justify-center md:justify-start gap-3 items-center">
                                <span className="bg-primary text-secondary text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full">
                                    {user.tier || 'Bronze'} Member
                                </span>
                                <div className="w-1 h-1 bg-neutral-beige rounded-full" />
                                <span className="text-neutral-gray text-sm font-medium">{user.email}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Button variant="outline" size="sm" onClick={logout} className="rounded-2xl border-neutral-beige hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all font-bold text-xs uppercase tracking-widest gap-2">
                                <LogOut size={16} /> Sign Out
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Sidebar Nav */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white rounded-[2rem] p-3 shadow-soft border border-neutral-beige">
                            <nav className="space-y-1">
                                {[
                                    { id: 'Dashboard', icon: Package },
                                    { id: 'Orders', icon: ShoppingBag },
                                    { id: 'Addresses', icon: MapPin },
                                    { id: 'Wishlist', icon: Heart },
                                    { id: 'Support', icon: LifeBuoy },
                                    { id: 'Settings', icon: Settings },
                                ].map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveTab(item.id)}
                                        className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl transition-all group ${activeTab === item.id ? 'bg-primary text-secondary shadow-xl shadow-primary/20 font-bold' : 'text-neutral-gray hover:bg-neutral-beige/50'}`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <item.icon size={18} className={activeTab === item.id ? 'text-secondary' : 'text-neutral-300 group-hover:text-primary transition-colors'} />
                                            <span className="text-sm tracking-wide">{item.id}</span>
                                        </div>
                                        {activeTab !== item.id && <ChevronRight size={14} className="text-neutral-200" />}
                                    </button>
                                ))}
                            </nav>
                        </div>

                        {/* Rewards Card */}
                        <div className="bg-primary p-6 rounded-[2rem] text-secondary relative overflow-hidden shadow-large">
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-4">
                                    <Star size={16} fill="currentColor" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">Luminelle Rewards</span>
                                </div>
                                <h4 className="text-2xl font-heading font-bold mb-1 italic">{user.points || 0} Points</h4>
                                <p className="text-[10px] text-secondary/70 mb-4 font-medium uppercase tracking-wider">Current Tier: {user.tier || 'Bronze'}</p>
                                <Button size="sm" className="w-full bg-secondary text-primary hover:bg-white border-0 text-[10px] uppercase font-bold tracking-widest rounded-xl py-4">Explore Benefits</Button>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3 space-y-8 animate-fadeIn">

                        {activeTab === 'Dashboard' && (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {stats.map((stat) => (
                                        <div key={stat.label} className="bg-white p-7 rounded-[2rem] shadow-soft border border-neutral-beige hover:shadow-medium transition-all group pointer-events-none">
                                            <div className="p-3 bg-secondary/10 text-primary rounded-2xl inline-block mb-4 group-hover:scale-110 transition-transform">
                                                <stat.icon size={22} />
                                            </div>
                                            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1 font-body">{stat.label}</p>
                                            <p className="text-2xl font-bold text-primary font-heading italic">{stat.value}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="bg-white rounded-[2.5rem] shadow-soft border border-neutral-beige overflow-hidden">
                                    <div className="p-8 border-b border-neutral-beige flex justify-between items-center bg-neutral-cream/10">
                                        <h3 className="font-heading font-bold text-2xl text-primary italic">Recent Activity</h3>
                                        <button onClick={() => setActiveTab('Orders')} className="text-[10px] font-bold text-primary hover:text-secondary-dark transition-colors uppercase tracking-widest border border-neutral-beige px-6 py-2.5 rounded-full">All Orders</button>
                                    </div>
                                    <div className="overflow-x-auto">
                                        {!ordersLoading && orders.length > 0 ? (
                                            <table className="w-full text-left">
                                                <thead className="bg-neutral-beige/10 text-[10px] uppercase text-neutral-400 tracking-widest font-bold">
                                                    <tr>
                                                        <th className="p-6 pl-8">Order ID</th>
                                                        <th className="p-6">Date</th>
                                                        <th className="p-6">Status</th>
                                                        <th className="p-6">Total</th>
                                                        <th className="p-6 text-right pr-8">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-neutral-beige">
                                                    {orders.slice(0, 3).map((order) => (
                                                        <tr key={order._id} className="text-sm">
                                                            <td className="p-6 pl-8 font-mono font-bold text-primary text-[11px]">#{order._id.substring(18).toUpperCase()}</td>
                                                            <td className="p-6 text-neutral-gray">{new Date(order.createdAt).toLocaleDateString()}</td>
                                                            <td className="p-6">
                                                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm border ${order.orderStatus === 'delivered' ? 'bg-green-50 text-green-700 border-green-100' :
                                                                    order.orderStatus === 'cancelled' ? 'bg-red-50 text-red-700 border-red-100' :
                                                                        order.orderStatus === 'shipped' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                                                            'bg-secondary/20 text-primary border-secondary/30'
                                                                    }`}>
                                                                    {order.orderStatus}
                                                                </span>
                                                            </td>
                                                            <td className="p-6 font-bold text-primary font-heading italic text-base">{formatPrice(order.totalAmount)}</td>
                                                            <td className="p-6 text-right pr-8"><button className="text-[10px] font-bold text-secondary-dark hover:text-primary transition-all uppercase tracking-widest border-b border-secondary-dark/30 pb-0.5">Track Live</button></td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        ) : (
                                            <div className="p-16 text-center text-neutral-gray text-sm italic">Nothing but stars here yet... Start your journey by exploring our shop!</div>
                                        )}
                                    </div>
                                </div>
                            </>
                        )}

                        {activeTab === 'Orders' && (
                            <div className="bg-white rounded-[2.5rem] shadow-soft border border-neutral-beige overflow-hidden">
                                <div className="p-8 border-b border-neutral-beige"><h3 className="font-heading font-bold text-2xl text-primary italic">Manifest of Purchases</h3></div>
                                <div className="p-8 space-y-6">
                                    {orders.length === 0 ? (
                                        <div className="text-center py-12"><p className="text-neutral-gray italic">Your order history is currently a blank page.</p></div>
                                    ) : (
                                        orders.map(order => (
                                            <div key={order._id} className="border border-neutral-beige rounded-3xl p-6 hover:shadow-medium transition-all group relative overflow-hidden">
                                                <div className="flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
                                                    <div className="flex items-center gap-6 flex-1">
                                                        <div className="w-16 h-16 bg-neutral-beige rounded-2xl flex items-center justify-center shrink-0 shadow-inner"><Package className="text-primary" size={24} /></div>
                                                        <div>
                                                            <div className="flex items-center gap-3 mb-1">
                                                                <h4 className="font-bold text-primary font-heading italic text-lg hover:text-secondary-dark transition-colors cursor-pointer">Order #{order._id.substring(18).toUpperCase()}</h4>
                                                                <div className={`w-2 h-2 rounded-full animate-pulse ${order.orderStatus === 'delivered' ? 'bg-green-500' :
                                                                    order.orderStatus === 'cancelled' ? 'bg-red-500' :
                                                                        'bg-secondary'
                                                                    }`} />
                                                            </div>
                                                            <p className="text-xs text-neutral-gray font-medium">{new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-12">
                                                        <div className="text-right">
                                                            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2 font-body">Current Milestone</p>
                                                            <span className={`px-5 py-2 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] shadow-lg ${order.orderStatus === 'delivered' ? 'bg-green-600 text-white' :
                                                                order.orderStatus === 'cancelled' ? 'bg-red-600 text-white' :
                                                                    order.orderStatus === 'shipped' ? 'bg-blue-600 text-white' :
                                                                        'bg-secondary text-primary'
                                                                }`}>
                                                                {order.orderStatus}
                                                            </span>
                                                        </div>
                                                        <div className="text-right border-l border-neutral-beige pl-12">
                                                            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2 font-body">Total Investment</p>
                                                            <span className="text-2xl font-bold text-primary font-heading italic">{formatPrice(order.totalAmount)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === 'Addresses' && (
                            <div className="bg-white rounded-[2.5rem] shadow-soft border border-neutral-beige overflow-hidden">
                                <div className="p-8 border-b border-neutral-beige flex justify-between items-center">
                                    <h3 className="font-heading font-bold text-2xl text-primary italic">Logistic Destinations</h3>
                                    <Button size="sm" onClick={() => setAddressForm({ ...addressForm, show: !addressForm.show })} className="rounded-2xl text-[10px] uppercase font-bold tracking-widest px-6 shadow-large shadow-primary/10">
                                        {addressForm.show ? 'Discard' : 'New Portal'}
                                    </Button>
                                </div>
                                <div className="p-8">
                                    {addressForm.show && (
                                        <form onSubmit={handleAddAddress} className="mb-12 bg-neutral-cream/30 p-8 rounded-[2rem] border border-neutral-beige animate-fadeIn">
                                            <div className="grid md:grid-cols-2 gap-6 mb-6">
                                                <div>
                                                    <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2 ml-1">Full Identity</label>
                                                    <input type="text" required value={addressForm.fullName} onChange={e => setAddressForm({ ...addressForm, fullName: e.target.value })} className="w-full px-5 py-4 rounded-2xl border border-neutral-beige focus:ring-1 focus:ring-primary outline-none transition-all text-sm" placeholder="Elena Rossi" />
                                                </div>
                                                <div>
                                                    <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2 ml-1">Street Avenue</label>
                                                    <input type="text" required value={addressForm.street} onChange={e => setAddressForm({ ...addressForm, street: e.target.value })} className="w-full px-5 py-4 rounded-2xl border border-neutral-beige text-sm" placeholder="123 Luxury Lane" />
                                                </div>
                                                <div>
                                                    <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2 ml-1">Municipality</label>
                                                    <input type="text" required value={addressForm.city} onChange={e => setAddressForm({ ...addressForm, city: e.target.value })} className="w-full px-5 py-4 rounded-2xl border border-neutral-beige text-sm" placeholder="Milan" />
                                                </div>
                                                <div>
                                                    <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2 ml-1">Postal Code</label>
                                                    <input type="text" required value={addressForm.postalCode} onChange={e => setAddressForm({ ...addressForm, postalCode: e.target.value })} className="w-full px-5 py-4 rounded-2xl border border-neutral-beige text-sm" placeholder="20121" />
                                                </div>
                                            </div>
                                            <Button type="submit" className="w-full py-4 rounded-2xl shadow-lg border-0 font-bold uppercase tracking-widest text-xs">Establish Origin</Button>
                                        </form>
                                    )}
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {user.addresses?.map((addr, idx) => (
                                            <div key={idx} className={`p-8 rounded-[2.5rem] border-2 transition-all relative group ${addr.isDefault ? 'border-primary bg-neutral-cream/10' : 'border-neutral-beige hover:border-secondary'}`}>
                                                <div className="flex justify-between items-start mb-6">
                                                    <div className="p-3 bg-secondary/20 text-primary rounded-2xl shadow-inner"><MapPin size={22} /></div>
                                                    <button onClick={() => deleteAddress(addr._id)} className="text-neutral-200 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-xl"><Trash2 size={16} /></button>
                                                </div>
                                                <h4 className="font-bold text-primary mb-2 text-xl font-heading italic">{addr.fullName}</h4>
                                                <p className="text-sm text-neutral-gray font-medium leading-relaxed italic">{addr.street}<br />{addr.city}, {addr.state} {addr.postalCode}<br />{addr.country}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'Wishlist' && (
                            <div className="bg-white rounded-[2.5rem] shadow-soft border border-neutral-beige overflow-hidden">
                                <div className="p-8 border-b border-neutral-beige flex items-center justify-between">
                                    <h3 className="font-heading font-bold text-2xl text-primary italic">Curated Desires</h3>
                                    <Link href="/shop"><Button size="sm" variant="outline" className="rounded-xl text-[10px] uppercase font-bold tracking-widest px-8">Expand Collection</Button></Link>
                                </div>
                                <div className="p-8">
                                    {(wishlistProducts.length === 0) ? (
                                        <div className="text-center py-24 italic text-neutral-gray">Your gallery of desires is currently empty.</div>
                                    ) : (
                                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                            {wishlistProducts.map(product => (
                                                <div key={product._id} className="scale-95 hover:scale-100 transition-transform duration-500">
                                                    <ProductCard product={product} />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === 'Support' && (
                            <div className="bg-white rounded-[2.5rem] shadow-soft border border-neutral-beige overflow-hidden">
                                <div className="p-8 border-b border-neutral-beige flex items-center justify-between">
                                    <h3 className="font-heading font-bold text-2xl text-primary italic">Support Concierge</h3>
                                    <Link href="/contact"><Button size="sm" variant="outline" className="rounded-xl text-[10px] uppercase font-bold tracking-widest px-8">New Inquiry</Button></Link>
                                </div>
                                <div className="p-8 space-y-6">
                                    <SupportTicketsSection />
                                </div>
                            </div>
                        )}

                        {activeTab === 'Settings' && (
                            <div className="bg-white rounded-[2.5rem] shadow-soft border border-neutral-beige overflow-hidden">
                                <div className="p-8 border-b border-neutral-beige"><h3 className="font-heading font-bold text-2xl text-primary italic">Profile Architecture</h3></div>
                                <div className="p-8 max-w-2xl">
                                    <form onSubmit={handleUpdateProfile} className="space-y-8">
                                        <div className="flex flex-col md:flex-row gap-12 items-center mb-12">
                                            <div className="w-32 h-32 rounded-[2.5rem] bg-neutral-beige overflow-hidden border-4 border-white shadow-xl relative group">
                                                <img src={profileForm.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} className="w-full h-full object-cover" />
                                                <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                                                    <Edit3 className="text-secondary" size={24} />
                                                </div>
                                            </div>
                                            <div className="flex-1 space-y-4">
                                                <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em] mb-2 ml-1">Avatar Signature URL</label>
                                                <input type="text" value={profileForm.avatar} onChange={e => setProfileForm({ ...profileForm, avatar: e.target.value })} className="w-full px-6 py-4 rounded-2xl border border-neutral-beige text-[11px] font-mono" placeholder="https://api.dicebear.com/..." />
                                            </div>
                                        </div>
                                        <div className="space-y-6">
                                            <div>
                                                <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em] mb-2 ml-1">Identity Display</label>
                                                <input type="text" required value={profileForm.name} onChange={e => setProfileForm({ ...profileForm, name: e.target.value })} className="w-full px-6 py-4 rounded-2xl border border-neutral-beige text-base font-bold text-primary font-heading italic" />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em] mb-2 ml-1">Email Coordinates</label>
                                                <input type="email" disabled value={user.email} className="w-full px-6 py-4 rounded-2xl border border-neutral-beige bg-neutral-50 text-neutral-400 cursor-not-allowed text-sm" />
                                                <p className="text-[9px] text-neutral-300 mt-2 ml-1 italic font-medium">To maintain security, email changes require authentication verification.</p>
                                            </div>
                                        </div>
                                        <Button type="submit" className="w-full py-5 rounded-3xl shadow-xl border-0 font-bold uppercase tracking-[0.3em] text-[10px]">Synchronize Profile</Button>
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </Container>
        </div>
    );
}

function SupportTicketsSection() {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [reply, setReply] = useState("");
    const [sending, setSending] = useState(false);
    const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

    const fetchTickets = async () => {
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`${API_URL}/support-tickets/my-tickets`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.success) setTickets(data.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTickets();
    }, []);

    const handleReply = async (e) => {
        e.preventDefault();
        if (!reply.trim()) return;
        setSending(true);
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`${API_URL}/support-tickets/${selectedTicket._id}/reply`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ message: reply })
            });
            const data = await res.json();
            if (data.success) {
                setSelectedTicket(data.data);
                setReply("");
                fetchTickets();
            }
        } catch (err) {
            console.error(err);
        } finally {
            setSending(false);
        }
    };

    if (loading) return <div className="text-center py-10 italic">Loading transmissions...</div>;

    if (selectedTicket) {
        return (
            <div className="space-y-6 animate-fadeIn">
                <button onClick={() => setSelectedTicket(null)} className="text-[10px] font-bold text-neutral-400 hover:text-primary uppercase tracking-widest flex items-center gap-2 mb-4">
                    ← Return to Overview
                </button>
                <div className="bg-neutral-beige/10 p-6 rounded-3xl border border-neutral-beige">
                    <h4 className="font-heading font-bold text-xl text-primary italic mb-1">{selectedTicket.subject}</h4>
                    <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">Ticket #{selectedTicket._id.substring(18).toUpperCase()}</p>
                </div>

                <div className="space-y-6 max-h-[400px] overflow-y-auto p-4 custom-scrollbar">
                    <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-xl bg-secondary/30 flex items-center justify-center shrink-0">
                            <User size={18} className="text-primary" />
                        </div>
                        <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-neutral-100 shadow-sm text-sm italic text-primary">
                            {selectedTicket.message}
                        </div>
                    </div>

                    {selectedTicket.replies?.map((r, i) => (
                        <div key={i} className={`flex gap-4 ${r.sender === 'admin' ? 'flex-row-reverse' : ''}`}>
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${r.sender === 'admin' ? 'bg-primary text-secondary' : 'bg-secondary/30 text-primary'}`}>
                                {r.sender === 'admin' ? <ShieldCheck size={18} /> : <User size={18} />}
                            </div>
                            <div className={`p-4 rounded-2xl border shadow-sm text-sm italic ${r.sender === 'admin' ? 'bg-primary text-secondary rounded-tr-none' : 'bg-white text-primary rounded-tl-none'}`}>
                                {r.message}
                            </div>
                        </div>
                    ))}
                </div>

                {selectedTicket.status !== 'resolved' ? (
                    <form onSubmit={handleReply} className="flex gap-3">
                        <input
                            value={reply}
                            onChange={e => setReply(e.target.value)}
                            placeholder="Type your message..."
                            className="flex-1 bg-neutral-50 border border-neutral-beige rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                        <Button type="submit" disabled={sending} className="rounded-2xl px-6">
                            {sending ? <div className="w-4 h-4 border-2 border-secondary/30 border-t-secondary rounded-full animate-spin" /> : <Send size={18} />}
                        </Button>
                    </form>
                ) : (
                    <div className="text-center p-6 bg-green-50 text-green-700 rounded-2xl text-xs font-bold uppercase tracking-widest border border-green-100">
                        This inquiry has been resolved.
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {tickets.length === 0 ? (
                <div className="text-center py-20 bg-neutral-beige/5 rounded-3xl border border-dashed border-neutral-beige">
                    <p className="text-neutral-gray italic text-sm">No active support transmissions.</p>
                </div>
            ) : (
                tickets.map(t => (
                    <div
                        key={t._id}
                        onClick={() => setSelectedTicket(t)}
                        className="p-6 border border-neutral-beige rounded-3xl hover:border-secondary transition-all cursor-pointer group flex items-center justify-between"
                    >
                        <div className="flex items-center gap-6">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${t.status === 'open' ? 'bg-secondary/20 text-primary' : t.status === 'in-progress' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'}`}>
                                <MessageSquare size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-primary italic mb-0.5">{t.subject}</h4>
                                <div className="flex items-center gap-3">
                                    <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest">#{t._id.substring(18).toUpperCase()}</span>
                                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-widest ${t.status === 'open' ? 'bg-yellow-50 text-yellow-700' : t.status === 'in-progress' ? 'bg-blue-50 text-blue-700' : 'bg-green-50 text-green-700'}`}>
                                        {t.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <ChevronRight size={16} className="text-neutral-200 group-hover:text-primary transition-colors" />
                    </div>
                ))
            )}
        </div>
    );
}
