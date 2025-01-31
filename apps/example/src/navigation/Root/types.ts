import type { StaticParamList } from '@react-navigation/native';
import RootStack from './index';

export type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
