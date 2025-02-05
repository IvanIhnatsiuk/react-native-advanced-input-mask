import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowRadius: 10,
    shadowOpacity: 0.1,
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    marginVertical: 8,
    elevation: 5,
    marginHorizontal: 16,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  emoji: {
    fontSize: 20,
  },
});
