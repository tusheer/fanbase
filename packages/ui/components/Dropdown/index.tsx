import React, { createContext, ReactElement, useContext, useRef, useState } from 'react';
import { useIsomorphicLayoutEffect } from '../../hooks/use-iso-morphic-effect';
import useOnClickOutside from '../../hooks/use-onclick-outside';
import Button, { IButtonProps } from './Dropdown.Button';
import Item, { IItemProps } from './Dropdown.Item';
import Items, { IItemsProps } from './Dropdown.Items';

export interface IDropdownContext {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    activeItemId: string | null;
    setActiveItemId: React.Dispatch<React.SetStateAction<null | string>>;
    label: string;
}

export const useDropdownContext = () => useContext(DropdownContext);

export const DropdownContext = createContext<IDropdownContext>({
    open: false,
    setOpen: () => undefined,
    activeItemId: null,
    setActiveItemId: () => undefined,
    label: 'hello',
});

interface IDropdown {
    children: ReactElement[] | ReactElement;
    className?: string;
    outSideClick?: boolean;
    onOutsideClick?: () => void;
    label?: string;
}

const DropdownRoot: React.FC<IDropdown> = ({
    children,
    className = '',
    outSideClick = true,
    onOutsideClick,
    label = 'fanbase',
}) => {
    const [open, setOpen] = useState(false);

    const [activeItemId, setActiveItemId] = useState<null | string>(null);

    const ref = useRef(null);

    const providerValue = { open, setOpen, activeItemId, setActiveItemId, label };

    useOnClickOutside(ref, () => {
        if (outSideClick) {
            setOpen(false);
        }
        if (onOutsideClick) {
            onOutsideClick();
        }
    });

    useIsomorphicLayoutEffect(() => {
        console.log(ref);
    }, [children]);

    return (
        <DropdownContext.Provider value={providerValue}>
            <div className={`${className} inline-block`} ref={ref}>
                {children}
            </div>
        </DropdownContext.Provider>
    );
};

export const Dropdown: React.FC<IDropdown> & {
    Item: React.FC<IItemProps>;
    Items: React.FC<IItemsProps>;
    Button: React.FC<IButtonProps>;
} = Object.assign(DropdownRoot, { Item, Items, Button });
