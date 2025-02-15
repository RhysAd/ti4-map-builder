import _ from 'lodash'

import { BoardMap, SpaceState } from "../Types";
import { Hex, HexUtils } from "../../hex";
import { InitAction } from "../Types";

import raceData from "../../assets/data/raceData.json"

const MECATOL_REX_TILE = "18"
const EMPTY_TILE = "0"

const DIRECTIONS = [
    new Hex(1, 0),
    new Hex(1, -1),
    new Hex(0, -1),
    new Hex(-1, 0),
    new Hex(-1, 1),
    new Hex(0, 1),
]

function changeOrder<T>({ arr, start=1, desc = true }: { arr: T[], start?: number, desc?: boolean }) {
    // start: where does the spiral starts
    // desc: how the spiral spin?
    const s = start % arr.length
    const a = [
        ..._.takeRight(arr, (arr.length - s)),
        ..._.take(arr, s)
    ]

    return desc? _.reverse([...a]) : a
}


function ring({ centre, radius }: { centre: Hex, radius: number }): Hex[] {
 
    const directions = changeOrder({ arr: DIRECTIONS })

    const hex = HexUtils.add(
        centre,
        HexUtils.multiply(directions[4], radius ),
    )

    const aaa = directions.flatMap((direction) => _.range(0, radius).map(() => direction))
    const { list } = aaa.reduce(({ hex, list }, direction) => {
        const hex_new =  HexUtils.add(hex, direction)
        return { hex: hex_new, list: [...list, hex] }
    }, { hex, list: [hex] })

    const [, ...l] = list

    return l
}


function init({ map: { home_worlds, hyperlane_tiles, primary_tiles, secondary_tiles, tertiary_tiles }, factions }: InitAction ): BoardMap {

    let spaceMap = new Map<Hex, SpaceState>()

    spaceMap.set(new Hex(0, 0), {
        position: 0,
        source: MECATOL_REX_TILE,
        coordinates: new Hex(0, 0),
        rotate: 0
    })


    function addEmptyTile (position: number) {
        let hex = HexUtils.getHexFromPosition(position)
        spaceMap.set(hex, {
                position: position,
                source: EMPTY_TILE,
                coordinates: hex,
                rotate: 0
            })
    }
    primary_tiles.forEach(addEmptyTile)
    secondary_tiles.forEach(addEmptyTile)
    tertiary_tiles.forEach(addEmptyTile)
    
    hyperlane_tiles.forEach((tile: [number, string, number]) => {
        let hex = HexUtils.getHexFromPosition(tile[0])
        spaceMap.set(hex, {
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
        spaceMap.set(hex, {
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

    return {
        homeTiles,
        primaryTiles,
        secondaryTiles,
        tertiaryTiles,
        spaceMap,
    }
}

export { init }