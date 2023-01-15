import React, { InputHTMLAttributes, forwardRef, useId } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
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

export const TextInput: React.FC<IInputProps> = forwardRef<HTMLInputElement, IInputProps>(
    ({ type = 'text', textArea, errorText, label, className = '', rows = 2, error, name = '', ...rest }, ref) => {
        const uid = useId();

        const variants = {
            open: { opacity: 1, y: 0 },
            closed: { opacity: 0, y: 5 },
        };

        return (
            <div className={className}>
                <label htmlFor={uid + name} className="block mb-1.5 text-sm font-medium text-gray-900  dark:text-white">
                    {label}
                </label>
                {textArea ? (
                    <textarea {...rest} rows={rows}></textarea>
                ) : (
                    <input
                        ref={ref}
                        type={type}
                        id={uid + name}
                        name={name}
                        aria-invalid={error}
                        className="bg-gray-50 border border-gray-300 outline-0 text-gray-900 text-sm rounded-md focus:ring-1 focus:ring-gray-500   focus:border-gray-500 block w-full px-2.5 py-1 h-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                        {...rest}
                    />
                )}
                <AnimatePresence>
                    <motion.small
                        variants={variants}
                        animate={error && errorText ? 'open' : 'closed'}
                        className="text-red-600 text-sm block"
                        role="alert"
                    >
                        {errorText}
                    </motion.small>
                </AnimatePresence>
            </div>
        );
    }
);

TextInput.displayName = 'TextInput';
