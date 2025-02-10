import { useEffect, useReducer } from 'react';
import boardData from '../assets/data/boardData.json'
import { Faction } from './Types';
import { galaxyReducer } from '../galaxy/Galaxy.reducer';

import './Board.scss';
import { GalaxyDisplay } from './GalaxyDisplay';

type GalaxyProps = {
    factions: Faction[];
    mapType: string  
}

function Galaxy({ factions, mapType }: GalaxyProps) {

    // is it better to use "useImmerReducer" ? 
    const [state, update] = useReducer(galaxyReducer, {});

    useEffect(() => {
        const boards: any = boardData.styles
        const map = boards?.[factions.length]?.[mapType] as any

        // is it always 5 rings?
        update({ type: "INIT", data: {  rings: 5, factions, map }})
    }, []) 

    if ( !state.boardMap ) {
        return null
    }

    return (
        <GalaxyDisplay {...state.boardMap} />
    )
}

export { Galaxy }
