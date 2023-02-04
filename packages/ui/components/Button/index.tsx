import { cva, VariantProps } from 'class-variance-authority';
import * as React from 'react';

export interface IButtonProps extends VariantProps<typeof buttonSyles>, React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    rounded?: boolean;
}

const buttonSyles = cva('text-white font-medium  bg-brand-main hover:bg-brand-500 active:bg-brand-600', {
    variants: {
        size: {
            md: 'h-10 px-7',
        },
        rounded: {
            true: 'rounded-full',
            false: 'rounded-md',
        },
    },
    defaultVariants: {
        size: 'md',
        rounded: false,
    },
});

export const Button: React.FC<React.PropsWithChildren<IButtonProps>> = ({
    size,
    children,
    className = '',
    rounded,
    ...rest
}) => {
    return (
        <button {...rest} className={buttonSyles({ size, className, rounded })}>
            {children}
        </button>
    );
};
