import { cn } from '@/lib/utils';

export function Button({
    children,
    variant = 'primary',
    size = 'md',
    className,
    disabled,
    icon: Icon,
    ...props
}) {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider';

    const variants = {
        primary: 'bg-[#0a4019] text-white hover:bg-[#08241d] shadow-md hover:shadow-lg',
        secondary: 'bg-[#d3d3d3] text-[#0a4019] hover:bg-[#aba9a9] shadow-sm hover:shadow-md',
        outline: 'border-2 border-[#0a4019] text-[#0a4019] hover:bg-[#0a4019] hover:text-white',
        ghost: 'text-[#0a4019] hover:bg-[#F5F3F0]',
        link: 'text-[#0a4019] underline-offset-4 hover:underline lowercase tracking-normal',
    };

    const sizes = {
        sm: 'px-6 py-2 text-xs rounded-full',
        md: 'px-8 py-3 text-sm rounded-full',
        lg: 'px-10 py-4 text-sm rounded-full',
    };

    return (
        <button
            className={cn(baseStyles, variants[variant], sizes[size], className)}
            disabled={disabled}
            {...props}
        >
            {Icon && <Icon className="mr-2 w-4 h-4" />}
            {children}
        </button>
    );
}
