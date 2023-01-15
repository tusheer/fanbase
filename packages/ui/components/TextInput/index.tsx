import React, { InputHTMLAttributes, useId } from 'react';

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

export const TextInput: React.FC<IInputProps> = ({
    type = 'text',
    textArea,
    errorText,
    label,
    className = '',
    rows = 2,
    error,
    name = '',
    ...rest
}) => {
    const uid = useId();

    return (
        <div className={className}>
            <label htmlFor={uid + name} className="block mb-2 text-sm font-medium text-gray-900  dark:text-white">
                {label}
            </label>
            {textArea ? (
                <textarea {...rest} rows={rows}></textarea>
            ) : (
                <input
                    type={type}
                    id={uid + name}
                    name={name}
                    aria-invalid={error}
                    className="bg-gray-50 border border-gray-300 outline-0 text-gray-900 text-sm rounded-md focus:ring-1 focus:ring-gray-500   focus:border-gray-500 block w-full px-2.5 py-1 h-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                    {...rest}
                />
            )}
            {errorText && error ? (
                <small className="text-red-600 text-sm" role="alert">
                    {errorText}
                </small>
            ) : null}
        </div>
    );
};
