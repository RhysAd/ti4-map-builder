import { init } from './actions/InitAction';
import { placeTile } from './actions/placeTileAction';
import { Action, State } from './Types';

function galaxyReducer(state: State, action: Action): State {
  const { type } = action
  switch (type) {
    case "INIT":
      return { ...state, boardMap: init(action.payload) };
    case "PLACE_TILE":
      return {...state, boardMap: placeTile(state.boardMap, action.payload)}
  }

  const THIS_SHOULDNT_HAPPEN: never = type
  return THIS_SHOULDNT_HAPPEN
}

export { galaxyReducer }
