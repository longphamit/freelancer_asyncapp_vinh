import { View, TouchableOpacity, Switch, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useNavigation } from '../../hooks';
import { Text } from '../../components';
import style from './style';
import Colors from '../../theme/colors';
import Storage from '../../storage';
import Screens from '../screens';
import { logout } from '../../store/actions/user';

const Setting = ({ componentId }) => {
  const navigation = useNavigation(componentId);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const user = Storage.user.get();

  const [syncModeEnabled, setSyncModeEnabled] = useState(true);
  const [allowSaveClipboard, setAllowSaveClipboard] = useState(true);

  const changeSyncMode = () => {
    setSyncModeEnabled(previousState => !previousState);

    // Call api
  };

  const changeAllowSaveClipboard = () => {
    setAllowSaveClipboard(previousState => !previousState);

    // Call api
  };

  const onBackPress = () => {
    navigation.pop();
  };

  const onLogout = () => {
    Alert.alert(t('logout'), t('logout_alert'), [
      {
        text: t('yes'),
        onPress: () => {
          dispatch(logout());
        },
      },
      {
        text: t('no'),
      },
    ]);
  };

  const onDeleteAllClipboard = () => {
    Alert.alert(t('delete_clipboard'), t('delete_clipboard_message'), [
      { text: t('yes'), onPress: () => console.log('Yes Pressed') },
      {
        text: t('no'),
        onPress: () => console.log('No Pressed'),
      },
    ]);
  };

  const navigateProfile = () => {
    navigation.push(Screens.Profile);
  };

  const renderSettingItem = (name, iconName, rightIcon, onPress) => {
    return (
      <TouchableOpacity style={style.settingItemContainer} onPress={onPress}>
        <View style={style.settingItem}>
          <Ionicons
            name={iconName}
            size={20}
            color={Colors.pinkTitle}
            style={style.icon}
          />
          <Text category="p1">{name}</Text>
        </View>

        {rightIcon}
      </TouchableOpacity>
    );
  };

  return (
    <View style={style.container}>
      <TouchableOpacity style={style.backButton} onPress={onBackPress}>
        <Ionicons size={20} name="chevron-back-outline" />
      </TouchableOpacity>
      <Text category="h4">{t('setting')}</Text>

      <TouchableOpacity style={style.userInfo} onPress={navigateProfile}>
        <View style={style.settingItem}>
          <Ionicons
            size={28}
            style={style.icon}
            name="person-circle-outline"
            color={Colors.pinkTitle}
          />
          <Text category="c1">{user.email}</Text>
        </View>

        <Ionicons
          size={24}
          name="chevron-forward-outline"
          color={Colors.greyBack}
        />
      </TouchableOpacity>

      <Text category="p2" status="grey">
        {t('action')}
      </Text>

      {renderSettingItem(
        t('sync_share'),
        'swap-horizontal',
        <Switch
          trackColor={{
            false: Colors.grey,
            true: Colors.pinkTitle,
          }}
          thumbColor={Colors.whiteGrey}
          onValueChange={changeSyncMode}
          value={syncModeEnabled}
        />,
        changeSyncMode,
      )}

      {renderSettingItem(
        t('save_clipboard_history'),
        'save',
        <Switch
          trackColor={{
            false: Colors.grey,
            true: Colors.pinkTitle,
          }}
          thumbColor={Colors.whiteGrey}
          onValueChange={changeAllowSaveClipboard}
          value={allowSaveClipboard}
        />,
        changeAllowSaveClipboard,
      )}

      {renderSettingItem(
        t('delete_all_clipboard'),
        'trash',
        null,
        onDeleteAllClipboard,
      )}
      {renderSettingItem(
        t('change_password'),
        'key',
        <Ionicons
          size={20}
          name="chevron-forward-outline"
          color={Colors.greyBack}
        />,
      )}

      {renderSettingItem(t('logout'), 'log-in-outline', null, onLogout)}
    </View>
  );
};

export default Setting;
