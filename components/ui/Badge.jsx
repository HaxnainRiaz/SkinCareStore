import { cn } from '@/lib/utils';

export function Badge({ children, variant = 'default', className }) {
    const variants = {
        default: 'bg-[#0a4019] text-white',
        secondary: 'bg-[#d3d3d3] text-[#0a4019]',
        success: 'bg-[#16A34A] text-white',
        warning: 'bg-[#F59E0B] text-white',
        danger: 'bg-[#DC2626] text-white',
        sale: 'bg-[#DC2626] text-white',
    };

    return (
        <span className={cn('inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold', variants[variant], className)}>
            {children}
        </span>
    );
}
