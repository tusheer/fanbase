import { ComponentStory } from '@storybook/react';
import { Modal } from './index';

export default {
    title: 'Modal',
    component: Modal,
};

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args}></Modal>;

export const Default = Template.bind({});

Default.args = {
    className: 'max-w-3xl',
    open: true,

    onClose: () => console.log('ehee'),
    children: <div>Hello THis is new</div>,
};
