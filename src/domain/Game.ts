enum MapType {
    Normal,
    Hyperlanes
}

type GameConfiguration = {
    mapType: MapType
    pok: boolean
    playerCount: number
    factions: string[]
}

type TilePlacement = {
    factionIndex: number
    tileId: string
    hex: string
}

export { MapType, GameConfiguration, TilePlacement }