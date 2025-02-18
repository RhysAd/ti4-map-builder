import { BoardMap, PlaceTilePayload } from "../Types";

function placeTile(boardMap: BoardMap | undefined, { coordinates, tileId }: PlaceTilePayload): BoardMap | undefined {
    if (boardMap === undefined) {
        return boardMap
    }

    let spaceState = boardMap.spaceMap.get(coordinates.toString())
    if (spaceState === undefined) {
        return boardMap
    }

    spaceState.source = tileId
    boardMap.spaceMap.set(coordinates.toString(), spaceState)

    return boardMap
}

export { placeTile }