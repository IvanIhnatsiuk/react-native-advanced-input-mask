import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ScreenNames from "../screenNames";
import Main from "../../screens/Main";
import RNTextInput from "../../screens/RNTextInput";
import DateScreen from "../../screens/Date";
import Phone from "../../screens/Phone";
import IBAN from "../../screens/IBAN";
import AllowedKeys from "../../screens/AllowedKeys";
import CustomNotations from "../../screens/CustomNotations";
import ControlledInput from "../../screens/ControlledInput";
import ValidationRegex from "../../screens/ValidationRegEx";

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
