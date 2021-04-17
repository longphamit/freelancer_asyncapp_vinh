import { LogBox } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { registerScreens } from './src/screens';
import { Provider } from 'react-redux';
import configureStore from './src/store';
import App from './app';

const store = configureStore();
registerScreens(store, Provider);

Navigation.events().registerAppLaunchedListener(async () => {
  Navigation.dismissAllModals();

  LogBox.ignoreLogs([
    'Remote debugger',
    'VirtualizedLists should never be nested',
    'Non-serializable values were found in the navigation state',
  ]);

  App(store);
});
