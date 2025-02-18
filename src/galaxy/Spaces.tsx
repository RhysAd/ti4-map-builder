import { Hexagon } from '../hex';
import { TileDisplay } from './TileDisplay';
import { SpaceState, BoardMap } from './Types';


function Spaces({spaces}: { spaces: SpaceState[] }) {
    const elements = spaces.map((space) => {
        const {
            position,
            source,
            coordinates: { q, r, s},
            rotate
          } = space
        return (
        <Hexagon key={position} q={q} r={r} s={s}>
            <TileDisplay
                tileId={source}
                rotation={rotate || 0}/>
        </Hexagon>
    )})
    return <>
        {elements}
    </>
}

export { Spaces }
