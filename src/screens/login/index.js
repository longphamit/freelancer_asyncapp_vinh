import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import { getDeviceName } from 'react-native-device-info';

import { login } from '../../store/actions/user';
import { useNavigation } from '../../hooks';
import { Text, ImageView, LoadingView } from '../../components';
import style from './style';
import Services from '../../services';
import Screens from '../screens';
import Images from '../../assets/images';
import Utils from '../../commons/utils';

const Login = ({ componentId }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation(componentId);
  const { t } = useTranslation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onLoginPress = async () => {
    if (!email || !password) {
      Alert.alert(t('notice'), t('enter_all_fields'));
      return;
    }

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

    setLoading(true);
    const data = { email, password, deviceToken, deviceName };

    Services.api
      .login(data)
      .then(response => {
        if (Utils.isResponseSuccess(response)) {
          dispatch(login({ ...response.data[0], password }));
        } else {
          console.log('Login failed. Response: ', response);
          if (response.message) {
            Alert.alert(t('notice'), response.message);
          } else {
            Alert.alert(t('notice'), t('login_failed'));
          }
        }
      })
      .catch(error => {
        console.log('Login error: ', error);
        Alert.alert(t('notice'), t('login_failed'));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onRegister = () => {
    navigation.push(Screens.Register);
  };

  const onForgotPassword = () => {
    navigation.push(Screens.ForgotPassword);
  };

  return (
    <View style={style.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={style.logoContainer}>
          <ImageView source={Images.logo} style={style.image} />
          <Text style={style.title} category="h4">
            {t('login')}
          </Text>
        </View>

        <View style={style.content}>
          <Text style={style.textTitleInput}>{t('email')}</Text>
          <TextInput
            style={style.textInput}
            textContentType="emailAddress"
            keyboardType="email-address"
            placeholder={t('enter_email')}
            value={email}
            onChangeText={setEmail}
          />
          <Text style={style.textTitleInput}>{t('password')}</Text>
          <TextInput
            style={style.textInput}
            placeholder={t('password')}
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
          <Text
            style={style.forgotPassword}
            category="c2"
            onPress={onForgotPassword}>
            {t('forgot_password')}?
          </Text>

          <TouchableOpacity onPress={onLoginPress} style={style.loginButton}>
            <Text status="white" category="c2">
              {t('login')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.registerView} onPress={onRegister}>
            <Text style={style.createAccount}>{t('dont_have_account')} ?</Text>
            <Text style={style.registerButton} category="c2">
              {t('register')}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <LoadingView loading={loading} />
    </View>
  );
};

export default Login;
