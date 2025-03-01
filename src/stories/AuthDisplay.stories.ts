import type { Meta, StoryObj } from '@storybook/react';
import { AuthDisplay } from '../login/AuthDisplay';

const meta = {
  title: 'Components/AuthDisplay',
  component: AuthDisplay,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {

  },
} satisfies Meta<typeof AuthDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NotSignedIn: Story = {
  args: {},
};
