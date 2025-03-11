import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AllowedKeys from "../../screens/AllowedKeys";
import ControlledInput from "../../screens/ControlledInput";
import CustomNotations from "../../screens/CustomNotations";
import DateScreen from "../../screens/Date";
import IBAN from "../../screens/IBAN";
import Main from "../../screens/Main";
import Phone from "../../screens/Phone";
import RNTextInput from "../../screens/RNTextInput";
import ValidationRegex from "../../screens/ValidationRegEx";
import ScreenNames from "../screenNames";

const RootStack = createNativeStackNavigator({
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
      options: {
        title: "Date Input 📅",
      },
      screen: DateScreen,
    },
    [ScreenNames.PhoneInput]: {
      options: {
        title: "Phone Input 📞",
      },
      screen: Phone,
    },
    [ScreenNames.IBAN]: {
      options: {
        title: "IBAN Input 💳",
      },
      screen: IBAN,
    },
    [ScreenNames.AllowedKeys]: {
      options: {
        title: "Allowed keys 🔑",
      },
      screen: AllowedKeys,
    },
    [ScreenNames.CustomNotations]: {
      options: {
        title: "Custom notations 🧩",
      },
      screen: CustomNotations,
    },
    [ScreenNames.ControlledInput]: {
      options: {
        title: "Controlled Input 🕹",
      },
      screen: ControlledInput,
    },
    [ScreenNames.ValidationRegex]: {
      options: {
        title: "Validation Regex 🧪",
      },
      screen: ValidationRegex,
    },
  },
});

export default RootStack;
