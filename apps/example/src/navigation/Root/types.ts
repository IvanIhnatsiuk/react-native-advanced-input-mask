import type RootStack from "./index";
import type { StaticParamList } from "@react-navigation/native";

export type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
