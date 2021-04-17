import React, { useEffect } from 'react';
import { View, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import { getDeviceName } from 'react-native-device-info';

import { login } from '../../store/actions/user';
import { startLoginScreen } from '../../store/actions/app';

import { Text, ImageView } from '../../components';
import style from './style';
import Images from '../../assets/images';
import Storage from '../../storage';
import Services from '../../services';
import Utils from '../../commons/utils';

const Splash = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const startScreen = userData => {
    if (userData) {
      dispatch(login(userData));
    } else {
      dispatch(startLoginScreen());
    }
  };

  useEffect(() => {
    const loginWithSavedData = async () => {
      const { email, password } = Storage.user.get();

      if (email && password) {
        const deviceToken = await messaging().getToken();
        if (!deviceToken) {
          Alert.alert(t('notice'), t('oops'));
          return;
        }

        const deviceName = await getDeviceName();
        if (!deviceName) {
          Alert.alert(t('notice'), t('oops'));
          return;
        }

        Services.api
          .login({ email, password, deviceToken, deviceName })
          .then(response => {
            if (Utils.isResponseSuccess(response)) {
              startScreen({ ...response.data[0], password });
            } else {
              console.log('Login failed. Response: ', response);
              startScreen();
            }
          })
          .catch(error => {
            console.log('Login error: ', error);
            startScreen();
          });
      } else {
        startScreen();
      }
    };

    loginWithSavedData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={style.container}>
      <ImageView
        source={Images.brand}
        style={style.logo}
        resizeMode={ImageView.resizeMode.contain}
      />
    </View>
  );
};

export default Splash;
