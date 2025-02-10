import { Hexagon } from '../hex';
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
        <Hexagon key={position} q={q} r={r} s={s} rotate={rotate || 0} fill={source} />
    )})
    return <>
        {elements}
    </>
}

export { Spaces }
