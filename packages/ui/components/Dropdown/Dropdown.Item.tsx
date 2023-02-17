import React, { ReactElement, useId } from 'react';
import { IDropdownContext, useDropdownContext } from './index';

export interface IItemProps {
    children: ({ isActive }: { isActive: boolean }) => ReactElement;
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
        >
            {props.children({ isActive: uid === activeItemId })};
        </li>
    );
};

export default Item;
