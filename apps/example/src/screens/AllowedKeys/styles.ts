import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexShrink: 0,
  },
  contentContainer: {
    paddingVertical: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  allowedKeysInput: {
    width: '100%',
    height: 50,
    backgroundColor: 'lightgray',
    marginBottom: 20,
  },
});

export default styles;
