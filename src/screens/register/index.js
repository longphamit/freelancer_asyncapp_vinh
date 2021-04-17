import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import { useTranslation } from 'react-i18next';

import { useNavigation } from '../../hooks';
import { Text, LoadingView } from '../../components';
import style from './style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../theme/colors';
import Services from '../../services';
import Utils from '../../commons/utils';

const Register = ({ componentId }) => {
  const navigation = useNavigation(componentId);
  const { t } = useTranslation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const goBack = () => {
    navigation.pop();
  };

  const onRegister = () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert(t('notice'), t('enter_all_fields'));
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(t('notice'), t('confirm_password_not_match'));
      return;
    }

    setLoading(true);

    Services.api
      .register({ email, password })
      .then(response => {
        if (Utils.isResponseSuccess(response)) {
          Alert.alert(t('notice'), t('register_success'), [
            {
              text: t('ok'),
              onPress: goBack,
            },
          ]);
        } else {
          console.log('Register failed. Response: ', response);
          if (response.message) {
            Alert.alert(t('notice'), response.message);
          } else {
            Alert.alert(t('notice'), t('register_failed'));
          }
        }
      })
      .catch(error => {
        console.log('Register error: ', error);
        Alert.alert(t('notice'), t('register_failed'));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <View style={style.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={style.title} category="h2">
          {t('register')}
        </Text>

        <View style={style.content}>
          <Text>{t('email')}</Text>
          <TextInput
            style={style.textInput}
            textContentType="emailAddress"
            keyboardType="email-address"
            placeholder={t('enter_email')}
            value={email}
            onChangeText={setEmail}
          />

          <Text>{t('password')}</Text>
          <TextInput
            style={style.textInput}
            placeholder={t('enter_password')}
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />

          <Text>{t('confirm_password')}</Text>
          <TextInput
            style={style.textInput}
            placeholder={t('enter_confirm_password')}
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <TouchableOpacity style={style.registerButton} onPress={onRegister}>
            <Text status="white" category="c2">
              {t('register')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.goBack} onPress={goBack}>
            <Ionicons
              size={20}
              color={Colors.pinkTitle}
              name="caret-back-circle-outline"
            />
            <Text> {t('go_back_login')}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={style.backButton} onPress={goBack}>
          <Ionicons name="chevron-back" size={20} />
        </TouchableOpacity>
      </ScrollView>
      <LoadingView loading={loading} />
    </View>
  );
};

export default Register;
