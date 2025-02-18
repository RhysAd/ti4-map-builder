import { useEffect, useReducer, useState } from 'react';
import boardData from '../assets/data/boardData.json'
import { Faction, SpaceState } from './Types';
import { galaxyReducer } from '../galaxy/Galaxy.reducer';
import './Board.scss';
import { GalaxyDisplay } from './GalaxyDisplay';
import { Handbar } from '../Handbar/Handbar';

type GalaxyProps = {
    factions: Faction[];
    mapType: string  
}

function Galaxy({ factions, mapType }: GalaxyProps) {

    // is it better to use "useImmerReducer" ? 
    const [state, update] = useReducer(galaxyReducer, {});
    const [handTileIds, setHandTileIds] = useState([
        "1", "2", "3", "4", "5", "6", "7", "8"
    ])
    const [selectedTile, setSelectedTile] = useState<number | undefined>(undefined)

    useEffect(() => {
        const boards: any = boardData.styles
        const map = boards?.[factions.length]?.[mapType] as any

        update({ type: "INIT", payload: { factions, map }})
    }, []) 

    const onTileClicked = (space: SpaceState) => {
        if (selectedTile === undefined) {
            return
        }
        update({type: "PLACE_TILE", payload: {
            coordinates: space.coordinates,
            tileId: handTileIds[selectedTile]
        }})
        handTileIds.splice(selectedTile, 1)
        setHandTileIds(handTileIds)
        setSelectedTile(undefined)
    }

    if ( !state.boardMap ) {
        return null
    }

    return (
        <>
        <GalaxyDisplay
            boardMap={state.boardMap}
            onTileClicked={onTileClicked}/>
        <Handbar tileIds={handTileIds} selectedTile={selectedTile} setSelectedTile={setSelectedTile}/>
        </>
    )
}

export { Galaxy }
