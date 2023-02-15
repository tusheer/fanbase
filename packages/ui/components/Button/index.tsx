import { cva, VariantProps } from 'class-variance-authority';
import * as React from 'react';

export interface IButtonProps extends VariantProps<typeof buttonSyles>, React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    rounded?: boolean;
}

const buttonSyles = cva(' font-medium ', {
    variants: {
        size: {
            md: 'h-10 px-7',
            sm: 'h-9 px-6',
        },
        rounded: {
            true: 'rounded-full',
            false: 'rounded-md',
        },
        intend: {
            primary: 'text-white bg-brand-main hover:bg-brand-500 active:bg-brand-600',
            error: 'bg-red-600',
            secondary: 'border-2 border-brand-500/70 text-brand-500',
        },
    },
    defaultVariants: {
        size: 'md',
        rounded: false,
        intend: 'primary',
    },
});

export const Button: React.FC<React.PropsWithChildren<IButtonProps>> = ({
    size,
    children,
    className = '',
    rounded,
    intend,
    ...rest
}) => {
    return (
        <button {...rest} className={buttonSyles({ size, className, rounded, intend })}>
            {children}
        </button>
    );
};
