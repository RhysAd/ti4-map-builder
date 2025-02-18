import type { Meta, StoryObj } from '@storybook/react';
import { Handbar } from '../Handbar/Handbar';

const meta = {
  title: 'Components/Handbar',
  component: Handbar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {

  },
} satisfies Meta<typeof Handbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Tiles8: Story = {
  args: {
    tileIds: [
      "1",
      "2",
      "3",
      "4" ,
      "5", 
      "6",
      "7",
      "8"
    ]
  }
};
