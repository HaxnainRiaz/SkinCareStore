import { cn } from '@/lib/utils';

export function Card({ children, className, hover = false, ...props }) {
    return (
        <div
            className={cn(
                'bg-white rounded-2xl shadow-soft overflow-hidden',
                hover && 'transition-all duration-300 hover:shadow-medium hover:-translate-y-1',
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
