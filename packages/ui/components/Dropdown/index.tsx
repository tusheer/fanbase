import React, { createContext, ReactElement, useContext, useRef, useState } from 'react';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import Item from './Item';
import Menu from './Menu';

export interface IDropdownContext {
    open: boolean;
    toggle: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useDropdownContext = () => useContext(DropdownContext);

export const DropdownContext = createContext<IDropdownContext>({
    open: false,
    toggle: () => undefined,
});

interface IDropdown {
    children: ReactElement[] | ReactElement;
    className?: string;
    outSideClick?: boolean;
    onOutsideClick?: () => void;
}

interface IDropdownComposition {
    Item: React.FC<{ children: ({ toggle, open }: IDropdownContext) => ReactElement }>;
    Menu: React.FC<{ children: ({ toggle, open }: IDropdownContext) => ReactElement }>;
}

const Dropdown: React.FC<IDropdown> & IDropdownComposition = ({
    children,
    className,
    outSideClick = true,
    onOutsideClick,
}) => {
    const [open, toggle] = useState(false);
    const providerValue = { open, toggle };
    const ref = useRef(null);
    useOnClickOutside(ref, () => {
        outSideClick && toggle(false);
        onOutsideClick && onOutsideClick();
    });

    return (
        <DropdownContext.Provider value={providerValue}>
            <div className={`${className} inline-block`} ref={ref}>
                {children}
            </div>
        </DropdownContext.Provider>
    );
};

Dropdown.defaultProps = {
    className: '',
};

Dropdown.Item = Item;
Dropdown.Menu = Menu;

export default Dropdown;
