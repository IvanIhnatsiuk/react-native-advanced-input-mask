import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexShrink: 0,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  maskedTextInput: {
    width: '100%',
    height: 50,
    color: 'red',
    backgroundColor: 'orange',
  },
});

export default styles;
