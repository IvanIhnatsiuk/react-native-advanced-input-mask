import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AllowedKeys from "../../screens/AllowedKeys";
import ConditionalRendering from "../../screens/ConditionalRendering";
import ControlledInput from "../../screens/ControlledInput";
import CustomNotations from "../../screens/CustomNotations";
import DateScreen from "../../screens/Date";
import IBAN from "../../screens/IBAN";
import Main from "../../screens/Main";
import Phone from "../../screens/Phone";
import RNTextInput from "../../screens/RNTextInput";
import ValidationRegex from "../../screens/ValidationRegEx";
import ScreenNames from "../screenNames";

export type ExampleScreenParams = { title: string };

type ParamsList = {
  [ScreenNames.Main]: undefined;
  [ScreenNames.RNTextInput]: undefined;
  [ScreenNames.Date]: ExampleScreenParams;
  [ScreenNames.PhoneInput]: ExampleScreenParams;
  [ScreenNames.IBAN]: ExampleScreenParams;
  [ScreenNames.AllowedKeys]: ExampleScreenParams;
  [ScreenNames.CustomNotations]: ExampleScreenParams;
  [ScreenNames.ControlledInput]: ExampleScreenParams;
  [ScreenNames.ValidationRegex]: ExampleScreenParams;
  [ScreenNames.KeyboardControllerWithAutoFocus]: ExampleScreenParams;
  [ScreenNames.ConditionalRendering]: ExampleScreenParams;
};

const RootStack = createNativeStackNavigator<ParamsList>({
  initialRouteName: ScreenNames.Main,
  screenOptions: {
    contentStyle: {
      backgroundColor: "#fafafa",
    },
  },
  screens: {
    [ScreenNames.Main]: {
      screen: Main,
    },
    [ScreenNames.RNTextInput]: {
      screen: RNTextInput,
    },
    [ScreenNames.Date]: {
      options: ({ route }) => ({ title: route.params.title }),
      screen: DateScreen,
    },
    [ScreenNames.PhoneInput]: {
      options: ({ route }) => ({ title: route.params.title }),
      screen: Phone,
    },
    [ScreenNames.IBAN]: {
      options: ({ route }) => ({ title: route.params.title }),
      screen: IBAN,
    },
    [ScreenNames.AllowedKeys]: {
      options: ({ route }) => ({ title: route.params.title }),
      screen: AllowedKeys,
    },
    [ScreenNames.CustomNotations]: {
      options: ({ route }) => ({ title: route.params.title }),
      screen: CustomNotations,
    },
    [ScreenNames.ControlledInput]: {
      options: ({ route }) => ({ title: route.params.title }),
      screen: ControlledInput,
    },
    [ScreenNames.ValidationRegex]: {
      options: ({ route }) => ({ title: route.params.title }),
      screen: ValidationRegex,
    },
    [ScreenNames.ConditionalRendering]: {
      options: ({ route }) => ({ title: route.params.title }),
      screen: ConditionalRendering,
    },
    [ScreenNames.KeyboardControllerWithAutoFocus]: {
      options: ({ route }) => ({ title: route.params.title }),
      screen: () => null,
    },
  },
});

export default RootStack;
