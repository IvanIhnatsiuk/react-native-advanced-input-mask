import { useRef } from 'react';
import { Animated } from 'react-native';

const useAnimatedValue = (initialValue: number): Animated.Value => {
  const ref = useRef<null | Animated.Value>(null);

  if (ref.current === null) {
    ref.current = new Animated.Value(initialValue);
  }

  return ref.current;
};

export default useAnimatedValue;
