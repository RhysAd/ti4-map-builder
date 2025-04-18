import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../login/AuthProvider';
import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../Firebase";
import { CircularProgress}  from '@mui/material';
import { GameConfiguration, MapType, TilePlacement } from '../domain/Game';
import { Galaxy } from './Galaxy';
import { Faction } from './Types';

export function GalaxyContainer() {
    const [gameConfiguration, setGameConfiguration] = useState<GameConfiguration | undefined>(undefined)
    const [tilePlacements, setTilePlacements] = useState<TilePlacement[] | undefined>(undefined)
    const auth = useContext(AuthContext)

    useEffect(() => {
        if (!auth.user) {
            return
        }
        const gamesUnsub = onSnapshot(doc(collection(db, "games"), auth.user!.uid), (doc) => {
            const data: any = doc.data()
            if (data === undefined) {
                // we should not be finding an undefined game config here
                // TODO: do something like return to dashboard
                setGameConfiguration(undefined)
                return
            }
            // TODO: if we ever update GameConfiguration model this will cause issues if there is stale data
            setGameConfiguration(data)
        })
    
        const placementsUnsub = onSnapshot(doc(collection(db, "placements"), auth.user!.uid), (doc) => {
            const data: any = doc.data()
            if (!data?.placements) {
                // no placements have been made yet
                setTilePlacements([])
                return
            }
            // TODO: if we ever update TilePlacement model this will cause issues if there is stale data
            const placements = JSON.parse(data.placements)
            setTilePlacements(placements as TilePlacement[])
        })

        return () => {
            gamesUnsub()
            placementsUnsub()
        }
    }, [auth])

    const postTilePlacement = async (placement: TilePlacement) => {
        if (!auth.user) {
            return
            // TODO: do something here like return to logout page
        }

        try {
            const docRef = await setDoc(doc(collection(db, "placements"), auth.user.uid), {placements: JSON.stringify([...(tilePlacements || []), placement])});
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    if (!gameConfiguration || !tilePlacements) {
        return <CircularProgress />
    }

    return (
        <Galaxy
            gameConfiguration={{
                factions: gameConfiguration.factions as Faction[],
                mapType: gameConfiguration.mapType === MapType.Hyperlanes ? "warp" : "normal"
            }}
            tilePlacements={tilePlacements}
            placeTile={postTilePlacement}
        />
    )
}