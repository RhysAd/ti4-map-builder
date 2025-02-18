import { useState } from 'react';
import { TileDisplay } from '../galaxy/TileDisplay';
import './Handbar.scss';

export type HandBarProps = {
  tileIds: string[]
  selectedTile: number | undefined
  setSelectedTile: (value: number | undefined) => void
}

export function Handbar(props: HandBarProps) {
  const {
    tileIds,
    selectedTile,
    setSelectedTile
  } = props;

  return (
    <div className={"handbar"}>
      {tileIds.map((tileId, i) => (
        <div className="hand-tile" key={i} onClick={() => setSelectedTile(i)}>
          <TileDisplay
            tileId={tileId}
            rotation={0}
            className={selectedTile === i ? "outlined" : undefined}
          />
        </div>
      ))}
    </div>
  )
}