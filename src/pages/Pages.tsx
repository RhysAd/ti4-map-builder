import { useContext, useEffect, useState } from 'react';
import { AuthDisplay } from '../login/AuthDisplay';
import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Dashboard } from '../dashboard/Dashboard';
import { AuthContext } from '../login/AuthProvider';
import { Galaxy } from '../galaxy/Galaxy';
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../Firebase";
import CircularProgress from '@mui/material/CircularProgress';
import { GameConfiguration, MapType } from '../domain/Game';
import { Faction } from '../galaxy/Types';

export function Pages() {
    const [route, setRoute] = useState("dashboard")
    const [gameConfiguration, setGameConfiguration] = useState<GameConfiguration | undefined>(undefined)
    const [isLoading, setIsLoading] = useState(true)

    const auth = useContext(AuthContext)

    useEffect(() => {
        if (!auth.user) {
            return
        }
        const unsub = onSnapshot(doc(collection(db, "games"), auth.user!.uid), (doc) => {
            setIsLoading(false)
            const data: any = doc.data()
            if (data === undefined) {
                setGameConfiguration(undefined)
                return
            }
            setGameConfiguration(data)
        })
        return () => unsub()
    }, [auth])

    function RouteRenderer(props: {path: string}) {
        switch(props.path) {
            case "galaxy":
                return (
                    isLoading || !gameConfiguration ?
                    <CircularProgress /> :
                    <Galaxy
                        gameConfiguration={{
                            factions: gameConfiguration.factions as Faction[],
                            mapType: gameConfiguration.mapType === MapType.Hyperlanes ? "warp" : "normal"
                    }}/>)
            default:
                return (
                    <Dashboard onOpenGame={setRoute}/>
                )
        }
    }

    if (auth.loading) {
        return (
            <div />
        )
    }

    return (
        auth.user ?
        <>
            <AppBar>
            <Toolbar>
                <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                >
                <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Map Builder
                </Typography>
                <Button color="inherit" onClick={() => auth.signOut()}>Logout</Button>
            </Toolbar>
            </AppBar>
            <Toolbar />
            <RouteRenderer path={route} />
        </> :
        <AuthDisplay />
    )        
}