import { Galaxy } from './galaxy/Galaxy';
import { useState } from 'react';
import { AuthDisplay } from './login/AuthDisplay';
import { auth } from './Firebase';
import { createUserWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  const [userInitialized, setUserInitialized] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  auth.onAuthStateChanged((user) => {
    setUserInitialized(true)
    setUser(user)
  })

  if (!userInitialized) {
    return (
      <div className={"App"} />
    )
  }
  
  return (
    <div className={"App"}>
      {
        user ?
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
              <Button color="inherit" onClick={() => signOut(auth)}>Logout</Button>
            </Toolbar>
          </AppBar>
          <Toolbar />
          <Galaxy
            gameConfiguration={{
              factions: [
                "The Arborec",
                "The Barony of Letnev",
                "The Clan of Saar",
                "The Embers of Muaat" ,
                "The Emirates of Hacan", 
                "The Federation of Sol",
                "The Ghosts of Creuss",
                "Sardakk N'orr"
              ],
              mapType: "warp"
          }}/>
        </> :
        <AuthDisplay />
      }
    </div>
  );
}

export default App;
