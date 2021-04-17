import AsyncStorage from '@react-native-community/async-storage';
import { STORAGE } from '../commons/constants';

import { removeItem } from './wrapper';
import i18n, { loadDeviceLanguage } from '../../i18n';

class LanguageStorage {
  constructor() {
    this.key = STORAGE.USER_LANGUAGE;
    this.data = null;
  }

  save = async language => {
    try {
      this.data = await AsyncStorage.setItem(this.key, language);
    } catch (error) {
      console.log('[Storage] Save user language error', error);
    }
  };

  retrieve = async () => {
    try {
      const language = await AsyncStorage.getItem(this.key);
      this.data = language;

      if (language) {
        i18n.changeLanguage(language);
      } else {
        loadDeviceLanguage();
      }
    } catch (error) {
      console.log('[Storage] Load user language error', error);
      loadDeviceLanguage();
    }
  };

  remove = async () => {
    await removeItem(this.key);
  };

  get = () => {
    return this.data;
  };
}

export default LanguageStorage;
