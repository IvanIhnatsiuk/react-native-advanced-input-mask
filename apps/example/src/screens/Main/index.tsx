import { useNavigation } from "@react-navigation/native";
import React, { useCallback } from "react";
import { ScrollView } from "react-native";

import MenuItem, { type PressParams } from "../../components/MenuItem";

import { MENU_ITEMS, type MenuItemScreenNames } from "./constants";
import styles from "./styles";

import type { RootStackParamList } from "../../navigation/Root/types";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

const Main = () => {
  const { navigate } =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleMenuItemPress = useCallback(
    ({ info, title, emoji }: PressParams<MenuItemScreenNames>) =>
      // @ts-expect-error looks like navigation types are wrong and
      // title doesn't exist in the Main route. However, we don't use the main route here
      navigate(info, { title: `${title} ${emoji}` }),
    [navigate],
  );

  return (
    <ScrollView
      contentContainerStyle={styles.contentContainer}
      style={styles.container}
    >
      {MENU_ITEMS.map((item) => (
        <MenuItem<MenuItemScreenNames>
          key={item.title}
          {...item}
          onPress={handleMenuItemPress}
        />
      ))}
    </ScrollView>
  );
};

export default Main;
