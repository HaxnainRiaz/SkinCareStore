import { cn } from '@/lib/utils';

export function Card({ children, className, hover = false, ...props }) {
    return (
        <div
            className={cn(
                'bg-white rounded-2xl shadow-[0_4px_20px_rgba(11,47,38,0.08)] overflow-hidden',
                hover && 'transition-all duration-300 hover:shadow-[0_8px_30px_rgba(11,47,38,0.1)] hover:-translate-y-1',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

export function CardHeader({ children, className }) {
    return (
        <div className={cn('p-6', className)}>
            {children}
        </div>
    );
}

export function CardBody({ children, className }) {
    return (
        <div className={cn('p-6 pt-0', className)}>
            {children}
        </div>
    );
}

export function CardFooter({ children, className }) {
    return (
        <div className={cn('p-6 pt-0', className)}>
            {children}
        </div>
    );
}
