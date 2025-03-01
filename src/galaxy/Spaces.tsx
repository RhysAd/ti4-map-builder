import { ReactElement } from 'react';
import { Hex, Hexagon, HexUtils } from '../hex';
import { TileDisplay } from './TileDisplay';
import { SpaceState, BoardMap } from './Types';

function Spaces({boardMap, onTileClicked}: { boardMap: BoardMap, onTileClicked: (space: SpaceState) => void }) {
    const {
        homeTiles,
        primaryTiles,
        secondaryTiles,
        tertiaryTiles,
        quaternaryTiles,
        spaceMap,
    } = boardMap

    const placementTiles = new Map<string, SpaceState>()
    const nonPlacementTiles = new Map<string, SpaceState>(spaceMap)
    if (tertiaryTiles.every(hex => spaceMap.get(hex.toString())?.source !== "0")) {
        quaternaryTiles.forEach(hex => {
            placementTiles.set(hex.toString(), spaceMap.get(hex.toString())!)
            nonPlacementTiles.delete(hex.toString())
        })
    }
    else if (secondaryTiles.every(hex => spaceMap.get(hex.toString())?.source !== "0")) {
        tertiaryTiles.forEach(hex => {
            placementTiles.set(hex.toString(), spaceMap.get(hex.toString())!)
            nonPlacementTiles.delete(hex.toString())
        })
    }
    else if (primaryTiles.every(hex => spaceMap.get(hex.toString())?.source !== "0")) {
        secondaryTiles.forEach(hex => {
            placementTiles.set(hex.toString(), spaceMap.get(hex.toString())!)
            nonPlacementTiles.delete(hex.toString())
        })
    }
    else {
        primaryTiles.forEach(hex => {
            placementTiles.set(hex.toString(), spaceMap.get(hex.toString())!)
            nonPlacementTiles.delete(hex.toString())
        })
    }


    function HexagonDisplay(hex: Hex, spaceState: SpaceState, isPlacement: boolean): ReactElement {
        isPlacement = isPlacement && spaceState.source === "0"
        let className = isPlacement && spaceState.source === "0" ? "outlined" : undefined

        return (
            <Hexagon key={spaceState.position} q={hex.q} r={hex.r} s={hex.s} className={className}>
                <div onClick={isPlacement ? () => onTileClicked(spaceState) : undefined}>
                    <TileDisplay
                        tileId={spaceState.source}
                        rotation={spaceState.rotate || 0}
                        className={className}/>
                        {/* This displays the position number and coordinated of the tile for debugging */}
                        {/* <div style={{position: "absolute", left: "calc(50% - 30px)", top: "30%", width:"60px", color: "white", textAlign: "center", pointerEvents: "none"}}>
                            {spaceState.position}<br/>
                            {spaceState.coordinates.toString()}
                        </div> */}
                </div>
            </Hexagon>
        )
    }
    
    return <>
        {Array.from(placementTiles.entries()).map(([hex, spaceState], i) => (
            HexagonDisplay(HexUtils.getHexFromId(hex), spaceState, true)
        ))}
        {Array.from(nonPlacementTiles.entries()).map(([hex, spaceState], i) => (
            HexagonDisplay(HexUtils.getHexFromId(hex), spaceState, false)
        ))}
    </>
}

export { Spaces }
