import { Animated, StyleSheet, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";

import DrawerAnimationContext from "../contexts/drawerAnimationContext";
import Icon from "../components/Icon";
import { translateMenuFold } from "./navigationAnimations";

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const MenuFoldButton = ({ menuFoldPosition = "absolute" }) => {
  const navigation = useNavigation();
  const { animatedValue } = useContext(DrawerAnimationContext);
  const translateX = translateMenuFold(animatedValue);

  return (
    <AnimatedTouchable
      onPress={() => navigation.openDrawer()}
      style={[
        styles.drawerIcon,
        {
          transform: [{ translateX: translateX }],
          position: menuFoldPosition,
          top: menuFoldPosition === "relative" ? 0 : 35,
          right: menuFoldPosition === "relative" ? 0 : 20,
        },
      ]}
    >
      <Icon
        family="antDesign"
        name="menufold"
        backgroundColor="white"
        size={34}
        iconColor="#222"
      />
    </AnimatedTouchable>
  );
};

export default MenuFoldButton;

const styles = StyleSheet.create({
  drawerIcon: {
    backgroundColor: "transparent",
    zIndex: 1,
  },
});
