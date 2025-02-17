import { createStaticNavigation } from "@react-navigation/native";
import RootStack from "./Root";
import ScreenNames from "./screenNames";

const Navigation = createStaticNavigation(RootStack);

export { ScreenNames };

export default Navigation;
