import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, styled, Toolbar } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import { TilePlacement } from '../../domain/Game';

function SideMenu({ tilePlacements }: {tilePlacements: TilePlacement[]}) {
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: 240,
                [`& .MuiDrawer-paper`]: { 
                    width: 240,
                    position: "relative"
                },
            }}
        >
            {/* <Toolbar /> */}
            <Box sx={{ overflow: 'auto' }}>
                <List>
                    {tilePlacements.map((placement, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton>
                            <ListItemText primary={`User: ${placement.factionIndex} Tile: ${placement.tileId} Hex: ${placement.hex.toString()}`} />
                        </ListItemButton>
                    </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    )
}

export { SideMenu }