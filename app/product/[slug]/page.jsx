'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

import { formatPrice, calculateDiscount } from '@/lib/utils';
import { useCart } from '@/hooks/useCart';
import WishlistButton from '@/components/commerce/WishlistButton';
import ProductCard from '@/components/commerce/ProductCard';
import ProductReviews from '@/components/commerce/ProductReviews';

import { useCore } from '@/context/CoreContext';
import { useToast } from '@/context/ToastContext';

export default function ProductPage() {
    const params = useParams();
    const { products: managedProducts, loading: coreLoading } = useCore();

    // Find product from managed products (backend)
    const product = managedProducts.find(p => p.slug === params.slug);

    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const { addToast } = useToast();
    const [imageError, setImageError] = useState(false);

    if (coreLoading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-cream">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-primary font-heading font-medium">Loading Product Details...</p>
            </div>
        );
    }

    if (!product) {
        return (
            <Container className="py-24 text-center">
                <h1 className="text-3xl font-heading font-bold text-primary mb-4">Product Not Found</h1>
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

    return (
        <div className="min-h-screen bg-neutral-cream">
            <Container className="py-12">
                {/* Breadcrumb */}
                <nav className="mb-8 text-sm text-neutral-gray">
                    <Link href="/" className="hover:text-primary">Home</Link>
                    <span className="mx-2">/</span>
                    <Link href="/shop" className="hover:text-primary">Shop</Link>
                    <span className="mx-2">/</span>
                    <span className="text-primary">{product.title}</span>
                </nav>

                <div className="grid lg:grid-cols-2 gap-12 mb-16">
                    {/* Images */}
                    <div>
                        <div className="relative aspect-square bg-white rounded-2xl overflow-hidden mb-4">
                            <Image
                                src={imageError ? `https://placehold.co/800x800/E5D5C2/0B2F26?text=${encodeURIComponent(product.title)}` : product.images[selectedImage]}
                                alt={product.title}
                                fill
                                className="object-cover"
                                priority
                                onError={() => setImageError(true)}
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />

                            {product.salePrice && (
                                <div className="absolute top-4 left-4">
                                    <Badge variant="sale">-{discount}%</Badge>
                                </div>
                            )}
                        </div>

                        {product.images.length > 1 && (
                            <div className="grid grid-cols-4 gap-4">
                                {product.images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`relative aspect-square bg-white rounded-lg overflow-hidden border-2 transition-all ${selectedImage === index ? 'border-primary' : 'border-transparent'
                                            }`}
                                    >
                                        <Image
                                            src={imageError ? `https://placehold.co/200x200/E5D5C2/0B2F26?text=${index + 1}` : image}
                                            alt={`${product.title} ${index + 1}`}
                                            fill
                                            className="object-cover"
                                            sizes="200px"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product info */}
                    <div>
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                {product.isBestSeller && (
                                    <Badge variant="secondary" className="mb-2">Bestseller</Badge>
                                )}
                                <h1 className="text-4xl font-heading font-bold text-primary mb-2">
                                    {product.title}
                                </h1>
                            </div>
                            <WishlistButton productId={product._id} />
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-4">
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <span className="text-neutral-gray">
                                {product.rating} ({product.totalReviews || 0} reviews)
                            </span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-4xl font-heading font-bold text-primary">
                                {formatPrice(displayPrice)}
                            </span>
                            {product.salePrice && (
                                <span className="text-2xl text-neutral-gray line-through">
                                    {formatPrice(product.price)}
                                </span>
                            )}
                        </div>

                        <div
                            className="text-lg text-neutral-gray mb-6 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: product.longDescription || product.description }}
                        />

                        {/* Stock */}
                        {product.stock > 0 ? (
                            <p className="text-green-600 mb-6">✓ In Stock ({product.stock} available)</p>
                        ) : (
                            <p className="text-red-600 mb-6">Out of Stock</p>
                        )}

                        {/* Quantity and Add to Cart */}
                        <div className="flex gap-4 mb-8">
                            <div className="flex items-center border-2 border-neutral-beige rounded-lg">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="px-4 py-3 hover:bg-neutral-beige transition-colors"
                                >
                                    -
                                </button>
                                <span className="px-6 py-3 border-x-2 border-neutral-beige">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                    className="px-4 py-3 hover:bg-neutral-beige transition-colors"
                                >
                                    +
                                </button>
                            </div>

                            <Button
                                onClick={handleAddToCart}
                                disabled={product.stock === 0}
                                className="flex-1"
                                size="lg"
                            >
                                Add to Cart
                            </Button>
                        </div>

                        {/* Product details */}
                        <div className="space-y-6">
                            <div>
                                <h3 className="font-heading text-lg font-semibold text-primary mb-2">
                                    Key Ingredients
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {product.ingredients.map((ingredient) => (
                                        <Badge key={ingredient} variant="secondary">
                                            {ingredient}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="font-heading text-lg font-semibold text-primary mb-2">
                                    How to Use
                                </h3>
                                <p className="text-neutral-gray">{product.usage}</p>
                            </div>

                            <div>
                                <h3 className="font-heading text-lg font-semibold text-primary mb-2">
                                    Skin Concerns
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {product.concerns.map((concern) => (
                                        <Badge key={concern}>
                                            {concern.replace('-', ' ')}
                                        </Badge>
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
                    <div className="mt-16">
                        <h2 className="text-3xl font-heading font-bold text-primary mb-8">
                            You May Also Like
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
