import React from 'react';
import { Navigation } from 'react-native-navigation';
import Screens from './screens';

import Splash from './splash';
import Login from './login';
import Register from './register';
import Home from './home';
import Profile from './profile';
import Setting from './setting';
import PhotoEditor from './photo-editor';
import ForgotPassword from './forgot-password';

const registerScreen = (name, Layout, store = null, Provider = null) => {
  if (store && Provider) {
    Navigation.registerComponent(
      name,
      () => props => (
        <Provider store={store}>
          <Layout {...props} />
        </Provider>
      ),
      () => Layout,
    );
  } else {
    Navigation.registerComponent(name, () => Layout);
  }
};

export const registerScreens = (store, Provider) => {
  registerScreen(Screens.Home, Home, store, Provider);
  registerScreen(Screens.Splash, Splash, store, Provider);
  registerScreen(Screens.Login, Login, store, Provider);
  registerScreen(Screens.Register, Register);
  registerScreen(Screens.Profile, Profile);
  registerScreen(Screens.Setting, Setting, store, Provider);
  registerScreen(Screens.PhotoEditor, PhotoEditor);
  registerScreen(Screens.ForgotPassword, ForgotPassword);
};
