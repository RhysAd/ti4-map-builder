import { Alert, Box, Button, Card, CardActions, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { useState } from "react";
import { MapType, GameConfiguration } from "../../domain/Game";
import boardData from "../../assets/data/boardData.json"

const playerCounts = [2, 3, 4, 5, 6, 7, 8]
const races = [
    "The Arborec", "The Barony of Letnev", "The Clan of Saar", "The Embers of Muaat",
    "The Emirates of Hacan", "The Federation of Sol", "The Ghosts of Creuss", "The L1Z1X Mindnet",
    "The Mentak Coalition", "The Naalu Collective", "The Nekro Virus", "Sardakk N'orr", "The Universities of Jol-Nar", "The Winnu",
    "The Xxcha Kingdom", "The Yin Brotherhood", "The Yssaril Tribes"
]

type CreateGameCardProps = {
    submitCreateGame: (gameConfiguration: GameConfiguration) => void
}

function CreateGameCard(props: CreateGameCardProps) {

    const {
        submitCreateGame
    } = props

    const [mapType, setMapType] = useState("Normal")
    const [playerCount, setPlayerCount] = useState(6)
    const [factions, setFactions] = useState<(string | undefined)[]>([undefined, undefined, undefined, undefined, undefined, undefined])
    const [factionsError, setFactionsError] = useState('')


    function renderFactionSelect() {
        return (
            Array.from({length: playerCount}, (value, index) => index).map(i => {
                return (
                    <FormControl size="small" key={i} error={true}>
                        <Box sx={{
                            display: "flex",
                            alignItems: "center",
                        }}>
                            <Typography
                                sx={{
                                    marginRight: 1
                                }}
                            >
                                {`${i + 1}.`}
                            </Typography>
                            <Select
                                value={factions[i] || ""}
                                onChange={e => handleFactionChange(e, i)}
                                sx={{
                                    flexGrow: 1
                                }}
                            >
                                {races.map((race, j) => (
                                    <MenuItem 
                                        key={j}
                                        value={race}
                                    >
                                        {race}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Box>
                    </FormControl>
                )
            })
        )
    }
    
    function handlePlayerCountChange(event: SelectChangeEvent<number>) {
        const count: number = event.target.value as number
        factions.length = count
        setFactions([...factions])
        setPlayerCount(event.target.value as number)

        if (mapType === "Hyperlanes") {
            if (!mapTypeExists(count, "Hyperlanes")) {
                setMapType("Normal")
            }
        }
    }
    
    function handleFactionChange(event: SelectChangeEvent<unknown>, i: number) {
        const faction = event.target.value as string
        const index: number = factions.indexOf(faction)
        if (index > -1) {
            factions.splice(factions.indexOf(faction), 1, "")
        }
        factions[i] = event.target.value as string
        setFactions([...factions])
    }

    const validateInputs = (name: string | undefined) => {
        let isValid = true;
    
        factions.forEach(faction => {
            if (faction === undefined || faction === "") {
                isValid = false;
                return
            }
        })
        if (isValid) {
            setFactionsError('')
        }
        else {
            setFactionsError('All factions must be selected');
        }

        return isValid;
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const name: string | undefined = data.get("game-name")?.toString()
        const pok : boolean = !!data.get("pok")

        if (!validateInputs(name)) {
            return
        }

        submitCreateGame({
            mapType: mapType === "Hyperlanes" ? MapType.Hyperlanes : MapType.Normal,
            pok: pok,
            playerCount: playerCount,
            factions: factions as string[]
        })
    };

    return (
        <Card sx={{ maxWidth: 300}}>
            <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    gap: 2,
                }}
            >
                <FormControl size="small">
                    <FormLabel htmlFor="map-type">Map Type</FormLabel>
                    <Select
                        id="mapType"
                        value={mapType}
                        onChange={(event: SelectChangeEvent<string>) => {setMapType(event.target.value)}}
                    >
                        <MenuItem value={"Normal"} key={1}>Normal</MenuItem>
                        {mapTypeExists(playerCount, "Hyperlanes") && <MenuItem value={"Hyperlanes"} key={0}>Hyperlanes</MenuItem>}
                    </Select>
                </FormControl>
                <FormControlLabel control={<Checkbox defaultChecked id="pok" name="pok" />} label="Prophecy of Kings" />
                <FormControl size="small">
                    <FormLabel htmlFor="player-count">Player count</FormLabel>
                    <Select
                        id="player-count"
                        value={playerCount}
                        onChange={handlePlayerCountChange}
                    >
                        {playerCounts.map((count, i) => (
                            <MenuItem value={count} key={i}>{count}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl size="small">
                    <FormGroup>
                        <FormLabel htmlFor="factions">Factions</FormLabel>
                        {renderFactionSelect()}
                    </FormGroup>
                </FormControl>
                {factionsError !== "" ?
                <Alert severity="error">
                    {factionsError}
                </Alert> : null}
                <CardActions sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <Button
                        type="submit"
                        size="medium"
                        variant="contained"
                        sx={{
                            width: 160
                        }}
                    >
                        Create Game
                    </Button>
            </CardActions>
            </Box>
        </Card>
    )
}

function mapTypeExists(playerCount: number, mapType: string): boolean {
    if (mapType === "Hyperlanes") {
        mapType = "warp"
    }
    return !!(boardData.styles as any)?.[playerCount]?.[mapType]
}

export { CreateGameCard }