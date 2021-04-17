import {
  setSplashScreen,
  setHomeScreen,
  setLoginScreen,
} from './src/navigation';

import { setDefaultOptions } from './src/commons/options';
import Storage from './src/storage';
import Screens from './src/screens/screens';
import { appInitialized } from './src/store/actions/app';
import Services from './src/services';

const startApp = root => {
  switch (root) {
    case Screens.Splash:
      setSplashScreen();
      break;

    case Screens.Home:
      setHomeScreen();
      break;

    case Screens.Login:
      setLoginScreen();
      break;
  }
};

const App = async store => {
  await setDefaultOptions();
  await Storage.initial();

  let currentRoot = null;
  const onStoreUpdate = () => {
    const { root } = store.getState().app;

    if (currentRoot !== root) {
      currentRoot = root;
      startApp(root);
    }
  };

  store.subscribe(onStoreUpdate);
  Services.socket.listenStoreUpdate(store);

  store.dispatch(appInitialized());
};

export default App;
