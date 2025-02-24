import type { Meta, StoryObj } from '@storybook/react';
import { Login } from '../login/Login';

const meta = {
  title: 'Components/Login',
  component: Login,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {

  },
} satisfies Meta<typeof Login>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NotSignedIn: Story = {
  args: {},
};
