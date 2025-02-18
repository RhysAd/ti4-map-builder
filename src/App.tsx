import { Galaxy } from './galaxy/Galaxy';
import './App.css';
import { Handbar } from './Handbar/Handbar';

function App() {
  return (
    <div className={"App"}>
      <Galaxy
        factions={[
          "The Arborec",
          "The Barony of Letnev",
          "The Clan of Saar",
          "The Embers of Muaat" ,
          "The Emirates of Hacan", 
          "The Federation of Sol",
          "The Ghosts of Creuss",
          "Sardakk N'orr"
        ]}
        mapType={ "warp"} />
        <Handbar tileIds={[
          "1", "2", "3", "4", "5", "6", "7", "8"
        ]}/>
    </div>
    
  );
}

export default App;
