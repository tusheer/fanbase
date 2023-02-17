import React, { ReactElement } from 'react';
import { IDropdownContext, useDropdownContext } from './index';

interface IButtonProps {
    children: ({ toggle, open }: IDropdownContext) => ReactElement;
}

const Button: React.FC<IButtonProps> = (props) => {
    const { open, toggle }: IDropdownContext = useDropdownContext();

    return props.children({ toggle, open });
};

export default Button;
