import { Layout } from '../hex';
import { BoardMap } from './Types';
import { Spaces } from './Spaces';

function GalaxyDisplay({ homeTiles, primaryTiles, secondaryTiles, tertiaryTiles, spaceMap} : BoardMap) {

  return (
    <div className={"galaxy-display"}>
      <Layout size={40} flat={true}>
        <Spaces spaces={spaceMap}/>
      </Layout>
    </div>
  )
}

export { GalaxyDisplay }
