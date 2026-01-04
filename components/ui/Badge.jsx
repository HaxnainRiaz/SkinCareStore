import { cn } from '@/lib/utils';

export function Badge({ children, variant = 'default', className }) {
    const variants = {
        default: 'bg-primary text-white',
        secondary: 'bg-secondary text-primary',
        success: 'bg-green-100 text-green-800',
        warning: 'bg-yellow-100 text-yellow-800',
        danger: 'bg-red-100 text-red-800',
        sale: 'bg-red-500 text-white',
    };

    return (
        <span className={cn('inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold', variants[variant], className)}>
            {children}
        </span>
    );
}
