import { Hex, Hexagon } from '../hex';
import { TileDisplay } from './TileDisplay';
import { SpaceState, BoardMap } from './Types';


function Spaces({spaces}: { spaces: Map<Hex, SpaceState> }) {
    
    return <>
        {Array.from(spaces.entries()).map(([hex, spaceState], i) => {
        return (
        <Hexagon key={spaceState.position} q={hex.q} r={hex.r} s={hex.s}>
            <div>
                <TileDisplay
                    tileId={spaceState.source}
                    rotation={spaceState.rotate || 0}/>
                    <div style={{position: "absolute", left: "calc(50% - 15px)", top: "30%", width:"30px", color: "white", textAlign: "center"}}>
                        {spaceState.position}
                    </div>
            </div>
        </Hexagon>
    )})}
    </>
}

export { Spaces }
