import React from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import LottieView from 'lottie-react-native';

import Colors from '../../theme/colors';
import style from './style';
import Animations from '../../assets/animations';

const Loading = ({ loading = false }) => {
  return (
    <View style={style.centerOverlap}>
      {loading && <Text style={style.overlay} />}
      {loading && (
        <View style={style.indicator}>
          <LottieView
            source={Animations.loading}
            autoPlay
            loop
            style={style.icon}
            resizeMode="cover"
          />
        </View>
      )}
    </View>
  );
};

export default Loading;
