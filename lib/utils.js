export function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}

export function formatPrice(price) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(price);
}

export function calculateDiscount(price, salePrice) {
    if (!salePrice) return 0;
    return Math.round(((price - salePrice) / price) * 100);
}

export function slugify(text) {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-');
}
