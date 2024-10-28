import { Dimensions, StyleSheet } from 'react-native';

export default StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    marginHorizontal: 16,
  },
  textInput: {
    width: Dimensions.get('window').width - 32,
    height: 50,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'gray',
    marginHorizontal: 16,
    marginBottom: 16,
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
});
