import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Platform, ScrollView } from "react-native";

import MenuItem from "../../components/MenuItem";

import { MENU_ITEMS } from "./constants";
import styles from "./styles";

const Main = () => {
  const { navigate } = useNavigation();

  if (Platform.OS === "android") {
    console.log(
      "Hello Kiryll. I did this build for iOS platform however this was included as a dead code that will never beeing evaluated",
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.contentContainer}
      style={styles.container}
    >
      {MENU_ITEMS.map((item) => (
        <MenuItem key={item.title} {...item} onPress={navigate} />
      ))}
    </ScrollView>
  );
};

export default Main;
