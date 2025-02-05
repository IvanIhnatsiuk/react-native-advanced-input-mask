import { StyleSheet } from 'react-native';

export const FOCUSED_BORDER_COLOR = '#2a41cb';
export const DEFAULT_BORDER_COLOR = '#eceef5';
export const PLACEHOLDER_COLOR = '#757575';

export default StyleSheet.create({
  input: {
    borderWidth: 1,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#eceef5',
    justifyContent: 'center',
    color: '#000',
    width: '90%',
    height: 50,
  },
});
