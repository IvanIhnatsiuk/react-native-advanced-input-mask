import ScreenNames from "../../navigation/screenNames";

import type { Props as MenuItemProps } from "../../components/MenuItem";

export type MenuItemScreenNames =
  | ScreenNames.PhoneInput
  | ScreenNames.Date
  | ScreenNames.IBAN
  | ScreenNames.AllowedKeys
  | ScreenNames.ControlledInput
  | ScreenNames.ConditionalRendering
  | ScreenNames.KeyboardControllerWithAutoFocus
  | ScreenNames.CustomNotations
  | ScreenNames.ValidationRegex;

export const MENU_ITEMS: Omit<MenuItemProps<MenuItemScreenNames>, "onPress">[] =
  [
    {
      title: "Phone Input",
      info: ScreenNames.PhoneInput,
      testId: "phone-input",
      emoji: "📞",
    },
    {
      title: "Date Input",
      info: ScreenNames.Date,
      testId: "date-input",
      emoji: "📅",
    },
    {
      title: "Custom notations",
      info: ScreenNames.CustomNotations,
      testId: "custom-notations",
      emoji: "🧩",
    },
    {
      title: "IBAN Input",
      info: ScreenNames.IBAN,
      testId: "iban-input",
      emoji: "💳",
    },
    {
      title: "Allowed keys",
      info: ScreenNames.AllowedKeys,
      testId: "allowed-keys",
      emoji: "🔑",
    },
    {
      title: "Controlled Input",
      info: ScreenNames.ControlledInput,
      testId: "controlled-text-input",
      emoji: "🕹",
    },
    {
      title: "Validation Regex",
      info: ScreenNames.ValidationRegex,
      testId: "validation-regex",
      emoji: "🧪",
    },
    {
      title: "Conditional rendering",
      info: ScreenNames.ConditionalRendering,
      testId: "conditional-rendering",
      emoji: "⚙️",
    },
    {
      title: "Keyboard controller with autofocus",
      info: ScreenNames.KeyboardControllerWithAutoFocus,
      testId: "keyboard-controller-with-autofocus",
      emoji: "⌨️",
    },
  ];
