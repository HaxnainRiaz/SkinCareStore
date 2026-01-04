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
        primary: 'bg-primary text-white hover:bg-primary-dark focus:ring-primary',
        secondary: 'bg-secondary text-primary hover:bg-secondary-dark focus:ring-secondary',
        outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary',
        ghost: 'text-primary hover:bg-primary/10 focus:ring-primary',
        link: 'text-primary underline-offset-4 hover:underline',
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
