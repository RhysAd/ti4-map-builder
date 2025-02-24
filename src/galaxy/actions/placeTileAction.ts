import { InitialBoard, PlacementEntry, State } from "../Types";

function placeTile(placements: PlacementEntry[], {user, coordinates, tileId }: PlacementEntry): PlacementEntry[] {
    placements.push({
        user: user,
        coordinates: coordinates,
        tileId: tileId
    })
    return placements
}

export { placeTile }