import { cn } from '@/lib/utils';

export function Button({
    children,
    variant = 'primary',
    size = 'md',
    className,
    disabled,
    ...props
}) {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary: 'bg-[#0B2F26] text-white hover:bg-[#051712] focus:ring-[#0B2F26]',
        secondary: 'bg-[#D1BFA3] text-[#0B2F26] hover:bg-[#B8A68A] focus:ring-[#D1BFA3]',
        outline: 'border-2 border-[#0B2F26] text-[#0B2F26] hover:bg-[#0B2F26] hover:text-white focus:ring-[#0B2F26]',
        ghost: 'text-[#0B2F26] hover:bg-[#0B2F261A] focus:ring-[#0B2F26]',
        link: 'text-[#0B2F26] underline-offset-4 hover:underline',
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm rounded-md',
        md: 'px-6 py-3 text-base rounded-lg',
        lg: 'px-8 py-4 text-lg rounded-lg',
    };

    return (
        <button
            className={cn(baseStyles, variants[variant], sizes[size], className)}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
}
