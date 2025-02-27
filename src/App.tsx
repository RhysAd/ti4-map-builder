import { Galaxy } from './galaxy/Galaxy';
import { useState } from 'react';
import { AuthDisplay } from './login/AuthDisplay';

import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {

  const [loggedIn, setLoggedIn] = useState(false)
  
  return (
    <div className={"App"}>
      {
        loggedIn ?
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
        }}/> :
        <AuthDisplay />
      }
    </div>
  );
}

export default App;
