import { InitialBoard, InitPayload, SpaceState } from "../Types";
import { Hex, HexUtils } from "../../hex";
import raceData from "../../assets/data/raceData.json"

const MECATOL_REX_TILE = "18"
const EMPTY_TILE = "0"

function init({ map: { home_worlds, hyperlane_tiles, primary_tiles, secondary_tiles, tertiary_tiles, quaternary_tiles }, factions }: InitPayload ): InitialBoard {

    let spaceMap = new Map<string, SpaceState>()

    spaceMap.set(new Hex(0, 0).toString(), {
        position: 0,
        source: MECATOL_REX_TILE,
        coordinates: new Hex(0, 0),
        rotate: 0
    })

    function addEmptyTile (position: number) {
        let hex = HexUtils.getHexFromPosition(position)
        spaceMap.set(hex.toString(), {
            position: position,
            source: EMPTY_TILE,
            coordinates: hex,
            rotate: 0
        })
    }
    primary_tiles.forEach(addEmptyTile)
    secondary_tiles.forEach(addEmptyTile)
    tertiary_tiles.forEach(addEmptyTile)
    quaternary_tiles.forEach(addEmptyTile)
    
    hyperlane_tiles.forEach((tile: [number, string, number]) => {
        let hex = HexUtils.getHexFromPosition(tile[0])
        spaceMap.set(hex.toString(), {
            position: tile[0],
            source: tile[1],
            coordinates: hex,
            rotate: tile[2] * 60
        })
    })

    home_worlds.forEach((position: number, i: number) => {
        const faction = factions[i]
        const system = raceData.raceToHomeSystemMap[faction]

        let hex = HexUtils.getHexFromPosition(position)
        spaceMap.set(hex.toString(), {
            position: position,
            source: `${system}`,
            coordinates: hex,
            rotate: 0
        })
    })

    const homeTiles = home_worlds.map(position => HexUtils.getHexFromPosition(position))
    const primaryTiles = primary_tiles.map(position => HexUtils.getHexFromPosition(position))
    const secondaryTiles = secondary_tiles.map(position => HexUtils.getHexFromPosition(position))
    const tertiaryTiles = tertiary_tiles.map(position => HexUtils.getHexFromPosition(position))
    const quaternaryTiles = quaternary_tiles.map(position => HexUtils.getHexFromPosition(position))

    return {
        homeTiles,
        primaryTiles,
        secondaryTiles,
        tertiaryTiles,
        quaternaryTiles,
        spaceMap,
    }
}

export { init }