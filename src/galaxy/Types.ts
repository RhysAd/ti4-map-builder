import { raceToHomeSystemMap } from "../assets/data/raceData.json"

/**
 * 
 * "space" is the place in the map
 */
type SpaceState = {
    position: number
    source: string
    coordinates: {
        q: number
        r: number
        s: number
    },
    rotate: number
}
  
type BoardMap = {
    homes: SpaceState[]
    hyperlanes: SpaceState[]
    rings: SpaceState[][]
}

type Faction = keyof typeof raceToHomeSystemMap

type State = {
  boardMap?: BoardMap,
}

type InitAction = {
  rings: number
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