import { init } from './actions/InitAction';
import { Action, State } from './Types';

function galaxyReducer(state: State, action: Action): State {
  const { type } = action
  switch (type) {
    case "INIT":
      return { ...state, initialBoard: init(action.payload) }
    case "PLACE_TILE":
      return {...state, currentPlacement: action.payload}
    case "UNDO_PLACEMENT":
      return {...state, currentPlacement: undefined}
  }

  const THIS_SHOULDNT_HAPPEN: never = type
  return THIS_SHOULDNT_HAPPEN
}

export { galaxyReducer }
