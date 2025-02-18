import { TileDisplay } from '../galaxy/TileDisplay';
import './Handbar.scss';

export type HandBarProps = {
  tileIds: string[]
}

export function Handbar(props: HandBarProps) {
  const {
    tileIds
  } = props;

  return (
    <div className={"handbar"}>
      {tileIds.map((tileId, i) => (
        <div className="hand-tile" key={i}>
          <TileDisplay
            tileId={tileId}
            rotation={0}
          />
        </div>
      ))}
    </div>
  )
}