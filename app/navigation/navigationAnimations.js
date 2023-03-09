import { Animated, Dimensions } from "react-native";

const { width, height } = Dimensions.get("screen");
const DURATION = 400;

export const translateMenuFold = (animatedValue) => {
  const translateX = animatedValue.y.interpolate({
    inputRange: [0, height * 0.17],
    outputRange: [100, 0],
    extrapolate: "clamp",
  });
  return translateX;
};

export const makeAnimate = (
  animatedWidth,
  animatedValue,
  fromCords,
  toCords
) => {
  return function animate(toValue) {
    if (toValue === 1) {
      animatedWidth.setValue(width);
    }
    const animations = [
      Animated.timing(animatedValue, {
        toValue: toValue === 1 ? toCords : fromCords,
        duration: DURATION,
        useNativeDriver: true,
      }),
      Animated.timing(animatedWidth, {
        toValue: toValue === 1 ? width : 0,
        duration: 0,
        useNativeDriver: false,
      }),
    ];
    return Animated.sequence(toValue === 0 ? animations : animations.reverse());
  };
};

export const interpolateValues = (animatedValue) => {
  const translateX = animatedValue.x.interpolate({
    inputRange: [0, width],
    outputRange: [-100, 0],
  });
  const opacity = animatedValue.x.interpolate({
    inputRange: [0, width],
    outputRange: [0, 1],
  });
  return { translateX, opacity };
};
//   const handleOpenDrawer = useCallback(() => {
//     animate(1).start();
//   }, []);
