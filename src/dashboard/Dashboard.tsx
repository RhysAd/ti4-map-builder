import { Container, Divider, Stack, Typography } from "@mui/material";
import { GameCard } from "./components/GameCard";
import { CreateGameCard } from "./components/CreateGameCard";
import { setDoc, collection, doc, onSnapshot, deleteDoc } from "firebase/firestore"; 
import { useContext, useEffect, useState } from "react";
import { db } from "../Firebase";
import { AuthContext } from "../login/AuthProvider";
import CircularProgress from '@mui/material/CircularProgress';
import { GameConfiguration, MapType } from "../domain/Game";


type DashboardProps = {
    onOpenGame: (id: string) => void
}

function Dashboard(props: DashboardProps) {
    const {
        onOpenGame,
    } = props

    const auth = useContext(AuthContext)
    const [gameConfiguration, setGameConfiguration] = useState<GameConfiguration | undefined>(undefined)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (!auth.user) {
            return
        }
        const unsub = onSnapshot(doc(collection(db, "games"), auth.user.uid), (doc) => {
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

    if (!auth.user) {
        return <CircularProgress />
    }
    
    async function createGame(gameConfiguration: GameConfiguration) {
        if (!auth.user) {
            return
            // TODO: do something here like return to logout page
        }

        try {
            const docRef = await setDoc(doc(collection(db, "games"), auth.user.uid), gameConfiguration);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    async function onDeleteGame() {
        if (!auth.user) {
            return
            // TODO: do something here like return to logout page
        }

        await deleteDoc(doc(collection(db, "games"), auth.user.uid))
        try {
            await deleteDoc(doc(collection(db, "games"), auth.user.uid))
        } catch (e) {
            console.error("Error deleting document: ", e);
        }
    }

    return (
        <Container maxWidth="lg">
            <Stack
                spacing={2}
                sx={{
                    mt: 6,
                }}
            >
                <Typography
                    component="h1"
                    variant="h2"
                >
                    My Game
                </Typography>
                {
                    isLoading ?
                    <CircularProgress /> :
                    gameConfiguration ?
                    <GameCard
                        owner={auth.user.displayName || "Name"}
                        factions={gameConfiguration.factions}
                        mapType={gameConfiguration.mapType}
                        onOpenGame={onOpenGame}
                        onDeleteGame={onDeleteGame}
                    /> :
                    <CreateGameCard
                        submitCreateGame={createGame}
                    />
                }
                <Divider />
                <Typography
                    component="h2"
                    variant="h2"
                >
                    Joined Games
                </Typography>
            </Stack>
        </Container>
    )
}

export { Dashboard }