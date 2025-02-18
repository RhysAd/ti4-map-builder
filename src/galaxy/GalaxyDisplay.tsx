import { Layout } from '../hex';
import { BoardMap, SpaceState } from './Types';
import { Spaces } from './Spaces';

function GalaxyDisplay({boardMap, onTileClicked}: {boardMap: BoardMap, onTileClicked: (space: SpaceState) => void}) {

  return (
    <div className={"galaxy-display"}>
      <Layout size={40} flat={true}>
        <Spaces
          boardMap={boardMap}
          onTileClicked={onTileClicked}/>
      </Layout>
    </div>
  )
}

export { GalaxyDisplay }
