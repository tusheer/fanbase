import React, { useId } from 'react';

export interface IFileUploadInputProps {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    children: React.ReactElement;
    multiple?: boolean;
    accept?: string;
    className?: string;
}

export const FileUploadInput: React.FC<IFileUploadInputProps> = ({
    onChange,
    children,
    multiple = true,
    accept,
    className = '',
}) => {
    const id = useId();

    return (
        <label
            htmlFor={`fileupload-${id}`}
            className={`relative cursor-pointer overflow-hidden ${className}`}
            tabIndex={0}
        >
            <input
                key={Math.floor(Math.random() * 100 + 1)}
                multiple={multiple}
                type="file"
                id={`fileupload-${id}`}
                name={`fileupload-${id}`}
                className={'absolute  h-0 w-0 cursor-pointer opacity-100 '}
                onChange={onChange}
                accept={accept && accept}
            />

            {children}
        </label>
    );
};
