import React, { ReactElement } from 'react';
import { IDropdownContext, useDropdownContext } from './index';

export type IButtonProps<E extends React.ElementType> = {
    children: ReactElement | ReactElement[];
    className?: string;
    label?: string;
    as?: E;
} & React.ComponentPropsWithoutRef<E>;

const Button = <E extends React.ElementType>({ children, className = '', as, ...rest }: IButtonProps<E>) => {
    const { open, setOpen, activeItemId, label }: IDropdownContext = useDropdownContext();
    const DefaultTag = as || 'button';
    return (
        <DefaultTag
            {...rest}
            role={'combobox'}
            aria-autocomplete="none"
            aria-haspopup="listbox"
            aria-controls={`${label}_dropdown`}
            aria-expanded={open}
            className={`${className}`}
            onClick={() => setOpen(!open)}
            aria-activedescendant={activeItemId ? `${label}_element_${activeItemId}` : ''}
        >
            {children}
        </DefaultTag>
    );
};

export default Button;
