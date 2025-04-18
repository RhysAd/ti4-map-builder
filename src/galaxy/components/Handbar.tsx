import { TileDisplay } from '../TileDisplay';
import { Drawer, Toolbar } from '@mui/material';

export type HandBarProps = {
    tileIds: string[]
    selectedTile: number | undefined
    setSelectedTile: (value: number | undefined) => void
}

export function Handbar(props: HandBarProps) {
    const {
        tileIds,
        selectedTile,
        setSelectedTile
    } = props;

    return (
        <Drawer
            variant="permanent"
            anchor="bottom"
            sx={{
                height: 140,
                [`& .MuiDrawer-paper`]: { 
                    height: 140,
                    position: "relative",
                    gap: 1,
                    overflow: "auto",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center"
                },
        }}>
            {tileIds.map((tileId, i) => (
                <div
                    key={i}
                    onClick={() => setSelectedTile(i)}
                    style={{
                        flexShrink: 0,
                        width: "120px",
                        marginLeft: i === 0 ? "10px" : "0"
                    }}>
                    <TileDisplay
                        tileId={tileId}
                        rotation={0}
                        className={selectedTile === i ? "outlined" : undefined}
                    />
                </div>
            ))}
        </Drawer>
    )
}