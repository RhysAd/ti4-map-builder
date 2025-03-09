import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../login/AuthProvider';
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../Firebase";
import { CircularProgress}  from '@mui/material';
import { GameConfiguration, MapType } from '../domain/Game';
import { Galaxy } from './Galaxy';
import { Faction } from './Types';


export function GalaxyContainer() {
    const [gameConfiguration, setGameConfiguration] = useState<GameConfiguration | undefined>(undefined)
    const [isLoading, setIsLoading] = useState(true)
    const auth = useContext(AuthContext)

    useEffect(() => {
        if (!auth.user) {
            return
        }
        const unsub = onSnapshot(doc(collection(db, "games"), auth.user!.uid), (doc) => {
            const data: any = doc.data()
            if (data === undefined) {
                setIsLoading(false)
                setGameConfiguration(undefined)
                return
            }
            // TODO: if we ever update GameConfiguration model this will cause issues if there is stale data
            setIsLoading(false)
            setGameConfiguration(data)
        })
        return () => unsub()
    }, [auth])

    if (isLoading) {
        return <CircularProgress />
    }

    if (gameConfiguration === undefined) {
        console.error("Failed to load game configuration")
        //TODO: do something here
        return <CircularProgress />
    }

    return (
        <Galaxy
            gameConfiguration={{
                factions: gameConfiguration.factions as Faction[],
                mapType: gameConfiguration.mapType === MapType.Hyperlanes ? "warp" : "normal"
        }}/>
    )
}