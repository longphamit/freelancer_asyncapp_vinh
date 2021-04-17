import { StyleSheet } from 'react-native';
import utils from '../../commons/utils';
import Colors from '../../theme/colors';
import Fonts from '../../theme/fonts';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  settingIcon: {
    backgroundColor: Colors.light,
    borderRadius: 4,
    padding: 10,
    marginLeft: 12,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light,
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
    flex: 1,
  },
  searchInput: {
    padding: 0,
    margin: 0,
    flex: 1,
    marginLeft: 8,
  },
  clipboardType: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  clipboardTypeWrapper: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 12,
  },
  clipboardTypeSelected: {
    backgroundColor: Colors.light,
    borderRadius: 4,
  },
  dots: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 12,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.veryLightGray,
    marginHorizontal: 6,
  },
  actionWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  camera: {
    borderRadius: 10,
    backgroundColor: Colors.light,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  clipboard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.light,
    marginTop: 12,
    borderRadius: 4,
  },
  clipboardContent: {
    flex: 1,
  },
  copyIcon: {
    padding: 4,
    marginLeft: 12,
  },
  link: {
    color: Colors.pink,
    textDecorationLine: 'underline',
  },
  image: {
    maxWidth: '100%',
    height: utils.deviceHeight / 4,
    borderRadius: 4,
    borderTopLeftRadius: 4,
  },
  emptyContainer: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 72,
    marginBottom: 36,
  },
  emptyIcon: {
    width: 96,
    height: 96,
  },
});
