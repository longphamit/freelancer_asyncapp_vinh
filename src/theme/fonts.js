import { Platform } from 'react-native';

const AndroidFonts = {
  Bold: 'SanFranciscoText-Bold',
  Medium: 'SanFranciscoText-Medium',
  Regular: 'SanFranciscoText-Regular',
  Light: 'SanFranciscoText-Light',
};

const IOSFonts = {
  Bold: 'SanFranciscoText-Bold',
  Medium: 'SanFranciscoText-Medium',
  Regular: 'SanFranciscoText-Regular',
  Light: 'SanFranciscoText-Light',
};

const Fonts = Platform.select({
  android: AndroidFonts,
  ios: IOSFonts,
});

export default Fonts;
