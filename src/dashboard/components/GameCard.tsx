import { Box, Button, Card, CardActions, CardContent, Container, IconButton, Stack, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { MapType } from "../../domain/Game";

type GameCardProps = {
    owner: string
    factions: string[]
    mapType: MapType
    onOpenGame: (id: string) => void
    onDeleteGame: () => void
}

function GameCard(props: GameCardProps) {
    const {
        owner,
        factions,
        mapType,
        onOpenGame,
        onDeleteGame,
    } = props

    return (
        <Card sx={{ maxWidth: 275}}>
            <CardContent sx={{ mb: 2}}>
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 2
                }}>
                    <Typography
                        variant="h4"
                    >
                        {owner}
                    </Typography>
                    <IconButton
                        aria-label="delete"
                        size="medium"
                        color="error"
                        onClick={onDeleteGame}
                    >
                    <DeleteIcon />
                </IconButton>
                </Box>
                
                <Typography>
                    {`Players: ${factions.length}`}
                </Typography>
                {factions.map((faction, i) => {
                    return (
                        <Typography
                            key={i}
                            sx={{ml: 3}}
                        >
                            {faction}
                        </Typography>
                    )
                })}
                <Typography>
                    {`Map Type: ${mapType === MapType.Hyperlanes ? "Hyperlanes" : "Normal"}`}
                </Typography>
            </CardContent>
            <CardActions sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                <Button
                    size="medium"
                    variant="contained"
                    sx={{
                        width: 160
                    }}
                    onClick={() => onOpenGame("galaxy")}
                >
                    Open
                </Button>
            </CardActions>
            </Card>
    )
}

export { GameCard }