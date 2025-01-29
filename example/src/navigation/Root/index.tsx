import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScreenNames from '../screenNames';
import Main from '../../screens/Main';
import RNTextInput from '../../screens/RNTextInput';
import Date from '../../screens/Date';

const RootStack = createNativeStackNavigator({
  initialRouteName: ScreenNames.Main,
  screens: {
    [ScreenNames.Main]: {
      screen: Main,
    },
    [ScreenNames.RNTextInput]: {
      screen: RNTextInput,
    },
    [ScreenNames.Date]: {
      screen: Date,
    },
  },
});

export default RootStack;
