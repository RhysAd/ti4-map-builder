import { init } from './actions/InitAction';
import { placeTile } from './actions/placeTileAction';
import { Action, State } from './Types';

function galaxyReducer(state: State, action: Action): State {
  const { type } = action
  switch (type) {
    case "INIT":
      // console.log("INIT")
      return { ...state, initialBoard: init(action.payload) }
    case "PLACE_TILE":
      // console.log("PLACE_TILE")
      // console.log(state.placements)
      return {...state, placements: placeTile([...state.placements], action.payload)}
    case "UNDO_PLACEMENT":
      return {...state, placements: state.placements.slice(0, state.placements.length - 1)}
  }

  const THIS_SHOULDNT_HAPPEN: never = type
  return THIS_SHOULDNT_HAPPEN
}

export { galaxyReducer }
