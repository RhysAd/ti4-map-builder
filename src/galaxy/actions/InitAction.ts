import _ from 'lodash'

import { BoardMap } from "../Types";
import { Hex, HexUtils } from "../../hex";
import { InitAction } from "../Types";

import raceData from "../../assets/data/raceData.json"

const MECATOL_REX_TILE = "18"
const EMPTY_TILE = "0"

const DIRECTIONS = [
    new Hex(1, 0, -1),
    new Hex(1, -1, 0),
    new Hex(0, -1, 1),
    new Hex(-1, 0, 1),
    new Hex(-1, 1, 0),
    new Hex(0, 1, -1),
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


function init({  rings, map: { home_worlds, hyperlane_tiles, primary_tiles, secondary_tiles, tertiary_tiles }, factions }: InitAction ): BoardMap {
    const centre = new Hex(0, 0, 0)

  
    const spiral = _.range(1, rings + 1).reduce((accum, radius: number) =>  
        [...accum, ...ring({ centre, radius })], 
        [centre]
    )

    function addCoordinates<T extends { position: number }>(props: T) {
        const { position } = props;
        const { q, r, s } = spiral[position]
        return {
            ...props,
            coordinates: { q, r, s } 
        }
    }

    const homes = home_worlds.map((position, i) => {
        const faction = factions[i]
        const system = raceData.raceToHomeSystemMap[faction]
        return {
            position,
            source: `${system}`,
            rotate: 0
        }
    }).map(addCoordinates)

    const hyperlanes = hyperlane_tiles.map(([position, source, rotate]) => {
        return {
            position,
            source,
            rotate: rotate * 60
        }
    }).map(addCoordinates)
    
    const ringsStates = [primary_tiles, secondary_tiles, tertiary_tiles].map((ring) => {
        return ring.map((position) => {
            return {
                position,
                source: EMPTY_TILE,
                rotate: 0
            }
        }).map(addCoordinates)
    })

    // const factionsSystems = factions.map((faction) => {
    //     return raceData.raceToHomeSystemMap[faction]
    // })
    // const normalTiles = [ MECATOL_REX_TILE, EMPTY_TILE, ...home_worlds, ...factionsSystems].map((source) => ({ source: `${source}` }))
    // const hyperlaneTiles = hyperlane_tiles.map(([, source, rotate]) => ({ source, rotate: rotate * 60 }))

    return {
        homes,
        hyperlanes,
        rings: ringsStates,
    }
}

export { init }