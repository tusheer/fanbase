import { ComponentStory } from '@storybook/react';
import { TextInput } from './index';

export default {
    title: 'Textinput',
    component: TextInput,
};

const Template: ComponentStory<typeof TextInput> = (args) => <TextInput {...args} />;

export const Default = Template.bind({});

Default.args = {
    label: 'First name',
    error: false,
};

export const Error = Template.bind({});

Error.args = {
    label: 'First name',
    error: true,
    errorText: 'Something is wrong',
};

export const TextArea = Template.bind({});
TextArea.args = {
    label: 'First name',
    textArea: true,
};
