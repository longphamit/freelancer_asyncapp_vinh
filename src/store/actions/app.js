import { APP } from './types';
import Screens from '../../screens/screens';

export function changeAppRoot(root) {
  return { type: APP.ROOT_CHANGED, root };
}

export function appInitialized() {
  return changeAppRoot(Screens.Splash);
}

export function restartApp() {
  return appInitialized();
}

export function startHomeScreen() {
  return changeAppRoot(Screens.Home);
}

export function startLoginScreen() {
  return changeAppRoot(Screens.Login);
}

export function startApp() {
  return startHomeScreen();
}
