import Storage from '../../storage';
import { USER } from './types';
import { startApp, startLoginScreen } from './app';
import Service from '../../services';

export const login = user => {
  return async (dispatch, getState) => {
    await Storage.user.save(user);
    Service.api.load(user.token, user.refreshToken);

    dispatch(startApp());
    return dispatch({ type: USER.LOGGED_IN, user });
  };
};

export const logout = () => {
  return async (dispatch, getState) => {
    await Storage.user.remove();

    dispatch(startLoginScreen());
    return dispatch({ type: USER.LOGGED_OUT });
  };
};
