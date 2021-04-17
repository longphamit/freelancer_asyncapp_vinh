import React, { useState } from 'react';
import { View, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useNavigation } from '../../hooks';
import { Text } from '../../components';
import style from './style';
import Colors from '../../theme/colors';
import Services from '../../services';
import Utils from '../../commons/utils';

const ForgotPassword = ({ componentId }) => {
  const navigation = useNavigation(componentId);
  const { t } = useTranslation();

  const [email, setEmail] = useState('');

  const goBack = () => {
    navigation.pop();
  };

  const onSendForgotPassword = () => {
    if (!email) {
      Alert.alert(t('notice'), t('enter_all_fields'));
      return;
    }

    Services.api
      .forgotPassword({ email })
      .then(response => {
        if (Utils.isResponseSuccess(response)) {
          Alert.alert('notice', t('send_forgot_password_success'));
        } else {
          console.log('Forgot password failed. Response: ', response);
          Alert.alert('notice', t('something_went_wrong'));
        }
      })
      .catch(error => {
        console.log('Forgot password error: ', error);
        Alert.alert('notice', t('something_went_wrong'));
      });
  };

  return (
    <View style={style.container}>
      <Text style={style.title} category="h2">
        {t('forgot_password')}
      </Text>

      <View style={style.content}>
        <Text>{t('email')}</Text>
        <TextInput
          style={style.textInput}
          placeholder={t('enter_email')}
          value={email}
          onChangeText={setEmail}
        />

        <TouchableOpacity
          style={style.submitButton}
          onPress={onSendForgotPassword}>
          <Text status="white" category="c2">
            {t('submit')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={style.goBack} onPress={goBack}>
          <Ionicons
            size={20}
            color={Colors.pinkTitle}
            name="caret-back-circle-outline"
          />
          <Text>{t('go_back_login')}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={style.backButton} onPress={goBack}>
        <Ionicons name="chevron-back" size={20} />
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPassword;
