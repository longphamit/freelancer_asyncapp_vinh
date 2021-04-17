import { StyleSheet } from 'react-native';
import Colors from '../../theme/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  backButton: {
    backgroundColor: Colors.light,
    padding: 12,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  icon: {
    marginHorizontal: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 24,
  },
  settingItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    justifyContent: 'space-between',
    height: 52,
  },
  settingItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
