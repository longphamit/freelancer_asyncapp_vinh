import { Platform, Dimensions, PermissionsAndroid } from 'react-native';

import { OS, RESPONSE_STATUS_CODES } from './constants';
import Colors from '../theme/colors';

class Utils {
  constructor() {
    this.deviceWidth = Dimensions.get('window').width;
    this.deviceHeight = Dimensions.get('window').height;

    this.fileSizeUnits = [
      'bytes',
      'Kb',
      'Mb',
      'Gb',
      'Tb',
      'Pb',
      'Eb',
      'Zb',
      'Yb',
    ];
  }

  isIOS = () => {
    return Platform.OS === OS.IOS;
  };

  isAndroid = () => {
    return Platform.OS === OS.ANDROID;
  };

  getScreenWidth = () => {
    return this.deviceWidth;
  };

  getScreenHeight = () => {
    return this.deviceHeight;
  };

  getHeightPercent = percent => {
    return this.deviceHeight * percent * 0.01;
  };

  getWidthPercent = percent => {
    return this.deviceWidth * percent * 0.01;
  };

  isEmptyString = str => {
    const string = str !== undefined || str !== null ? String(str) : '';
    return !str || string.length === 0 || !string.trim();
  };

  isEmptyArray = array => {
    return array === undefined || array === null || array.length === 0;
  };

  isFunction = func => {
    return func && typeof func === 'function';
  };

  isEmail = email => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  isResponseSuccess = response => {
    return response && response.status === RESPONSE_STATUS_CODES.SUCCESS;
  };

  removeEmptyAttributes = data => {
    const obj = { ...data };
    Object.keys(obj).forEach(key => {
      if (obj[key] === undefined || obj[key] === null) {
        delete obj[key];
      }
    });
    return obj;
  };

  elevationShadowStyle = (elevation, shadowColor = Colors.black) => {
    return {
      elevation,
      shadowColor,
      shadowOffset: { width: 0, height: 0.5 * elevation },
      shadowOpacity: 0.3,
      shadowRadius: 0.8 * elevation,
    };
  };

  convertTimeToTimestamp = time => {
    return Date.parse(time);
  };

  hasWriteExternalStoragePermission = async () => {
    if (this.isIOS()) {
      return true;
    }

    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  };

  generatePlaceholderImage = (text = '', size = 48, bg = '666666') => {
    return `https://plchldr.co/i/${size}x${size}?bg=${bg}&text=` + text;
  };

  bytesToSize = (bytes, decimals = 3) => {
    if (!bytes) {
      return '0 Bytes';
    }

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return (
      parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) +
      ' ' +
      this.fileSizeUnits[i]
    );
  };
}

const utils = new Utils();
export default utils;
