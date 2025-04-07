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

export { MapType, GameConfiguration }