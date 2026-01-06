'use client';

import { useState, useEffect } from 'react';
import { useReviews } from '@/context/ReviewsContext';
import { Button } from '@/components/ui/Button';
import { useStoreAuth } from '@/context/StoreAuthContext';

export default function ProductReviews({ productId }) {
    const { getReviews, addReview, fetchReviews, isClient } = useReviews();
    const { user } = useStoreAuth();
    const reviews = getReviews(productId);

    useEffect(() => {
        if (productId) {
            fetchReviews(productId);
        }
    }, [productId, fetchReviews]);

    // Form State
    const [showForm, setShowForm] = useState(false);
    const [hoverRating, setHoverRating] = useState(0);
    const [newReview, setNewReview] = useState({
        name: '',
        rating: 0,
        title: '',
        comment: '',
        resultsTime: '1 week',
        skinType: 'Combination',
        recommend: 'Yes',
        image: null
    });

    // Rating Breakdown Logic
    const averageRating = reviews.length > 0
        ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
        : 0;

    const ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(r => {
        if (ratingCounts[r.rating] !== undefined) ratingCounts[r.rating]++;
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newReview.rating === 0) {
            alert("Please select a star rating.");
            return;
        }

        const dataToSubmit = { ...newReview };
        if (user) {
            dataToSubmit.name = user.name;
        }

        const result = await addReview(productId, dataToSubmit);
        if (result.success) {
            setNewReview({
                name: '',
                rating: 0,
                title: '',
                comment: '',
                resultsTime: '1 week',
                skinType: 'Combination',
                recommend: 'Yes',
                image: null
            });
            setShowForm(false);
        } else {
            alert(result.message || "Failed to submit review");
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewReview({ ...newReview, image: 'attached' });
        }
    };

    if (!isClient) return null;

    return (
        <section className="py-12 border-t border-neutral-beige mt-12 scroll-mt-24" id="reviews">
            <h2 className="text-3xl font-heading font-bold text-primary mb-8 text-center">Customer Reviews</h2>

            {/* Summary Section */}
            <div className="grid md:grid-cols-3 gap-8 mb-12 bg-white p-8 rounded-2xl shadow-soft">
                {/* Average Rating */}
                <div className="text-center md:text-left flex flex-col justify-center border-b md:border-b-0 md:border-r border-neutral-beige pb-6 md:pb-0">
                    <div className="text-6xl font-heading font-bold text-primary mb-2">{averageRating}</div>
                    <div className="flex justify-center md:justify-start text-yellow-400 mb-2 space-x-1">
                        {[...Array(5)].map((_, i) => (
                            <svg key={i} className={`w-6 h-6 ${i < Math.round(averageRating) ? 'fill-current' : 'text-gray-300'}`} viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                    </div>
                    <p className="text-neutral-gray">Based on {reviews.length} reviews</p>
                </div>

                {/* Rating Distribution */}
                <div className="space-y-2 col-span-1 md:col-span-2 flex flex-col justify-center">
                    {[5, 4, 3, 2, 1].map((star) => (
                        <div key={star} className="flex items-center gap-3">
                            <span className="text-sm font-medium w-12 text-primary">{star} Stars</span>
                            <div className="flex-1 h-3 bg-neutral-beige rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-yellow-400 rounded-full"
                                    style={{ width: `${reviews.length ? (ratingCounts[star] / reviews.length) * 100 : 0}%` }}
                                ></div>
                            </div>
                            <span className="text-sm text-neutral-gray w-8 text-right">{ratingCounts[star]}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Write Review Button */}
            <div className="text-center mb-12">
                {!showForm && (
                    <Button size="lg" onClick={() => setShowForm(true)}>
                        Write a Review
                    </Button>
                )}
            </div>

            {/* Enhanced Review Form */}
            {showForm && (
                <div className="bg-white p-8 rounded-2xl shadow-medium mb-16 animate-fadeIn max-w-3xl mx-auto border border-neutral-beige">
                    <h3 className="text-2xl font-heading font-semibold text-primary mb-6 text-center">Share Your Experience</h3>

                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Star Rating Interactive */}
                        <div className="text-center mb-6">
                            <label className="block text-sm font-medium text-neutral-gray mb-3">Rate your experience</label>
                            <div className="flex justify-center gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onMouseEnter={() => setHoverRating(star)}
                                        onMouseLeave={() => setHoverRating(0)}
                                        onClick={() => setNewReview({ ...newReview, rating: star })}
                                        className="focus:outline-none transition-transform hover:scale-110"
                                    >
                                        <svg
                                            className={`w-10 h-10 ${(hoverRating || newReview.rating) >= star
                                                ? 'text-yellow-400 fill-current'
                                                : 'text-gray-200 fill-current'
                                                }`}
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    </button>
                                ))}
                            </div>
                            <p className="text-sm text-primary font-medium mt-2 h-5 text-center">
                                {hoverRating === 1 && "Poor"}
                                {hoverRating === 2 && "Fair"}
                                {hoverRating === 3 && "Average"}
                                {hoverRating === 4 && "Good"}
                                {hoverRating === 5 && "Excellent!"}
                            </p>
                        </div>

                        {/* Name Field (Hidden if logged in) */}
                        {!user && (
                            <div>
                                <label className="block text-sm font-medium text-primary mb-2">Your Name</label>
                                <input
                                    required
                                    type="text"
                                    className="input-field"
                                    value={newReview.name}
                                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                                    placeholder="Enter your name"
                                />
                            </div>
                        )}

                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-primary mb-2">Review Title</label>
                            <input
                                required
                                type="text"
                                className="input-field"
                                value={newReview.title}
                                onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                                placeholder="Amazing glow results!"
                            />
                        </div>

                        {/* Dropdowns */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-primary mb-2">How soon did you see results?</label>
                                <select
                                    className="input-field"
                                    value={newReview.resultsTime}
                                    onChange={(e) => setNewReview({ ...newReview, resultsTime: e.target.value })}
                                >
                                    <option value="1 week">1 week</option>
                                    <option value="2 weeks">2 weeks</option>
                                    <option value="3–4 weeks">3–4 weeks</option>
                                    <option value="More than a month">More than a month</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-primary mb-2">Your Skin Type</label>
                                <select
                                    className="input-field"
                                    value={newReview.skinType}
                                    onChange={(e) => setNewReview({ ...newReview, skinType: e.target.value })}
                                >
                                    <option value="Oily">Oily</option>
                                    <option value="Dry">Dry</option>
                                    <option value="Combination">Combination</option>
                                    <option value="Sensitive">Sensitive</option>
                                    <option value="Normal">Normal</option>
                                </select>
                            </div>
                        </div>

                        {/* Comment */}
                        <div>
                            <label className="block text-sm font-medium text-primary mb-2">Share your experience</label>
                            <textarea
                                required
                                className="input-field min-h-[120px]"
                                value={newReview.comment}
                                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                                placeholder="Tell us about your glow, dark spot reduction, hydration, texture changes, etc."
                            />
                            <p className="text-xs text-neutral-gray mt-2">
                                Tip: Describe real visible changes and mention timeframe of results.
                            </p>
                        </div>

                        {/* Media & Recommend */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-primary mb-2">Add photos/videos (Optional)</label>
                                <input
                                    type="file"
                                    accept="image/*,video/*"
                                    onChange={handleImageUpload}
                                    className="block w-full text-sm text-neutral-gray
                                      file:mr-4 file:py-2 file:px-4
                                      file:rounded-full file:border-0
                                      file:text-sm file:font-semibold
                                      file:bg-secondary file:text-primary
                                      hover:file:bg-secondary-dark
                                      cursor-pointer"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-primary mb-2">Would you recommend this product?</label>
                                <div className="flex gap-4 mt-2">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="recommend"
                                            value="Yes"
                                            checked={newReview.recommend === 'Yes'}
                                            onChange={(e) => setNewReview({ ...newReview, recommend: e.target.value })}
                                            className="accent-primary w-4 h-4"
                                        />
                                        <span className="text-neutral-gray">Yes</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="recommend"
                                            value="No"
                                            checked={newReview.recommend === 'No'}
                                            onChange={(e) => setNewReview({ ...newReview, recommend: e.target.value })}
                                            className="accent-primary w-4 h-4"
                                        />
                                        <span className="text-neutral-gray">No</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end gap-3 pt-4 border-t border-neutral-beige">
                            <Button variant="outline" type="button" onClick={() => setShowForm(false)}>
                                Cancel
                            </Button>
                            <Button type="submit">
                                Submit Review
                            </Button>
                        </div>
                    </form>
                </div>
            )}

            {/* Reviews List */}
            <div className="space-y-8">
                {reviews.length === 0 ? (
                    <p className="text-neutral-gray text-center py-12 bg-neutral-beige/30 rounded-2xl">
                        No reviews yet. Be the first to share your glow journey!
                    </p>
                ) : (
                    reviews.map((review) => (
                        <div key={review._id || review.id} className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-beige/50">
                            <div className="flex flex-col md:flex-row justify-between items-start mb-4 gap-4">
                                <div className="flex-1">
                                    {/* Stars */}
                                    <div className="flex text-yellow-400 mb-2">
                                        {[...Array(5)].map((_, i) => (
                                            <svg key={i} className={`w-5 h-5 ${i < review.rating ? 'fill-current' : 'text-gray-300'}`} viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>

                                    {/* Title */}
                                    <h4 className="text-lg font-bold text-primary mb-1">{review.title}</h4>

                                    {/* Author & Date */}
                                    <div className="text-sm text-neutral-gray flex items-center gap-2 mb-4">
                                        <span className="font-semibold">{review.name || 'Anonymous'}</span>
                                        <span className="w-1 h-1 bg-neutral-gray rounded-full"></span>
                                        <span>Verified Buyer</span>
                                        <span className="w-1 h-1 bg-neutral-gray rounded-full"></span>
                                        <span>{new Date(review.createdAt || review.date).toLocaleDateString()}</span>
                                    </div>

                                    {/* Review Text */}
                                    <p className="text-neutral-gray leading-relaxed mb-6">
                                        {review.comment}
                                    </p>

                                    {/* Review Metadata Chips */}
                                    <div className="flex flex-wrap gap-3">
                                        {review.skinType && (
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-neutral-beige text-primary">
                                                Skin Type: {review.skinType}
                                            </span>
                                        )}
                                        {review.resultsTime && (
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-neutral-beige text-primary">
                                                Results in: {review.resultsTime}
                                            </span>
                                        )}
                                        {review.recommend === 'Yes' && (
                                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                Recommends this product
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
}
