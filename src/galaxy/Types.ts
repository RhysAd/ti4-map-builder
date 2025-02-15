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
    spaceMap: Map<Hex, SpaceState>
}

type Faction = keyof typeof raceToHomeSystemMap

type State = {
  boardMap?: BoardMap,
}

type InitAction = {
  map: {
    description: string
    source: string
    home_worlds: number[]
    primary_tiles: number[]
    secondary_tiles: number[]
    tertiary_tiles: number[]
    hyperlane_tiles: [number, string, number][]
  },
  factions: Faction[]
}


type Action = {
  type: "INIT"
  data: InitAction
}
  
export { BoardMap, SpaceState, InitAction, Action, State, Faction }