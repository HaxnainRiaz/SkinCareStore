'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Container, Button, Badge } from '@/components/ui';
import { ChevronRight, Star, ShoppingBag, ArrowRight, Minus, Plus, Heart, ShieldCheck, Truck, CreditCard } from 'lucide-react';

import { formatPrice, calculateDiscount } from '@/lib/utils';
import { useCart } from '@/hooks/useCart';
import WishlistButton from '@/components/commerce/WishlistButton';
import ProductCard from '@/components/commerce/ProductCard';
import ProductReviews from '@/components/commerce/ProductReviews';

import { useCore } from '@/context/CoreContext';
import { useToast } from '@/context/ToastContext';

export default function ProductPage() {
    const params = useParams();
    const router = useRouter();
    const { products: managedProducts, loading: coreLoading } = useCore();

    // Find product from managed products (backend)
    const product = managedProducts.find(p => p.slug === params.slug);

    const { cart, addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const { addToast } = useToast();
    const [imageError, setImageError] = useState(false);
    const [showDescription, setShowDescription] = useState(false);

    if (coreLoading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFCFB]">
                <div className="w-12 h-12 border-4 border-[#0a4019] border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-[#0a4019] font-heading font-medium">Loading Product Details...</p>
            </div>
        );
    }

    if (!product) {
        return (
            <Container className="py-24 text-center">
                <h1 className="text-3xl font-heading font-bold text-[#0a4019] mb-4">Product Not Found</h1>
                <Link href="/shop">
                    <Button>Back to Shop</Button>
                </Link>
            </Container>
        );
    }

    const displayPrice = product.salePrice || product.price;
    const discount = calculateDiscount(product.price, product.salePrice);
    const relatedProducts = managedProducts
        .filter(p => p.category === product.category && p._id !== product._id)
        .slice(0, 4);

    const handleAddToCart = () => {
        addToCart(product, quantity);
        addToast(`${product.title} added to cart`, 'success');
    };

    const handleBuyNow = () => {
        addToCart(product, quantity);
        router.push('/checkout');
    };

    return (
        <div className="min-h-screen bg-[#FDFCFB]">
            <Container className="py-12">
                {/* Breadcrumb */}
                <nav className="mb-10 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                    <Link href="/" className="hover:text-[#0a4019] transition-colors">Home</Link>
                    <ChevronRight size={10} className="text-neutral-300" />
                    <Link href="/shop" className="hover:text-[#0a4019] transition-colors">Shop</Link>
                    <ChevronRight size={10} className="text-neutral-300" />
                    <span className="text-[#0a4019] italic">{product.title}</span>
                </nav>

                <div className="grid lg:grid-cols-2 gap-16 mb-24">
                    {/* Images Section */}
                    <div className="space-y-6">
                        <div className="relative aspect-square bg-[#FDFCFB] rounded-[2.5rem] overflow-hidden shadow-[0_20px_60px_rgba(11,47,38,0.12)] border border-[#F5F3F0]">
                            <Image
                                src={imageError ? `https://placehold.co/800x800/E5D5C2/0B2F26?text=${encodeURIComponent(product.title)}` : product.images[selectedImage]}
                                alt={product.title}
                                fill
                                className="object-cover transition-transform duration-700 hover:scale-110"
                                priority
                                onError={() => setImageError(true)}
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                unoptimized
                            />

                            {product.salePrice && (
                                <div className="absolute top-8 left-8">
                                    <Badge variant="sale" className="px-6 py-2 rounded-full text-xs shadow-lg">-{discount}% Off</Badge>
                                </div>
                            )}
                        </div>

                        {product.images.length > 1 && (
                            <div className="grid grid-cols-4 gap-4">
                                {product.images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`relative aspect-square bg-[#FDFCFB] rounded-2xl overflow-hidden border-2 transition-all duration-300 ${selectedImage === index
                                            ? 'border-[#0a4019] scale-95 shadow-inner'
                                            : 'border-transparent hover:border-[#d3d3d3]/50'
                                            }`}
                                    >
                                        <Image
                                            src={imageError ? `https://placehold.co/200x200/E5D5C2/0B2F26?text=${index + 1}` : image}
                                            alt={`${product.title} ${index + 1}`}
                                            fill
                                            className="object-cover"
                                            sizes="200px"
                                            unoptimized
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info Section */}
                    <div className="flex flex-col">
                        <div className="flex items-start justify-between mb-2">
                            <div className="space-y-3">
                                {product.isBestSeller && (
                                    <Badge variant="secondary" className="bg-[#d3d3d3]/20 text-[#0a4019] border-[#d3d3d3]/30 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm">
                                        <Star size={10} className="inline mr-1 fill-current" /> Bestseller
                                    </Badge>
                                )}
                                <h1 className="text-5xl font-heading font-bold text-[#0a4019] italic leading-tight">
                                    {product.title}
                                </h1>
                            </div>
                            <div className="pt-2">
                                <WishlistButton productId={product._id} />
                            </div>
                        </div>

                        {/* Rating Display */}
                        <div className="flex items-center gap-4 mb-8">
                            <div className="flex items-center gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={18}
                                        className={i < Math.floor(product.rating) ? 'text-[#D4AF37] fill-[#D4AF37]' : 'text-neutral-200'}
                                    />
                                ))}
                            </div>
                            <span className="text-[11px] font-bold text-[#6B6B6B] uppercase tracking-widest bg-neutral-100 px-3 py-1 rounded-full border border-neutral-200">
                                {product.rating} / 5.0 ({product.totalReviews || 0} reviews)
                            </span>
                        </div>

                        {/* Price Display */}
                        <div className="flex items-baseline gap-4 mb-8">
                            <span className="text-5xl font-heading font-bold text-[#0a4019] italic">
                                {formatPrice(displayPrice)}
                            </span>
                            {product.salePrice && (
                                <span className="text-2xl text-neutral-300 line-through font-medium">
                                    {formatPrice(product.price)}
                                </span>
                            )}
                        </div>

                        {/* Description Dropdown */}
                        <div className="mb-10 border-b border-[#F5F3F0]">
                            <button
                                onClick={() => setShowDescription(!showDescription)}
                                className="w-full py-4 flex items-center justify-between text-left group"
                            >
                                <span className="text-[11px] font-bold text-[#0a4019] uppercase tracking-[0.3em]">Description</span>
                                <div className={`transform transition-transform duration-300 ${showDescription ? 'rotate-180' : ''}`}>
                                    <Plus size={16} className={`text-[#000000] ${showDescription ? 'hidden' : 'block'}`} />
                                    <Minus size={16} className={`text-[#000000] ${showDescription ? 'block' : 'hidden'}`} />
                                </div>
                            </button>
                            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${showDescription ? 'max-h-[2000px] pb-8 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div
                                    className="text-sm text-[#4A4A4A] leading-[1.8] font-medium prose prose-neutral max-w-none 
                                    [&_ul]:list-disc [&_ul]:ml-5 [&_ul]:space-y-2 [&_ul]:my-4
                                    [&_li]:text-[#6B6B6B] [&_li]:italic
                                    [&_strong]:text-[#0a4019] [&_strong]:font-bold
                                    [&_em]:text-[#d3d3d3] [&_em]:not-italic [&_em]:font-semibold"
                                    dangerouslySetInnerHTML={{ __html: product.longDescription || product.description }}
                                />
                            </div>
                        </div>

                        {/* Stock & Fulfillment */}
                        <div className="grid grid-cols-2 gap-4 mb-10">
                            <div className={`flex items-center gap-3 p-4 rounded-2xl border transition-colors ${product.stock > 0 ? 'bg-green-50/50 border-green-100' : 'bg-red-50/50 border-red-100'}`}>
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${product.stock > 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                    <ShieldCheck size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-0.5">Availability</p>
                                    <p className={`text-xs font-bold ${product.stock > 0 ? 'text-green-700' : 'text-red-700'}`}>
                                        {product.stock > 0 ? `In Stock (${product.stock} Units)` : "Out of Stock"}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 rounded-2xl border border-[#F5F3F0] bg-[#FDFCFB]">
                                <div className="w-10 h-10 rounded-xl bg-[#d3d3d3]/20 text-[#0a4019] flex items-center justify-center">
                                    <Truck size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-0.5">Delivery</p>
                                    <p className="text-xs font-bold text-[#0a4019]">Secure Shipping</p>
                                </div>
                            </div>
                        </div>

                        {/* Quantity and Action Area */}
                        <div className="flex flex-col gap-6 mb-12">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex items-center bg-white border border-[#F5F3F0] rounded-2xl p-1.5 shadow-sm sm:w-fit">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-neutral-50 text-neutral-400 transition-colors"
                                    >
                                        <Minus size={16} />
                                    </button>
                                    <span className="w-10 text-center font-bold text-[#0a4019] text-sm">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                        className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-neutral-50 text-neutral-400 transition-colors"
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>

                                <div className="flex-1 flex flex-col sm:flex-row gap-3">
                                    <Button
                                        onClick={handleAddToCart}
                                        disabled={product.stock === 0}
                                        className="flex-1 h-14 rounded-2xl shadow-lg shadow-[#0a4019]/10 py-0 flex items-center justify-center gap-2 group text-[11px]"
                                        size="lg"
                                    >
                                        <ShoppingBag size={18} className="group-hover:scale-110 transition-transform" />
                                        Add to Collection
                                    </Button>
                                    <Button
                                        onClick={handleBuyNow}
                                        disabled={product.stock === 0}
                                        className="flex-1 h-14 rounded-2xl bg-[#d3d3d3] text-[#0a4019] hover:bg-[#B8A68A] border-0 shadow-lg shadow-[#d3d3d3]/20 py-0 flex items-center justify-center gap-2 group text-[11px] font-bold"
                                        size="lg"
                                    >
                                        <CreditCard size={18} className="group-hover:scale-110 transition-transform" />
                                        Buy Now
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Product Detail Accents */}
                        <div className="space-y-8 pt-8 border-t border-[#F5F3F0]">
                            <div>
                                <h3 className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.3em] mb-4">
                                    Key Ingredients
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {Array.from(new Set(['Neem', 'Blackseed', 'Aloe Vera', 'Kojic Acid', ...(product.ingredients || [])]))
                                        .slice(0, 8).map((ingredient, idx) => (
                                            <div key={`${ingredient}-${idx}`} className="bg-[#0a4019] text-[#d3d3d3] text-[9px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full">
                                                {ingredient}
                                            </div>
                                        ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.3em] mb-3">
                                    How to Use
                                </h3>
                                <p className="text-sm text-[#6B6B6B] font-medium leading-relaxed italic">{product.usage}</p>
                            </div>

                            <div>
                                <h3 className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.3em] mb-3">
                                    Skin Concerns
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {product.concerns.map((concern) => (
                                        <span key={concern} className="bg-[#0a4019] text-[#d3d3d3] text-[9px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full">
                                            {concern.replace('-', ' ')}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <ProductReviews productId={product._id} />

                {/* Related products */}
                {relatedProducts.length > 0 && (
                    <div className="mt-24 pt-16 border-t border-[#F5F3F0]">
                        <h2 className="text-4xl font-heading font-bold text-[#0a4019] mb-12 italic">
                            You May Also Like
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {relatedProducts.map((relatedProduct) => (
                                <ProductCard key={relatedProduct._id} product={relatedProduct} />
                            ))}
                        </div>
                    </div>
                )}
            </Container>
        </div>
    );
}
