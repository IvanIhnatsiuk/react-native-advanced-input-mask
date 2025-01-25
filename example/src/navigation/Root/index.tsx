import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScreenNames from '../screenNames';
import Main from '../../screens/Main';
import RNTextInput from '../../screens/RNTextInput';

const RootStack = createNativeStackNavigator({
  initialRouteName: ScreenNames.Main,
  screens: {
    [ScreenNames.Main]: {
      screen: Main,
    },
    [ScreenNames.RNTextInput]: {
      screen: RNTextInput,
    },
  },
});

export default RootStack;
