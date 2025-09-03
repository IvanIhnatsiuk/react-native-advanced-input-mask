import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ScrollView } from "react-native";

import MenuItem from "../../components/MenuItem";

import { MENU_ITEMS } from "./constants";
import styles from "./styles";

const Main = () => {
  const { navigate } = useNavigation();

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
