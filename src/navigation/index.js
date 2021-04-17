import { Navigation } from 'react-native-navigation';
import Screens from '../screens/screens';

export const setSplashScreen = () => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: Screens.Splash,
              options: {
                statusBar: {
                  visible: true,
                  style: 'light',
                },
                topBar: {
                  visible: false,
                },
              },
            },
          },
        ],
      },
    },
  });
};

export const setLoginScreen = () => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: Screens.Login,
              options: {
                statusBar: {
                  visible: true,
                  style: 'light',
                },
                topBar: {
                  visible: false,
                },
              },
            },
          },
        ],
      },
    },
  });
};

export const setHomeScreen = () => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: Screens.Home,
              options: {
                statusBar: {
                  visible: true,
                  style: 'light',
                },
                topBar: {
                  visible: false,
                },
              },
            },
          },
        ],
      },
    },
  });
};
