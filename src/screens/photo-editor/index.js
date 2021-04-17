import React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { useNavigation } from '../../hooks';
import { Text } from '../../components';
import style from './style';

const PhotoEditor = ({ componentId }) => {
  const navigation = useNavigation(componentId);
  const { t } = useTranslation();

  return (
    <View style={style.container}>
      <Text>Photo editor screen</Text>
    </View>
  );
};

export default PhotoEditor;
