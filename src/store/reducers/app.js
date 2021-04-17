import { APP } from '../actions/types';

const initialState = {
  root: null,
};

export default function (state = initialState, action = '') {
  switch (action.type) {
    case APP.ROOT_CHANGED:
      return {
        ...state,
        root: action.root,
      };

    default:
      return state;
  }
}
