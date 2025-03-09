import { TileDisplay } from '../galaxy/TileDisplay';
import { Toolbar } from '@mui/material';

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
        <Toolbar sx={{
            height: 140,
            gap: 1,
            overflow: "auto"
        }}>
            {tileIds.map((tileId, i) => (
                <div
                    key={i}
                    onClick={() => setSelectedTile(i)}
                    style={{
                        flexShrink: 0,
                        width: "120px",
                    }}>
                    <TileDisplay
                        tileId={tileId}
                        rotation={0}
                        className={selectedTile === i ? "outlined" : undefined}
                    />
                </div>
            ))}
        </Toolbar>
    )
}