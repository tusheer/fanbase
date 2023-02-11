import React, { ReactElement, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

export interface IModalProps {
    className?: string;
    children: ReactElement;
    onClose: () => void;
    open: boolean;
    backdropClassName?: string;
}

export const Modal: React.FC<IModalProps> = ({ className = '', children, onClose, open, backdropClassName = '' }) => {
    const [isBrowser, setIsBrower] = useState<boolean>(false);
    const domref = useRef<HTMLBodyElement | null>(null);
    useEffect(() => {
        setIsBrower(true);
        const appRoot = document.getElementsByTagName('body')[0];
        domref.current = appRoot;

        () => {
            domref.current = null;
        };
    }, []);
    const DialogElement = (
        <div
            onClick={onClose}
            className={`${backdropClassName} fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-5 transition-all ${
                open ? 'block' : 'hidden'
            }`}
            style={{ zIndex: '1000' }}
        >
            <div onClick={(e) => e.stopPropagation()} className={`max-h-screen w-full   bg-white    ${className} `}>
                {children}
            </div>
        </div>
    );

    if (isBrowser && domref.current) {
        return ReactDOM.createPortal(DialogElement, domref.current);
    } else return null;
};
