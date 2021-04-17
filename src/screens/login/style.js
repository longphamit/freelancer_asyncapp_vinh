import { StyleSheet } from 'react-native';
import Colors from '../../theme/colors';
import Fonts from '../../theme/fonts';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 24,
  },
  loginButton: {
    backgroundColor: Colors.pinkTitle,
    paddingVertical: 12,
    marginTop: 20,
    borderRadius: 4,
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 48,
  },
  content: {
    marginHorizontal: 24,
  },
  textInput: {
    backgroundColor: Colors.light,
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 4,
  },
  image: {
    width: 72,
    height: 72,
  },
  title: {
    color: Colors.pinkTitle,
    marginTop: 16,
    marginBottom: 20,
  },
  textTitleInput: {
    marginTop: 12,
  },
  registerView: {
    marginTop: 32,
    justifyContent: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  createAccount: {
    color: Colors.grey,
  },
  registerButton: {
    marginLeft: 4,
  },
  forgotPassword: {
    marginTop: 12,
    alignSelf: 'flex-end',
  },
});
