import { Layout } from '../hex';
import { BoardMap } from './Types';
import { Spaces } from './Spaces';

const mecatol =  {
  position: 0,
  source: "18",
  coordinates: {
      q: 0,
      r: 0,
      s: 0,
  },
  rotate: 0
}

function GalaxyDisplay({ homes, rings, hyperlanes} : BoardMap) {
  const spaces = [mecatol, ...homes, ...rings.flatMap((ring) => ring), ...hyperlanes]

  return (
    <div className={"galaxy-display"}>
      <Layout size={40} flat={true}>
        <Spaces spaces={spaces}/>
      </Layout>
    </div>
  )
}

export { GalaxyDisplay }
