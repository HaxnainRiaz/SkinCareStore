'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatPrice, calculateDiscount } from '@/lib/utils';
import { useState } from 'react';
import { useCart } from '@/hooks/useCart';
import WishlistButton from './WishlistButton';

export default function ProductCard({ product }) {
    const [imageError, setImageError] = useState(false);
    const { addToCart } = useCart();
    const [isAdding, setIsAdding] = useState(false);

    const discount = calculateDiscount(product.price, product.salePrice);
    const displayPrice = product.salePrice || product.price;

    const handleAddToCart = (e) => {
        e.preventDefault(); // Prevent navigating to product page
        e.stopPropagation();

        setIsAdding(true);
        addToCart(product, 1);

        // Simulating a small delay for visual feedback
        setTimeout(() => setIsAdding(false), 1000);
    };

    return (
        <Card hover className="group relative">
            <Link href={`/product/${product.slug}`} className="block">
                <div className="relative aspect-square overflow-hidden bg-neutral-beige">
                    <Image
                        src={imageError ? `https://placehold.co/600x600/E5D5C2/0B2F26?text=${encodeURIComponent(product.title)}` : product.images[0]}
                        alt={product.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={() => setImageError(true)}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                        {product.salePrice && (
                            <Badge variant="sale">-{discount}%</Badge>
                        )}
                        {product.bestseller && (
                            <Badge variant="secondary">Bestseller</Badge>
                        )}
                    </div>

                    {/* Wishlist button */}
                    <div className="absolute top-4 right-4 z-10">
                        <WishlistButton productId={product._id} />
                    </div>

                    {/* Stock indicator */}
                    {product.stock < 10 && product.stock > 0 && (
                        <div className="absolute bottom-4 left-4 z-10">
                            <Badge variant="warning">Only {product.stock} left</Badge>
                        </div>
                    )}

                    {product.stock === 0 && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
                            <Badge variant="danger">Out of Stock</Badge>
                        </div>
                    )}

                    {/* Hover Overlay with Buttons */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 p-4">
                        <Button
                            variant="secondary"
                            className="w-full max-w-[180px] shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                        >
                            View Product
                        </Button>
                        <Button
                            variant="primary"
                            onClick={handleAddToCart}
                            disabled={product.stock === 0}
                            className="w-full max-w-[180px] shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75"
                        >
                            {isAdding ? 'Added ✓' : 'Quick Add'}
                        </Button>
                    </div>
                </div>

                <div className="p-4">
                    <h3 className="font-heading text-lg font-semibold text-primary mb-2 group-hover:text-primary-light transition-colors">
                        {product.title}
                    </h3>

                    <p className="text-sm text-neutral-gray mb-3 line-clamp-2">
                        {product.description}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                                <svg
                                    key={i}
                                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                        <span className="text-sm text-neutral-gray">
                            {product.rating} ({product.reviews})
                        </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-2">
                        <span className="text-xl font-semibold text-primary">
                            {formatPrice(displayPrice)}
                        </span>
                        {product.salePrice && (
                            <span className="text-sm text-neutral-gray line-through">
                                {formatPrice(product.price)}
                            </span>
                        )}
                    </div>
                </div>
            </Link>
        </Card>
    );
}
