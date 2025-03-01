import { useEffect, useReducer, useState } from 'react';
import boardData from '../assets/data/boardData.json'
import { GameConfiguration, PlacementEntry, SpaceState } from './Types';
import { galaxyReducer } from '../galaxy/Galaxy.reducer';
import './Board.scss';
import { GalaxyDisplay } from './GalaxyDisplay';
import { Handbar } from '../Handbar/Handbar';
import _ from 'lodash';

type GalaxyProps = {
    gameConfiguration: GameConfiguration
}

function Galaxy({ gameConfiguration }: GalaxyProps) {
    const {
        factions,
        mapType,
    } = gameConfiguration

    // index of the local user
    const userId = "0"

    const [state, dispatch] = useReducer(galaxyReducer, {
        gameConfiguration,
        initialBoard: undefined,
        placements: [],
        initialHandTileIds: [["1", "2", "3", "4", "5", "6", "7", "8"]],
        currentPlacement: undefined
    });
    const [selectedTile, setSelectedTile] = useState<number | undefined>(undefined)

    useEffect(() => {
        const boards: any = boardData.styles
        const map = boards?.[factions.length]?.[mapType] as any

        dispatch({ type: "INIT", payload: { factions, map }})
    }, [])

    if ( !state.initialBoard ) {
        return null
    }

    function buildSpaceMap(initialSpaceMap: Map<string, SpaceState>, placements: PlacementEntry[]): Map<string, SpaceState> {
        const spaceMap = _.cloneDeep(initialSpaceMap)
        placements.forEach(placement => {
            let spaceState = spaceMap.get(placement.coordinates)
            if (!spaceState) {
                return
            }
            spaceState.source = placement.tileId
            spaceMap.set(placement.coordinates, spaceState)
        })
        return spaceMap
    }
    const spaceMap: Map<string, SpaceState> = buildSpaceMap(state.initialBoard.spaceMap, state.placements)

    function buildHandTileIds(initialHandTileIds: string[][], placements: PlacementEntry[]): string[][] {
        const handTileIds = _.cloneDeep(initialHandTileIds)
        placements.forEach(placement => {
            const userHandTileIds = handTileIds[+placement.user]
            const index: number = userHandTileIds.indexOf(placement.tileId)
            if (index < 0) {
                console.log("Error finding hand tile in placement")
                return
            }
            userHandTileIds.splice(userHandTileIds.indexOf(placement.tileId), 1)
        })
        return handTileIds
    }
    const handTileIds = buildHandTileIds(state.initialHandTileIds, state.placements)


    const onTileClicked = (space: SpaceState) => {
        if (selectedTile === undefined) {
            return
        }
        dispatch({
            type: "PLACE_TILE",
            payload: {
                user: "0",
                coordinates: space.coordinates.toString(),
                tileId: handTileIds[userId][selectedTile]
        }})
        setSelectedTile(undefined)
    }

    return (
        <div style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#757575"
        }}>
        <GalaxyDisplay
            initialBoard={state.initialBoard}
            spaceMap={spaceMap}
            onTileClicked={onTileClicked}/>
        <Handbar tileIds={handTileIds[userId]} selectedTile={selectedTile} setSelectedTile={setSelectedTile}/>
        </div>
    )
}

export { Galaxy }
