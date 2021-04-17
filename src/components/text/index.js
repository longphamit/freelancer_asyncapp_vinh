import React from 'react';
import { Text } from 'react-native';

import style from './style';
import Colors from '../../theme/colors';

const CustomText = ({ category = 'p2', status = 'black', ...props }) => {
  return (
    <Text
      {...props}
      style={[style[category], { color: Colors[status] }, props.style]}>
      {props.children}
    </Text>
  );
};

export default CustomText;