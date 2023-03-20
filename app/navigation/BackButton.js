import { TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import Icon from "../components/Icon";

const BackButton = ({
  iconName = "chevron-left",
  iconBg = "#fff",
  containerStyle,
}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={containerStyle}
    >
      <Icon
        family="mci"
        name={iconName}
        backgroundColor={iconBg}
        iconColor="#222"
        size={34}
      />
    </TouchableOpacity>
  );
};

export default BackButton;
