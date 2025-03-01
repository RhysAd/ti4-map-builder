import { Layout } from '../hex';
import { InitialBoard, SpaceState } from './Types';
import { Spaces } from './Spaces';

function GalaxyDisplay({initialBoard, spaceMap, onTileClicked}: {initialBoard: InitialBoard, spaceMap: Map<string, SpaceState>, onTileClicked: (space: SpaceState) => void}) {

  return (
    <div className={"galaxy-display"}>
      <Layout size={40} flat={true}>
        <Spaces
          initialBoard={initialBoard}
          spaceMap={spaceMap}
          onTileClicked={onTileClicked}/>
      </Layout>
    </div>
  )
}

export { GalaxyDisplay }
