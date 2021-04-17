import { USER } from '../actions/types';

const initialState = {
  isLoggedIn: false,
  id: null,
  token: '',
  refreshToken: '',
};

export default function (state = initialState, action = '') {
  switch (action.type) {
    case USER.LOGGED_IN:
      return {
        ...state,
        ...action.user,
        isLoggedIn: true,
      };

    case USER.LOGGED_OUT:
      return initialState;

    default:
      return state;
  }
}
