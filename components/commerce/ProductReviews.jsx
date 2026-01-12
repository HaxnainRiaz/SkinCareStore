import { useState, useEffect } from 'react';
import { useReviews } from '@/context/ReviewsContext';
import { Button, Input, Dropdown } from '@/components/ui';
import { useStoreAuth } from '@/context/StoreAuthContext';
import { Star, MessageSquare, Plus, CheckCircle, Image as ImageIcon, ThumbsUp, Calendar, User, UserCheck, Quote, ChevronDown, Award, PenLine, User as UserIcon, Clock, Sparkles, X } from 'lucide-react';

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
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewReview({ ...newReview, image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    if (!isClient) return null;

    return (
        <section className="py-16 border-t border-[#F5F3F0] mt-16 scroll-mt-24" id="reviews">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
                <div className="space-y-2">
                    <span className="text-[10px] font-bold text-[#d3d3d3] uppercase tracking-[0.3em]">Community Feedback</span>
                    <h2 className="text-4xl font-heading font-bold text-[#0a4019] italic leading-none">Customer Voices</h2>
                </div>
                {!showForm && (
                    <Button
                        onClick={() => setShowForm(true)}
                        className="rounded-full px-8 py-4 h-auto text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-[#0a4019]/10"
                    >
                        <Plus size={14} className="mr-2" /> Add Your Review
                    </Button>
                )}
            </div>

            {/* Compact Dashboard */}
            <div className="bg-white rounded-[2.5rem] border border-[#F5F3F0] overflow-hidden shadow-sm mb-12">
                <div className="grid md:grid-cols-12">
                    {/* Score Summary */}
                    <div className="md:col-span-4 p-10 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-[#F5F3F0] bg-[#FDFCFB]/50">
                        <div className="text-7xl font-heading font-bold text-[#0a4019] mb-2 italic tracking-tighter">{averageRating}</div>
                        <div className="flex gap-0.5 text-[#D4AF37] mb-4">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={20} className={i < Math.round(averageRating) ? 'fill-[#D4AF37]' : 'text-neutral-200'} />
                            ))}
                        </div>
                        <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                            Based on {reviews.length} Witnesses
                        </p>
                    </div>

                    {/* Compact Bars */}
                    <div className="md:col-span-8 p-10 space-y-3 flex flex-col justify-center">
                        {[5, 4, 3, 2, 1].map((star) => (
                            <div key={star} className="flex items-center gap-4 group">
                                <span className="text-[10px] font-bold text-[#0a4019] w-12 uppercase tracking-widest">{star} <Star size={8} className="inline mb-1 fill-current" /></span>
                                <div className="flex-1 h-1.5 bg-neutral-50 rounded-full overflow-hidden border border-[#F5F3F0]">
                                    <div
                                        className="h-full bg-[#D4AF37] rounded-full transition-all duration-1000 group-hover:brightness-110"
                                        style={{ width: `${reviews.length ? (ratingCounts[star] / reviews.length) * 100 : 0}%` }}
                                    ></div>
                                </div>
                                <span className="text-[10px] font-bold text-neutral-400 w-8 tabular-nums">{ratingCounts[star]}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Premium Review Portal (Modal) */}
            {showForm && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-[#0a4019]/60 backdrop-blur-sm animate-fadeIn"
                        onClick={() => setShowForm(false)}
                    />

                    {/* Modal Content */}
                    <div className="relative w-full max-w-2xl bg-[#FDFCFB] rounded-[2.5rem] shadow-[0_30px_100px_rgba(11,47,38,0.25)] overflow-hidden animate-slideUp border border-[#F5F3F0]">
                        {/* Header Image/Pattern Overlay */}
                        <div className="absolute top-0 left-0 w-full h-32 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-10 pointer-events-none" />

                        <div className="p-8 sm:p-12 relative">
                            <div className="flex justify-between items-start space-y-3">
                                <div className='space-y-2'>
                                    <h3 className="text-3xl font-heading font-bold text-[#0a4019] italic">Share Your Transformation</h3>
                                    <p className="text-xs text-[#6B6B6B] font-medium uppercase tracking-[0.2em] opacity-70">Archive your experience with the botanical collection</p>
                                </div>
                                <button
                                    onClick={() => setShowForm(false)}
                                    className="p-2 hover:bg-[#F5F3F0] rounded-full transition-colors text-[#0a4019]"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="">
                                <div className="flex w-full gap-4">
                                    {/* Left Column: Rating & Identity */}
                                    <div className="space-y-3 w-full">
                                        <div className="p-3 bg-white rounded-2xl border border-[#F5F3F0] shadow-sm">
                                            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em] text-center">Overall Performance</p>
                                            <div className="flex justify-center gap-2">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <button
                                                        key={star}
                                                        type="button"
                                                        onClick={() => setNewReview({ ...newReview, rating: star })}
                                                        onMouseEnter={() => setHoverRating(star)}
                                                        onMouseLeave={() => setHoverRating(0)}
                                                        className="transition-all duration-300 hover:scale-125 hover:-translate-y-1"
                                                    >
                                                        <Star
                                                            size={32}
                                                            className={`transition-colors duration-300 ${(hoverRating || newReview.rating) >= star ? 'text-[#D4AF37] fill-[#D4AF37]' : 'text-neutral-100'}`}
                                                        />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        {!user && (
                                            <Input
                                                label="Signature Name"
                                                required
                                                value={newReview.name}
                                                onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                                                placeholder="Identity"
                                                icon={UserIcon}
                                            />
                                        )}
                                        <Input
                                            label="Your Comment"
                                            required
                                            value={newReview.title}
                                            onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                                            placeholder="Brief Summary"
                                            icon={PenLine}
                                        />
                                        <div className="space-y-6">
                                            <div className="flex gap-4">
                                                <Dropdown
                                                    label="Visible Transition"
                                                    icon={Clock}
                                                    value={newReview.resultsTime}
                                                    onChange={(e) => setNewReview({ ...newReview, resultsTime: e.target.value })}
                                                    options={[
                                                        { value: '1 week', label: '1 WEEK' },
                                                        { value: '2 weeks', label: '2 WEEKS' },
                                                        { value: '3–4 weeks', label: '3-4 WEEKS' },
                                                        { value: 'More than a month', label: '1 MONTH+' },
                                                    ]}
                                                />
                                                <Dropdown
                                                    label="Skin Type"
                                                    icon={Sparkles}
                                                    value={newReview.skinType}
                                                    onChange={(e) => setNewReview({ ...newReview, skinType: e.target.value })}
                                                    options={[
                                                        { value: 'Oily', label: 'OILY' },
                                                        { value: 'Dry', label: 'DRY' },
                                                        { value: 'Combination', label: 'COMBO' },
                                                        { value: 'Sensitive', label: 'SENSITIVE' },
                                                    ]}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold text-[#0a4019] uppercase ml-1 tracking-widest">Narrative</label>
                                                <textarea
                                                    required
                                                    className="w-full px-6 py-5 bg-white border border-[#F5F3F0] rounded-[1.5rem] text-sm italic min-h-[110px] resize-none focus:outline-none focus:ring-2 focus:ring-[#d3d3d3]/30 shadow-sm hover:shadow-md transition-all duration-300 placeholder:opacity-30"
                                                    placeholder="Detail your transition with the formula..."
                                                    value={newReview.comment}
                                                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                                                />
                                            </div>
                                        </div>


                                    </div>

                                    {/* Right Column: Details & Narrative */}
                                    {/* <div className="space-y-6">
                                        <div className="flex gap-4">
                                            <Dropdown
                                                label="Visible Transition"
                                                icon={Clock}
                                                value={newReview.resultsTime}
                                                onChange={(e) => setNewReview({ ...newReview, resultsTime: e.target.value })}
                                                options={[
                                                    { value: '1 week', label: '1 WEEK' },
                                                    { value: '2 weeks', label: '2 WEEKS' },
                                                    { value: '3–4 weeks', label: '3-4 WEEKS' },
                                                    { value: 'More than a month', label: '1 MONTH+' },
                                                ]}
                                            />
                                            <Dropdown
                                                label="Skin Type"
                                                icon={Sparkles}
                                                value={newReview.skinType}
                                                onChange={(e) => setNewReview({ ...newReview, skinType: e.target.value })}
                                                options={[
                                                    { value: 'Oily', label: 'OILY' },
                                                    { value: 'Dry', label: 'DRY' },
                                                    { value: 'Combination', label: 'COMBO' },
                                                    { value: 'Sensitive', label: 'SENSITIVE' },
                                                ]}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-[#0a4019] uppercase ml-1 tracking-widest">Narrative</label>
                                            <textarea
                                                required
                                                className="w-full px-6 py-5 bg-white border border-[#F5F3F0] rounded-[1.5rem] text-sm italic min-h-[140px] resize-none focus:outline-none focus:ring-2 focus:ring-[#d3d3d3]/30 shadow-sm hover:shadow-md transition-all duration-300 placeholder:opacity-30"
                                                placeholder="Detail your transition with the formula..."
                                                value={newReview.comment}
                                                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                                            />
                                        </div>
                                    </div> */}
                                </div>

                                <div className="flex justify-end gap-4 pt-8 border-t border-[#F5F3F0]">
                                    <button
                                        type="button"
                                        onClick={() => setShowForm(false)}
                                        className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 hover:text-[#0a4019] transition-colors px-6"
                                    >
                                        Discard
                                    </button>
                                    <Button
                                        type="submit"
                                        className="rounded-full px-12 py-4 h-auto text-[10px] font-bold uppercase tracking-[0.2em] shadow-xl shadow-[#0a4019]/20 bg-[#0a4019] text-[#d3d3d3] hover:scale-105 active:scale-95 transition-all duration-300"
                                    >
                                        Archive Reflection
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* High-Density Narrative Stream */}
            <div className="grid gap-6">
                {reviews.length === 0 ? (
                    <div className="text-center py-20 bg-[#FDFCFB]/50 rounded-[2.5rem] border border-dashed border-[#F5F3F0]">
                        <p className="text-[#0a4019]/40 font-heading italic text-lg">No narratives documented yet.</p>
                    </div>
                ) : (
                    reviews.map((review) => (
                        <div key={review._id || review.id} className="group bg-white p-8 rounded-[2.5rem] shadow-sm border border-[#F5F3F0] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(11,47,38,0.05)] hover:-translate-y-1">
                            <div className="grid lg:grid-cols-12 gap-8">
                                {/* Left Column: Identity & Metadata (Compact) */}
                                <div className="lg:col-span-3 space-y-4 pt-1">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-[#d3d3d3]/20 flex items-center justify-center text-[#0a4019]">
                                            <User size={18} />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-1.5">
                                                <p className="font-bold text-[#0a4019] text-xs leading-none">{review.name || 'Anonymous'}</p>
                                                <UserCheck size={12} className="text-[#D4AF37]" />
                                            </div>
                                            <p className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest mt-1">Verified Buyer</p>
                                        </div>
                                    </div>

                                    <div className="space-y-1.5 pt-2 border-t border-[#F5F3F0]/50">
                                        <div className="flex justify-between items-center">
                                            <span className="text-[9px] font-bold text-neutral-300 uppercase tracking-widest">Date</span>
                                            <span className="text-[9px] font-bold text-[#0a4019] uppercase">{new Date(review.createdAt || review.date).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}</span>
                                        </div>
                                        {review.skinType && (
                                            <div className="flex justify-between items-center">
                                                <span className="text-[9px] font-bold text-neutral-300 uppercase tracking-widest">Type</span>
                                                <span className="text-[9px] font-bold text-[#0a4019] uppercase">{review.skinType}</span>
                                            </div>
                                        )}
                                        {review.resultsTime && (
                                            <div className="flex justify-between items-center">
                                                <span className="text-[9px] font-bold text-neutral-300 uppercase tracking-widest">Result</span>
                                                <span className="text-[9px] font-bold text-[#0a4019] uppercase">{review.resultsTime}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Right Column: Content (Focused) */}
                                <div className="lg:col-span-9 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex gap-0.5 text-[#D4AF37]">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={14} className={i < review.rating ? 'fill-[#D4AF37]' : 'text-neutral-100'} />
                                            ))}
                                        </div>
                                        {review.recommend === 'Yes' && (
                                            <span className="flex items-center gap-1.5 text-[9px] font-bold text-green-700 bg-green-50 px-3 py-1 rounded-full uppercase tracking-tighter">
                                                <CheckCircle size={10} /> Highly Recommended
                                            </span>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <h4 className="text-xl font-heading font-bold text-[#0a4019] leading-tight italic">{review.title}</h4>
                                        <p className="text-[#6B6B6B] leading-[1.6] text-sm italic opacity-90">
                                            "{review.comment}"
                                        </p>
                                    </div>

                                    {/* Small Visual Thumbs */}
                                    {review.images && review.images.length > 0 && (
                                        <div className="flex gap-3 pt-2">
                                            {review.images.map((img, idx) => (
                                                <div key={idx} className="relative w-16 h-16 rounded-2xl overflow-hidden border border-[#F5F3F0] group/img">
                                                    <img src={img} alt="Evidence" className="w-full h-full object-cover transition-transform group-hover/img:scale-110" />
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Compact Protocol Response */}
                                    {review.adminReply && (
                                        <div className="mt-4 p-5 bg-[#FDFCFB] rounded-[2rem] border-l-4 border-[#d3d3d3] relative">
                                            <div className="flex items-center gap-1.5 mb-1.5">
                                                <p className="text-[9px] font-bold text-[#0a4019] uppercase tracking-[0.2em] font-heading">Protocol Response</p>
                                            </div>
                                            <p className="text-[#6B6B6B] font-medium leading-relaxed italic text-xs">
                                                {review.adminReply}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
}
