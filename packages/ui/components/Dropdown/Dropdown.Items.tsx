import React, { ReactElement, useRef } from 'react';
import { IDropdownContext, useDropdownContext } from './index';

export interface IItemsProps {
    children: ReactElement | ReactElement[];
    className?: string;
}

const Items: React.FC<IItemsProps> = ({ children, className = '' }) => {
    const { label, open }: IDropdownContext = useDropdownContext();
    const listboxref = useRef(null);
    return open ? (
        <ul className={className} ref={listboxref} role="listbox" id={`${label}_dropdown`} tabIndex={-1}>
            {children}
        </ul>
    ) : null;
};

export default Items;
