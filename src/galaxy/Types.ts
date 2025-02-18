import { raceToHomeSystemMap } from "../assets/data/raceData.json"
import { Hex } from "../hex"

/**
 * 
 * "space" is the place in the map
 */
type SpaceState = {
    position: number
    source: string
    coordinates: Hex,
    rotate: number
}
  
type BoardMap = {
    homeTiles: Hex[]
    primaryTiles: Hex[],
    secondaryTiles: Hex[],
    tertiaryTiles: Hex[],
    quaternaryTiles: Hex[],
    spaceMap: Map<string, SpaceState>
}

type Faction = keyof typeof raceToHomeSystemMap

type State = {
  boardMap?: BoardMap,
}

type Action =
| {
  type: "INIT"
  payload: InitPayload
}
| {
  type: "PLACE_TILE"
  payload: PlaceTilePayload
}

type InitPayload = {
  map: {
    description: string
    source: string
    home_worlds: number[]
    primary_tiles: number[]
    secondary_tiles: number[]
    tertiary_tiles: number[]
    quaternary_tiles: number[]
    hyperlane_tiles: [number, string, number][]
  },
  factions: Faction[]
}

type PlaceTilePayload = {
  coordinates: Hex,
  tileId: string
}

export { BoardMap, SpaceState, Action, State, InitPayload, PlaceTilePayload, Faction }