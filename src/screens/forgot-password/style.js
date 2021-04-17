import { StyleSheet } from 'react-native';
import Colors from '../../theme/colors';
import Fonts from '../../theme/fonts';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    color: Colors.pinkTitle,
    marginTop: 60,
    marginBottom: 24,
  },
  content: {
    marginTop: 8,
    marginHorizontal: 24,
  },
  textInput: {
    backgroundColor: Colors.light,
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
  },
  submitButton: {
    paddingVertical: 12,
    marginVertical: 24,
    borderRadius: 4,
    alignItems: 'center',
    backgroundColor: Colors.pinkTitle,
  },
  goBack: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 12,
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: Colors.light,
    padding: 12,
    borderRadius: 4,
  },
});
