import { raceToHomeSystemMap } from "../assets/data/raceData.json"
import { TilePlacement } from "../domain/Game"
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
  
type InitialBoard = {
    homeTiles: Hex[]
    primaryTiles: Hex[]
    secondaryTiles: Hex[]
    tertiaryTiles: Hex[]
    quaternaryTiles: Hex[]
    spaceMap: Map<string, SpaceState>
}

type Faction = keyof typeof raceToHomeSystemMap

type GameConfiguration = {
  factions: Faction[]
  mapType: string
}

type State = {
  gameConfiguration: GameConfiguration
  initialBoard: InitialBoard | undefined
  initialHandTileIds: string[][]
  currentPlacement: TilePlacement | undefined
}

type Action =
| {
  type: "INIT"
  payload: InitPayload
}
| {
  type: "PLACE_TILE"
  payload: TilePlacement
}
| {
  type: "UNDO_PLACEMENT"
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

export { InitialBoard, SpaceState, Action, State, GameConfiguration, InitPayload, Faction }