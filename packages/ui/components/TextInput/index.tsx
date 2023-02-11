import { cva } from 'class-variance-authority';
import { AnimatePresence, motion } from 'framer-motion';
import React, { forwardRef, InputHTMLAttributes, useId } from 'react';

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
    className?: string;
    label?: string;
    error?: boolean;
    errorText?: string;
    type?: string;
    textArea?: boolean;
    rows?: number;
    placeholder?: string;
    EndIcon?: React.ReactElement;
    startIcon?: React.ReactElement;
}

const inputCva = cva(
    'bg-gray-50 border outline-0 text-gray-900 text-sm rounded-md focus:ring-1 block w-full px-2.5 py-1 h-10',
    {
        variants: {
            error: {
                true: 'border-red-500  focus:ring-red-400   focus:border-red-400',
                false: ' border-gray-300  focus:ring-brand-main   focus:border-brand-main  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500',
            },
        },
        defaultVariants: {
            error: false,
        },
    }
);

export const TextInput: React.FC<IInputProps> = forwardRef<HTMLInputElement, IInputProps>(
    (
        { type = 'text', textArea, errorText, label, className = '', rows = 2, error = false, name = '', ...rest },
        ref
    ) => {
        const uid = useId();
        return (
            <div className={className}>
                {label ? (
                    <label
                        htmlFor={uid + name}
                        className="mb-1.5 block text-sm font-medium text-gray-900  dark:text-white"
                    >
                        {label}
                    </label>
                ) : null}

                {textArea ? (
                    <textarea {...rest} rows={rows}></textarea>
                ) : (
                    <input
                        ref={ref}
                        type={type}
                        id={uid + name}
                        name={name}
                        aria-invalid={error}
                        className={inputCva({ error })}
                        {...rest}
                    />
                )}
                <AnimatePresence>
                    {error && errorText ? (
                        <motion.small
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 4 }}
                            className="block text-sm text-red-600"
                            role="alert"
                        >
                            {errorText}
                        </motion.small>
                    ) : null}
                </AnimatePresence>
            </div>
        );
    }
);

TextInput.displayName = 'TextInput';
