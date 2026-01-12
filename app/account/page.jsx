'use client';

import { useStoreAuth } from '@/context/StoreAuthContext';
import { Container, Button, Input } from '@/components/ui';
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
    const [profileForm, setProfileForm] = useState({ name: '', avatar: '', phone: '', gender: '' });
    const [addressForm, setAddressForm] = useState({ show: false, fullName: '', street: '', city: '', state: '', postalCode: '', country: 'USA', isDefault: false });
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/account/login');
        }
        if (user) {
            setProfileForm({
                name: user.name || '',
                avatar: user.avatar || '',
                phone: user.phone || '',
                gender: user.gender || ''
            });
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
        <div className="min-h-screen flex items-center justify-center bg-[#FDFCFB]">
            <div className="w-12 h-12 border-4 border-[#0a4019] border-t-transparent rounded-full animate-spin" />
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
        <div className="bg-[#F5F3F0]/20 min-h-screen py-3 md:py-6 lg:py-8">
            <Container className='space-y-3 md:space-y-6 lg:space-y-8'>
                {/* Header Card */}
                <div className="bg-white rounded-[2.5rem] p-4 md:p-6 shadow-[0_4px_30px_rgba(11,47,38,0.06)] border border-[#F5F3F0]  relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-[#d3d3d3]/5 rounded-full blur-3xl group-hover:bg-[#d3d3d3]/10 transition-colors pointer-events-none" />

                    <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6 relative">
                        <div className="relative">
                            <div className="w-24 h-24 md:w-32 md:h-32 rounded-[2rem] bg-[#F5F3F0] overflow-hidden border-4 border-white shadow-[0_16px_40px_rgba(11,47,38,0.12)] transition-transform hover:scale-105">
                                <img
                                    src={user.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
                                    alt={user.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        <div className="flex-1 text-center md:text-left space-y-2">
                            <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-[#0a4019] italic">{user.name}</h1>
                            <div className="flex flex-wrap justify-center md:justify-start gap-3 items-center">
                                <span className="bg-[#0a4019] text-[#d3d3d3] text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] px-5 py-2 rounded-full shadow-sm">
                                    {user.tier || 'Bronze'} Member
                                </span>
                                <div className="hidden md:block w-1.5 h-1.5 bg-[#F5F3F0] rounded-full" />
                                <span className="text-[#6B6B6B] text-sm md:text-base font-medium">{user.email}</span>
                            </div>
                        </div>

                        <div className="w-full md:w-auto mt-4 md:mt-0">
                            <Button
                                variant="outline"
                                onClick={logout}
                                className="w-full md:w-auto h-12 md:h-14 px-8 rounded-2xl border-[#F5F3F0] hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all font-bold text-[11px] md:text-xs uppercase tracking-widest gap-2"
                            >
                                <LogOut size={18} /> <span>Sign Out</span>
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-4 gap-3 md:gap-6">
                    {/* Sidebar Nav */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white overflow-hidden rounded-[2rem] p-2 md:p-3 shadow-[0_4px_30px_rgba(11,47,38,0.06)] border border-[#F5F3F0]">
                            <nav className="space-y-2">
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
                                        className={` w-full h-14 md:h-16 flex items-center justify-between px-6 rounded-2xl overflow-hidden transition-all group ${activeTab === item.id ? 'bg-[#0a4019] text-[#d3d3d3] shadow-lg shadow-[#0a4019]/20' : 'text-[#6B6B6B] hover:bg-[#F5F3F0]/50'}`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <item.icon size={20} className={activeTab === item.id ? 'text-[#d3d3d3]' : 'text-neutral-300 group-hover:text-[#0a4019] transition-colors'} />
                                            <span className={`text-sm md:text-base tracking-wide ${activeTab === item.id ? 'font-bold' : 'font-medium'}`}>{item.id}</span>
                                        </div>
                                        {activeTab !== item.id && <ChevronRight size={16} className="text-neutral-200 group-hover:text-[#0a4019] transition-transform group-hover:translate-x-1" />}
                                    </button>
                                ))}
                            </nav>
                        </div>

                        {/* Rewards Card */}
                        <div className="bg-[#0a4019] p-6 rounded-[2rem] text-[#d3d3d3] relative overflow-hidden shadow-[0_20px_50px_rgba(11,47,38,0.12)]">
                            <div className="relative z-10 space-y-6">
                                <div className="flex items-center gap-2 mb-2">
                                    <Star size={18} fill="currentColor" />
                                    <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest">Luminelle Rewards</span>
                                </div>
                                <div>
                                    <h4 className="text-3xl font-heading font-bold italic">{user.points || 0} Points</h4>
                                    <p className="text-[11px] md:text-xs text-[#d3d3d3]/70 font-medium uppercase tracking-wider mt-1">Current Tier: {user.tier || 'Bronze'}</p>
                                </div>
                                <Button className="w-full h-14 bg-[#d3d3d3] text-[#0a4019] hover:bg-white border-0 text-[11px] uppercase font-bold tracking-widest rounded-xl transition-all shadow-lg active:scale-95">
                                    Explore Benefits
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3 space-y-3 md:space-y-6 animate-fadeIn">

                        {activeTab === 'Dashboard' && (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                    {stats.map((stat) => (
                                        <div key={stat.label} className="bg-white p-4 flex flex-col justify-center items-center gap-2 rounded-[2rem] shadow-[0_4px_30px_rgba(11,47,38,0.06)] border border-[#F5F3F0] hover:shadow-[0_12px_40px_rgba(11,47,38,0.08)] transition-all group">
                                            <div className="w-14 h-14 bg-[#d3d3d3]/15 text-[#0a4019] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                                <stat.icon size={26} />
                                            </div>
                                            <p className="text-[10px] md:text-[11px] font-bold text-neutral-400 uppercase tracking-widest mb-2">{stat.label}</p>
                                            <p className="text-xl md:text-2xl font-bold text-[#0a4019] font-heading italic">{stat.value}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="bg-white rounded-[2.5rem] shadow-[0_4px_30px_rgba(11,47,38,0.06)] border border-[#F5F3F0] overflow-hidden">

                                    {/* Header */}
                                    <div className="p-3 md:p-6 border-b border-[#F5F3F0] flex flex-col sm:flex-row justify-between items-center gap-4 bg-[#FDFCFB]/10">
                                        <h3 className="font-heading font-bold text-xl md:text-3xl text-[#0a4019] italic">
                                            Recent Activity
                                        </h3>

                                        <button
                                            onClick={() => setActiveTab('Orders')}
                                            className="h-11 px-6 text-[10px] md:text-[11px] font-bold text-[#0a4019]
        hover:bg-[#0a4019] hover:text-white transition-all uppercase tracking-widest
        border border-[#F5F3F0] rounded-full whitespace-nowrap"
                                        >
                                            View All Orders
                                        </button>
                                    </div>

                                    {/* Scroll Container */}
                                    <div className="relative w-full overflow-x-auto custom-scrollbar-x pb-2">
                                        <div className="min-w-full">

                                            {!ordersLoading && orders.length > 0 ? (
                                                <table className="w-full overflow-x-auto text-left text-sm">
                                                    <thead className="bg-[#F5F3F0]/10 text-[9px] md:text-[11px] uppercase text-neutral-400 tracking-wide font-bold border-b border-[#F5F3F0]">
                                                        <tr>
                                                            <th className="px-2 py-2 md:px-8 whitespace-nowrap">Order ID</th>
                                                            <th className="px-2 py-2 md:px-8 whitespace-nowrap">Date</th>
                                                            <th className="px-2 py-2 md:px-8 whitespace-nowrap">Status</th>
                                                            <th className="px-2 py-2 md:px-8 whitespace-nowrap">Total</th>
                                                            <th className="px-2 py-2 md:px-8 text-right whitespace-nowrap">Action</th>
                                                        </tr>
                                                    </thead>

                                                    <tbody className="divide-y divide-[#F5F3F0]">
                                                        {orders.slice(0, 3).map(order => (
                                                            <tr
                                                                key={order._id}
                                                                className="hover:bg-[#FDFCFB]/50 transition-colors"
                                                            >
                                                                <td className="px-2 py-2 md:px-8 font-mono font-bold text-[#0a4019] text-[10px] md:text-xs whitespace-nowrap">
                                                                    #{order._id.substring(18).toUpperCase()}
                                                                </td>

                                                                <td className="px-2 py-2 md:px-8 text-[#6B6B6B] font-medium whitespace-nowrap">
                                                                    {new Date(order.createdAt).toLocaleDateString()}
                                                                </td>

                                                                <td className="px-2 py-2 md:px-8">
                                                                    <span
                                                                        className={`px-2 py-1.5 rounded-full text-[9px] md:text-[11px]
                      font-bold uppercase tracking-widest border whitespace-nowrap
                      ${order.orderStatus === 'delivered'
                                                                                ? 'bg-green-50 text-green-700 border-green-100'
                                                                                : order.orderStatus === 'cancelled'
                                                                                    ? 'bg-red-50 text-red-700 border-red-100'
                                                                                    : order.orderStatus === 'shipped'
                                                                                        ? 'bg-blue-50 text-blue-700 border-blue-100'
                                                                                        : 'bg-[#d3d3d3]/20 text-[#0a4019] border-[#d3d3d3]/30'
                                                                            }`}
                                                                    >
                                                                        {order.orderStatus}
                                                                    </span>
                                                                </td>

                                                                <td className="px-4 py-4 md:px-8 font-bold text-[#0a4019] italic whitespace-nowrap">
                                                                    {formatPrice(order.totalAmount)}
                                                                </td>

                                                                <td className="px-4 py-4 md:px-8 text-right whitespace-nowrap">
                                                                    <button className="text-[10px] font-bold text-[#B8A68A] hover:text-[#0a4019] transition-all uppercase tracking-widest border-b border-[#B8A68A]/30 hover:border-[#0a4019]">
                                                                        Track
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            ) : (
                                                <div className="p-12 md:p-20 text-center space-y-4">
                                                    <ShoppingBag className="w-14 h-14 mx-auto text-neutral-200" />
                                                    <p className="text-[#6B6B6B] text-base md:text-lg font-medium italic">
                                                        Nothing but stars here yet... Start your journey by exploring our shop!
                                                    </p>
                                                </div>
                                            )}

                                        </div>
                                    </div>
                                </div>

                            </>
                        )}


                        {activeTab === 'Orders' && (
                            <div className="bg-white rounded-[2.5rem] shadow-[0_4px_30px_rgba(11,47,38,0.06)] border border-[#F5F3F0] overflow-hidden">
                                <div className="p-8 md:p-10 border-b border-[#F5F3F0]bg-[#FDFCFB]/10">
                                    <h3 className="font-heading font-bold text-lg md:text-xl text-[#0a4019] italic">Manifest of Purchases</h3>
                                </div>
                                <div className="p-3 md:p-6 space-y-6">
                                    {orders.length === 0 ? (
                                        <div className="text-center py-6">
                                            <Package className="w-16 h-16 mx-auto text-neutral-200 mb-4" />
                                            <p className="text-[#6B6B6B] text-md font-medium italic leading-relaxed">Your order history is currently a blank page.</p>
                                        </div>
                                    ) : (
                                        orders.map(order => (
                                            <div key={order._id} className="border border-[#F5F3F0] rounded-[2rem] p-6 md:p-8 hover:shadow-[0_12px_40px_rgba(11,47,38,0.08)] transition-all bg-[#FDFCFB]/30 relative overflow-hidden group">
                                                <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-8 relative z-10">
                                                    <div className="flex items-center gap-6 flex-1 w-full">
                                                        <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-2xl flex items-center justify-center shrink-0 shadow-sm border border-[#F5F3F0]">
                                                            <Package className="text-[#0a4019]" size={28} />
                                                        </div>
                                                        <div className="space-y-1">
                                                            <div className="flex items-center gap-3">
                                                                <h4 className="font-bold text-[#0a4019] font-heading italic text-md md:text-lg tracking-tight">Order #{order._id.substring(18).toUpperCase()}</h4>
                                                                <div className={`w-2.5 h-2.5 rounded-full animate-pulse ${order.orderStatus === 'delivered' ? 'bg-green-500' : order.orderStatus === 'cancelled' ? 'bg-red-500' : 'bg-[#d3d3d3]'}`} />
                                                            </div>
                                                            <p className="text-xs md:text-sm text-[#6B6B6B] font-medium leading-relaxed uppercase tracking-wider">{new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-wrap items-center gap-3 md:gap-6 w-full xl:w-auto">
                                                        <div className="space-y-2">
                                                            <p className="text-[10px] md:text-[11px] font-bold text-neutral-400 uppercase tracking-widest leading-relaxed">Current Milestone</p>
                                                            <span className={`inline-flex px-6 py-2.5 rounded-full text-[11px] md:text-xs font-bold uppercase tracking-[0.2em] shadow-sm border ${order.orderStatus === 'delivered' ? 'bg-green-600/10 text-green-700 border-green-200' :
                                                                order.orderStatus === 'cancelled' ? 'bg-red-600/10 text-red-700 border-red-200' :
                                                                    order.orderStatus === 'shipped' ? 'bg-blue-600/10 text-blue-700 border-blue-200' :
                                                                        'bg-[#d3d3d3]/20 text-[#0a4019] border-[#d3d3d3]/30'
                                                                }`}>
                                                                {order.orderStatus}
                                                            </span>
                                                        </div>
                                                        <div className="xl:border-l xl:border-[#F5F3F0] xl:pl-12 space-y-1">
                                                            <p className="text-[10px] md:text-[11px] font-bold text-neutral-400 uppercase tracking-widest leading-relaxed">Total Investment</p>
                                                            <span className="text-3xl font-bold text-[#0a4019] font-heading italic">{formatPrice(order.totalAmount)}</span>
                                                        </div>
                                                        <div className="ml-auto xl:ml-0">
                                                            <Button variant="outline" className="h-12 md:h-14 px-8 rounded-2xl border-[#F5F3F0] hover:bg-[#0a4019] hover:text-white transition-all text-[11px] font-bold uppercase tracking-widest">
                                                                Trace
                                                            </Button>
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
                            <div className="bg-white rounded-[2.5rem] shadow-[0_4px_30px_rgba(11,47,38,0.06)] border border-[#F5F3F0] overflow-hidden">
                                <div className="p-8 md:p-10 border-b border-[#F5F3F0] flex flex-col sm:flex-row justify-between items-center bg-[#FDFCFB]/10 gap-6">
                                    <h3 className="font-heading font-bold text-2xl md:text-3xl text-[#0a4019] italic">Logistic Destinations</h3>
                                    <Button size="lg" onClick={() => setAddressForm({ ...addressForm, show: !addressForm.show })} className="w-full sm:w-auto h-12 md:h-14 px-10 rounded-2xl text-[11px] uppercase font-bold tracking-widest shadow-xl shadow-[#0a4019]/10 active:scale-95 transition-all">
                                        {addressForm.show ? 'Refuse Setup' : 'Create New Portal'}
                                    </Button>
                                </div>
                                <div className="p-8 md:p-10">
                                    {addressForm.show && (
                                        <form onSubmit={handleAddAddress} className="mb-12 bg-[#FDFCFB]/50 p-8 md:p-12 rounded-[2.5rem] border border-[#F5F3F0] animate-fadeIn shadow-sm">
                                            <div className="grid md:grid-cols-2 gap-8 mb-10">
                                                <Input
                                                    label="Full Identity"
                                                    required
                                                    value={addressForm.fullName}
                                                    onChange={e => setAddressForm({ ...addressForm, fullName: e.target.value })}
                                                    placeholder="Elena Rossi"
                                                    className="h-14 rounded-2xl"
                                                />
                                                <Input
                                                    label="Street Avenue"
                                                    required
                                                    value={addressForm.street}
                                                    onChange={e => setAddressForm({ ...addressForm, street: e.target.value })}
                                                    placeholder="123 Luxury Lane"
                                                    className="h-14 rounded-2xl"
                                                />
                                                <Input
                                                    label="Municipality"
                                                    required
                                                    value={addressForm.city}
                                                    onChange={e => setAddressForm({ ...addressForm, city: e.target.value })}
                                                    placeholder="Milan"
                                                    className="h-14 rounded-2xl"
                                                />
                                                <Input
                                                    label="Postal Code"
                                                    required
                                                    value={addressForm.postalCode}
                                                    onChange={e => setAddressForm({ ...addressForm, postalCode: e.target.value })}
                                                    placeholder="20121"
                                                    className="h-14 rounded-2xl"
                                                />
                                            </div>
                                            <Button type="submit" className="w-full h-14 md:h-16 rounded-2xl shadow-xl shadow-[#0a4019]/10 font-bold uppercase tracking-widest text-[11px] md:text-xs">Establish Origin</Button>
                                        </form>
                                    )}
                                    <div className="grid sm:grid-cols-2 gap-8">
                                        {user.addresses?.length > 0 ? (
                                            user.addresses.map((addr, idx) => (
                                                <div key={idx} className={`p-8 md:p-10 rounded-[2.5rem] border-2 transition-all relative group flex flex-col justify-between h-full ${addr.isDefault ? 'border-[#0a4019] bg-[#FDFCFB]/10 shadow-lg' : 'border-[#F5F3F0] hover:border-[#d3d3d3] hover:shadow-md'}`}>
                                                    <div>
                                                        <div className="flex justify-between items-start mb-8">
                                                            <div className="w-14 h-14 bg-white text-[#0a4019] rounded-2xl shadow-sm border border-[#F5F3F0] flex items-center justify-center"><MapPin size={24} /></div>
                                                            <button
                                                                onClick={() => deleteAddress(addr._id)}
                                                                className="w-12 h-12 flex items-center justify-center text-neutral-300 hover:text-red-500 transition-all hover:bg-red-50 rounded-2xl group-hover:bg-red-50/50"
                                                                aria-label="Delete address"
                                                            >
                                                                <Trash2 size={20} />
                                                            </button>
                                                        </div>
                                                        <h4 className="font-bold text-[#0a4019] mb-3 text-xl md:text-2xl font-heading italic tracking-tight">{addr.fullName}</h4>
                                                        <p className="text-base md:text-lg text-[#6B6B6B] font-medium leading-relaxed italic opacity-80">
                                                            {addr.street}<br />
                                                            {addr.city}, {addr.state} {addr.postalCode}<br />
                                                            {addr.country}
                                                        </p>
                                                    </div>
                                                    {addr.isDefault && (
                                                        <div className="mt-8">
                                                            <span className="text-[10px] md:text-[11px] font-bold text-[#0a4019] uppercase tracking-[0.2em] bg-[#d3d3d3]/20 px-4 py-1.5 rounded-full">Primary Origin</span>
                                                        </div>
                                                    )}
                                                </div>
                                            ))
                                        ) : (
                                            <div className="col-span-full py-16 text-center bg-[#FDFCFB]/30 rounded-[2.5rem] border-2 border-dashed border-[#F5F3F0] space-y-4">
                                                <MapPin className="w-12 h-12 mx-auto text-neutral-200" />
                                                <p className="text-[#6B6B6B] text-lg font-medium italic">No destinations mapped yet.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'Wishlist' && (
                            <div className="bg-white rounded-[2.5rem] shadow-[0_4px_30px_rgba(11,47,38,0.06)] border border-[#F5F3F0] overflow-hidden">
                                <div className="p-8 md:p-10 border-b border-[#F5F3F0] flex flex-col sm:flex-row items-center justify-between bg-[#FDFCFB]/10 gap-6">
                                    <h3 className="font-heading font-bold text-2xl md:text-3xl text-[#0a4019] italic">Curated Desires</h3>
                                    <Link href="/shop" className="w-full sm:w-auto">
                                        <Button size="lg" variant="outline" className="w-full h-12 md:h-14 px-10 rounded-2xl text-[11px] uppercase font-bold tracking-widest shadow-sm hover:shadow-md transition-all">Expand Collection</Button>
                                    </Link>
                                </div>
                                <div className="p-8 md:p-10">
                                    {(wishlistProducts.length === 0) ? (
                                        <div className="text-center py-20 italic">
                                            <Heart className="w-16 h-16 mx-auto text-neutral-200 mb-4" />
                                            <p className="text-[#6B6B6B] text-lg font-medium leading-relaxed italic">Your gallery of desires is currently empty.</p>
                                        </div>
                                    ) : (
                                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                                            {wishlistProducts.map(product => (
                                                <div key={product._id} className="scale-[0.98] hover:scale-100 transition-all duration-500">
                                                    <ProductCard product={product} />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}


                        {activeTab === 'Support' && (
                            <div className="bg-white rounded-[2.5rem] shadow-[0_4px_30px_rgba(11,47,38,0.06)] border border-[#F5F3F0] overflow-hidden">
                                <div className="p-3 md:p-6 border-b border-[#F5F3F0] flex flex-col sm:flex-row items-center justify-between bg-[#FDFCFB]/10 gap-6">
                                    <h3 className="font-heading font-bold text-xl md:text-2xl text-[#0a4019] italic">Support Concierge</h3>
                                    <Link href="/contact" className="w-full sm:w-auto">
                                        <Button size="lg" variant="outline" className="w-full h-12 md:h-14 px-10 rounded-2xl text-[11px] uppercase font-bold tracking-widest shadow-sm">Initiate Inquiry</Button>
                                    </Link>
                                </div>
                                <div className="p-3 md:p-6 space-y-3 md:space-y-6">
                                    <SupportTicketsSection />
                                </div>
                            </div>
                        )}

                        {activeTab === 'Settings' && (
                            <div className="bg-white rounded-[2.5rem] shadow-[0_4px_30px_rgba(11,47,38,0.06)] border border-[#F5F3F0] overflow-hidden">
                                <div className="p-3 md:p-6 border-b border-[#F5F3F0] bg-[#FDFCFB]/10">
                                    <h3 className="font-heading font-bold text-2xl md:text-3xl text-[#0a4019] italic">Profile Architecture</h3>
                                </div>
                                <div className="p-3 md:p-6 max-w-3xl">
                                    <form onSubmit={handleUpdateProfile} className="space-y-3 md:space-y-6">
                                        <div className="flex flex-col md:flex-row gap-3 md:gap-6 items-center">
                                            <div className="md:shrink-0">
                                                <div className="w-32 h-32 md:w-40 md:h-40 rounded-[3rem] bg-[#F5F3F0] overflow-hidden border-8 border-white shadow-xl relative group">
                                                    <img
                                                        src={profileForm.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
                                                        className="w-full h-full object-cover transition-transform group-hover:scale-110"
                                                        alt="Avatar"
                                                    />
                                                    <div className="absolute inset-0 bg-[#0a4019]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer pointer-events-none">
                                                        <Edit3 className="text-[#d3d3d3]" size={28} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex-1 space-y-4 w-full">
                                                <label className="block text-[10px] md:text-[11px] font-bold text-neutral-400 uppercase tracking-[0.2em] ml-1">Avatar Signature URL</label>
                                                <input
                                                    type="text"
                                                    value={profileForm.avatar}
                                                    onChange={e => setProfileForm({ ...profileForm, avatar: e.target.value })}
                                                    className="w-full h-14 md:h-16 px-6 rounded-2xl border border-[#F5F3F0] bg-white text-[11px] md:text-xs font-mono focus:ring-2 focus:ring-[#d3d3d3]/30 focus:border-[#d3d3d3] outline-none transition-all"
                                                    placeholder="https://api.dicebear.com/..."
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-8">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <Input
                                                    label="Identity Display"
                                                    required
                                                    value={profileForm.name}
                                                    onChange={e => setProfileForm({ ...profileForm, name: e.target.value })}
                                                    className="h-14 md:h-16 font-heading italic text-lg"
                                                />
                                                <Input
                                                    label="Phone Number"
                                                    type="tel"
                                                    value={profileForm.phone}
                                                    onChange={e => setProfileForm({ ...profileForm, phone: e.target.value })}
                                                    placeholder="+1..."
                                                    className="h-14 md:h-16"
                                                />
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <div className="space-y-2">
                                                    <label className="block text-[10px] md:text-[11px] font-bold text-[#0a4019] uppercase tracking-[0.2em] ml-1">Gender Signature</label>
                                                    <select
                                                        value={profileForm.gender}
                                                        onChange={e => setProfileForm({ ...profileForm, gender: e.target.value })}
                                                        className="w-full h-14 md:h-16 px-6 bg-white border border-[#F5F3F0] rounded-2xl text-sm md:text-base font-medium text-[#0a4019] focus:outline-none focus:ring-2 focus:ring-[#d3d3d3]/30 focus:border-[#d3d3d3] transition-all duration-300 shadow-sm appearance-none cursor-pointer"
                                                    >
                                                        <option value="">Select Gender</option>
                                                        <option value="Male">Male</option>
                                                        <option value="Female">Female</option>
                                                        <option value="Other">Other</option>
                                                        <option value="Prefer not to say">Prefer not to say</option>
                                                    </select>
                                                </div>
                                                <div className="space-y-2 opacity-70">
                                                    <label className="block text-[10px] md:text-[11px] font-bold text-neutral-400 uppercase tracking-[0.2em] ml-1">Email (Immutable)</label>
                                                    <div className="w-full h-14 md:h-16 px-6 flex items-center bg-neutral-50/50 border border-[#F5F3F0]/50 rounded-2xl text-sm md:text-base text-neutral-400 font-medium">
                                                        {user.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <Button type="submit" className="w-full h-16 md:h-20 rounded-[2rem] shadow-xl shadow-[#0a4019]/10 font-bold uppercase tracking-[0.3em] text-[11px] md:text-xs">
                                            Synchronize Profile Ritual
                                        </Button>
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

    if (loading) return <div className="text-center py-16 text-lg font-medium italic animate-pulse">Synchronizing transmissions...</div>;

    if (selectedTicket) {
        return (
            <div className="space-y-8 animate-fadeIn">
                <button
                    onClick={() => setSelectedTicket(null)}
                    className="h-12 px-6 text-[11px] md:text-xs font-bold text-neutral-400 hover:text-[#0a4019] uppercase tracking-[0.2em] flex items-center gap-3 transition-colors group"
                >
                    <span className="group-hover:-translate-x-1 transition-transform">←</span> Return to Overview
                </button>

                <div className="bg-[#F5F3F0]/20 p-3 md:p-6 rounded-[1rem] border border-[#F5F3F0] shadow-sm">
                    <h4 className="font-heading font-bold text-2xl md:text-3xl text-[#0a4019] italic tracking-tight break-words">{selectedTicket.subject}</h4>
                    <p className="text-[10px] md:text-[11px] text-neutral-400 font-bold uppercase tracking-[0.3em] break-all">Transmission Ref: #{selectedTicket._id.substring(18).toUpperCase()}</p>
                </div>

                <div className="space-y-8 max-h-[500px] overflow-y-auto p-2 md:p-6 custom-scrollbar">
                    {/* Original Message */}
                    <div className="flex gap-4 md:gap-6 flex-row-reverse items-start">
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[#0a4019] text-white flex items-center justify-center shrink-0 shadow-lg shadow-[#0a4019]/20">
                            <User size={24} />
                        </div>
                        <div className="bg-[#0a4019] text-white p-6 md:p-8 rounded-[2rem] rounded-tr-none shadow-md text-base md:text-lg italic leading-relaxed max-w-[calc(100%-80px)] break-words">
                            {selectedTicket.message}
                        </div>
                    </div>

                    {selectedTicket.replies?.map((r, i) => (
                        <div key={i} className={`flex gap-4 md:gap-6 items-start ${r.sender !== 'admin' ? 'flex-row-reverse' : ''}`}>
                            <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${r.sender !== 'admin' ? 'bg-[#0a4019] text-[#d3d3d3]' : 'bg-white border border-[#F5F3F0] text-[#0a4019]'}`}>
                                {r.sender === 'admin' ? <ShieldCheck size={24} /> : <User size={24} />}
                            </div>
                            <div className={`p-2 md:p-6 rounded-[2rem] border shadow-sm text-base md:text-lg italic leading-relaxed max-w-[calc(100%-80px)] break-words ${r.sender !== 'admin' ? 'bg-[#0a4019] text-white rounded-tr-none border-[#0a4019]' : 'bg-white text-[#0a4019] rounded-tl-none border-[#F5F3F0]'}`}>
                                {r.message}
                            </div>
                        </div>
                    ))}
                </div>

                {selectedTicket.status !== 'resolved' ? (
                    <form onSubmit={handleReply} className="flex gap-4 p-2">
                        <input
                            value={reply}
                            onChange={e => setReply(e.target.value)}
                            placeholder="Type your transmission..."
                            className="flex-1 h-14 md:h-16 bg-white border border-[#F5F3F0] rounded-xl px-2 text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-[#d3d3d3]/30 focus:border-[#d3d3d3] shadow-inner transition-all"
                        />
                        <Button type="submit" disabled={sending} className="w-16 h-14 md:w-20 md:h-16 rounded-[0.5rem] flex items-center justify-center shadow-xl shadow-[#0a4019]/10">
                            {sending ? <div className="w-6 h-6 border-3 border-secondary/30 border-t-secondary rounded-full animate-spin" /> : <Send size={24} />}
                        </Button>
                    </form>
                ) : (
                    <div className="text-center p-3 md:p-6 bg-green-50 text-green-700 rounded-[2rem] text-xs md:text-sm font-bold uppercase tracking-[0.2em] border-2 border-green-100 shadow-sm">
                        Inquiry Harmoniously Resolved
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {tickets.length === 0 ? (
                <div className="text-center py-24 bg-[#F5F3F0]/20 rounded-[3rem] border-2 border-dashed border-[#F5F3F0] space-y-6">
                    <MessageSquare size={48} className="mx-auto text-neutral-200" />
                    <p className="text-[#6B6B6B] text-lg font-medium italic leading-relaxed">Your support journal is currently silent.</p>
                </div>
            ) : (
                tickets.map(t => (
                    <div
                        key={t._id}
                        onClick={() => setSelectedTicket(t)}
                        className="p-3 md:p-103 bg-white border border-[#F5F3F0] rounded-[1rem] hover:border-[#d3d3d3] hover:shadow-xl transition-all cursor-pointer group flex items-center justify-between"
                    >
                        <div className="flex items-center gap-6 md:gap-8">
                            <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center shadow-sm border ${t.status === 'open' ? 'bg-[#d3d3d3]/20 border-[#d3d3d3]/30 text-[#0a4019]' : t.status === 'in-progress' ? 'bg-blue-50 border-blue-100 text-blue-600' : 'bg-green-50 border-green-100 text-green-600'}`}>
                                <MessageSquare size={28} />
                            </div>
                            <div className="space-y-2">
                                <h4 className="font-bold text-[#0a4019] text-xl md:text-2xl font-heading italic tracking-tight group-hover:text-[#B8A68A] transition-colors">{t.subject}</h4>
                                <div className="flex items-center gap-4">
                                    <span className="text-[10px] md:text-[11px] font-bold text-neutral-400 uppercase tracking-widest">REF: #{t._id.substring(18).toUpperCase()}</span>
                                    <span className={`px-4 py-1 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] shadow-sm ${t.status === 'open' ? 'bg-yellow-100 text-yellow-700' : t.status === 'in-progress' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                                        {t.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="w-12 h-12 flex items-center justify-center rounded-full border border-[#F5F3F0] group-hover:bg-[#0a4019] group-hover:text-[#d3d3d3] transition-all">
                            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

