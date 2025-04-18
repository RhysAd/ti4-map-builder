import { useEffect, useReducer, useState } from 'react';
import boardData from '../assets/data/boardData.json'
import { GameConfiguration, SpaceState } from './Types';
import { galaxyReducer } from '../galaxy/Galaxy.reducer';
import './Board.scss';
import { GalaxyDisplay } from './GalaxyDisplay';
import { Handbar } from './components/Handbar';
import _ from 'lodash';
import { SideMenu } from './components/SideMenu';
import { Box } from '@mui/material';
import { TilePlacement } from '../domain/Game';

type GalaxyProps = {
    gameConfiguration: GameConfiguration
    tilePlacements: TilePlacement[]
    placeTile: (placement: TilePlacement) => void
}

function Galaxy({ gameConfiguration, tilePlacements, placeTile }: GalaxyProps) {
    const {
        factions,
        mapType,
    } = gameConfiguration

    // index of the local user
    const userId = 0

    const [state, dispatch] = useReducer(galaxyReducer, {
        gameConfiguration,
        initialBoard: undefined,
        initialHandTileIds: [["1", "2", "3", "4", "5", "6", "7", "8"]],
        currentPlacement: undefined
    });
    const [selectedTile, setSelectedTile] = useState<number | undefined>(undefined)

    useEffect(() => {
        const boards: any = boardData.styles
        const map = boards?.[factions.length]?.[mapType] as any

        dispatch({ type: "INIT", payload: { factions, map }})
    }, [gameConfiguration])

    if ( !state.initialBoard ) {
        return null
    }

    function buildSpaceMap(initialSpaceMap: Map<string, SpaceState>, placements: TilePlacement[]): Map<string, SpaceState> {
        const spaceMap = _.cloneDeep(initialSpaceMap)
        placements.forEach(placement => {
            let spaceState = spaceMap.get(placement.hex)
            if (!spaceState) {
                return
            }
            spaceState.source = placement.tileId
            spaceMap.set(placement.hex, spaceState)
        })
        return spaceMap
    }
    const spaceMap: Map<string, SpaceState> = buildSpaceMap(state.initialBoard.spaceMap, [...tilePlacements, ...(state.currentPlacement ? [state.currentPlacement] : [])])

    function buildHandTileIds(initialHandTileIds: string[][], placements: TilePlacement[]): string[][] {
        const handTileIds = _.cloneDeep(initialHandTileIds)
        placements.forEach(placement => {
            const userHandTileIds = handTileIds[placement.factionIndex]
            const index: number = userHandTileIds.indexOf(placement.tileId)
            if (index < 0) {
                console.log("Error finding hand tile in placement")
                return
            }
            userHandTileIds.splice(userHandTileIds.indexOf(placement.tileId), 1)
        })
        return handTileIds
    }
    const handTileIds = buildHandTileIds(state.initialHandTileIds, [...tilePlacements, ...(state.currentPlacement ? [state.currentPlacement] : [])])

    const onTileClicked = (space: SpaceState) => {
        if (selectedTile === undefined) {
            return
        }
        dispatch({
            type: "PLACE_TILE",
            payload: {
                factionIndex: 0,
                tileId: handTileIds[userId][selectedTile],
                hex: space.coordinates.toString()
        }})
        placeTile({
            factionIndex: userId,
            tileId: handTileIds[userId][selectedTile],
            hex: space.coordinates.toString()
        })
        setSelectedTile(undefined)
    }

    return (
        <Box sx={{ display: 'flex', height: "100%" }}>
            <SideMenu tilePlacements={tilePlacements}/>
            <Box sx={{
                height: "100%",
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#757575",
                overflow: "auto"
            }}>
            <GalaxyDisplay
                initialBoard={state.initialBoard}
                spaceMap={spaceMap}
                onTileClicked={onTileClicked}/>
            <Handbar tileIds={handTileIds[userId]} selectedTile={selectedTile} setSelectedTile={setSelectedTile}/>
            </Box>
        </Box>
    )
}

export { Galaxy }
