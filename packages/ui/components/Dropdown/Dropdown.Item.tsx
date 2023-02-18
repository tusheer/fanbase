import React, { ReactElement, useId } from 'react';
import { IDropdownContext, useDropdownContext } from './index';

export interface IItemProps {
    children: ({ isActive }: { isActive: boolean }) => ReactElement;
    className?: string;
    onClick?: (event: React.MouseEvent) => void;
}

const Item: React.FC<IItemProps> = (props) => {
    const uid = useId();

    const { activeItemId, label }: IDropdownContext = useDropdownContext();
    return (
        <li
            tabIndex={-1}
            id={`${label}_element_${uid}`}
            aria-selected={uid === activeItemId}
            role="option"
            data-uid={uid}
            onClick={(event) => {
                event.stopPropagation();
                props.onClick && props.onClick(event);
            }}
        >
            {props.children({ isActive: uid === activeItemId })}
        </li>
    );
};

export default Item;
