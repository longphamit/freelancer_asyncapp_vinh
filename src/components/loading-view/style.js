import { StyleSheet } from 'react-native';
import Colors from '../../theme/colors';
import Utils from '../../commons/utils';

export default StyleSheet.create({
  centerOverlap: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    height: Utils.deviceHeight,
    width: Utils.deviceWidth,
    flex: 1,
  },
  indicator: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: Colors.lightOverlay,
    height: Utils.deviceHeight,
  },
  icon: {
    width: 60,
    height: 60,
  },
});
