import { Galaxy } from './galaxy/Galaxy';
import './App.css';

function App() {
  
  return (
    <div className={"App"}>
      {
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
      }
    </div>
  );
}

export default App;
