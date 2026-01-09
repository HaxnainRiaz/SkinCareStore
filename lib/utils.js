export function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}

export function formatPrice(price) {
    return new Intl.NumberFormat('en-PK', {
        style: 'currency',
        currency: 'PKR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
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
