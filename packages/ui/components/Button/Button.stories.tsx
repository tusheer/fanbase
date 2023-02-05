import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Button } from './index';

export default {
    title: 'Button',
    component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args}>Button</Button>;

export const Default = Template.bind({});
Default.args = {};

export const Small = Template.bind({});
Default.args = {
    size: 'sm',
};

export const Error = Template.bind({});
Default.args = {
    intend: 'error',
};
