import { InitialBoard, InitPayload, SpaceState } from "../Types";
import { Hex, HexUtils } from "../../hex";

import _ from 'lodash';
import raceData from "../../assets/data/raceData.json"

const MECATOL_REX_TILE = "18"
const EMPTY_TILE = "0"

function init({ map: { home_worlds, hyperlane_tiles, primary_tiles, secondary_tiles, tertiary_tiles, quaternary_tiles }, factions }: InitPayload ): InitialBoard {
    const mecatol = {
        position: 0,
        source: MECATOL_REX_TILE,
        rotate: 0
    }
    

    const rings = [primary_tiles, secondary_tiles, secondary_tiles, tertiary_tiles, quaternary_tiles]
        .flatMap<number>(_.identity)
        .map((position) => {
            return {
                position: position,
                source: EMPTY_TILE,
                rotate: 0
            }
        })

    
    const hyperLane = hyperlane_tiles.map((tile: [number, string, number]) => {
        return {
            position: tile[0],
            source: tile[1],
            rotate: tile[2] * 60
        }
    })

    const homeWorlds = home_worlds.map((position: number, i: number) => {
        const faction = factions[i]
        const system = raceData.raceToHomeSystemMap[faction]

        return {
            position: position,
            source: `${system}`,
            rotate: 0
        }
    })

    const allTiles = [mecatol, ...rings, ...hyperLane, ...homeWorlds].map((value) => {
        const { position } = value;
        const hex = HexUtils.getHexFromPosition(position)
        return <[string, SpaceState]>[
            hex.toString(),
            {
                ...value,
                coordinates: hex
            }
        ]
    })

    const spaceMap = new Map<string, SpaceState>(allTiles)



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