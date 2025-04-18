import type { Meta, StoryObj } from '@storybook/react';
import { Galaxy } from '../galaxy/Galaxy';

const meta = {
  title: 'Components/Galaxy',
  component: Galaxy,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {

  },
} satisfies Meta<typeof Galaxy>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EightPlayersWarp: Story = {
  args: {
    gameConfiguration: {
      factions: [
        "The Arborec",
        "The Barony of Letnev",
        "The Clan of Saar",
        "The Embers of Muaat" ,
        "The Emirates of Hacan", 
        "The Federation of Sol",
        "The Ghosts of Creuss",
        "Sardakk N'orr"
      ],
      mapType: "warp"
    },
    tilePlacements: [],
    placeTile: (placement) => {}
  },};
