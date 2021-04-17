import { Keyboard } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Screens from '../screens/screens';

const PUSH_SCREEN_DELAY_TIME = 1000;

const useNavigation = (componentId = Screens.Main) => {
  let pressed = true;

  const push = (name, passProps = {}, options = {}) => {
    if (pressed) {
      Keyboard.dismiss();
      pressed = false;
      setTimeout(() => (pressed = true), PUSH_SCREEN_DELAY_TIME);

      Navigation.push(componentId, {
        component: {
          name,
          passProps,
          options,
        },
      });
    }
  };

  const pop = () => {
    Keyboard.dismiss();
    Navigation.pop(componentId);
  };

  const popToRoot = () => {
    Navigation.popToRoot(componentId);
  };

  const setRoot = layout => {
    Navigation.setRoot(layout);
  };

  const showSideMenu = () => {
    Navigation.mergeOptions(Screens.SideMenu, {
      sideMenu: {
        left: {
          visible: true,
        },
      },
    });
  };

  const hideSideMenu = () => {
    Navigation.mergeOptions(Screens.SideMenu, {
      sideMenu: {
        left: {
          visible: false,
        },
      },
    });
  };

  const mergeOptions = options => {
    Navigation.mergeOptions(componentId, options);
  };

  const showModal = (name, passProps = {}, options = {}) => {
    if (pressed) {
      Keyboard.dismiss();
      pressed = false;
      setTimeout(() => (pressed = true), PUSH_SCREEN_DELAY_TIME);

      Navigation.showModal({
        component: {
          name,
          passProps,
          options,
        },
      });
    }
  };

  const showOverlay = (name, passProps = {}, options = {}) => {
    if (pressed) {
      Keyboard.dismiss();
      pressed = false;
      setTimeout(() => (pressed = true), PUSH_SCREEN_DELAY_TIME);

      Navigation.showOverlay({
        component: {
          name,
          passProps,
          options,
        },
      });
    }
  };

  return {
    push,
    pop,
    setRoot,
    popToRoot,
    showSideMenu,
    hideSideMenu,
    mergeOptions,
    showModal,
    showOverlay,
  };
};

export default useNavigation;
