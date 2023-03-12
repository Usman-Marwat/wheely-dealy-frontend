import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Button,
} from "react-native";
import React, { useState } from "react";
import niceColors from "nice-color-palettes";
import { AntDesign } from "@expo/vector-icons";
import { SharedElement } from "react-navigation-shared-element";
import * as Animatable from "react-native-animatable";

import AppModal from "../components/AppModal";
import BackButton from "../navigation/BackButton";
import colors from "../config/colors";
import routes from "../navigation/routes";
import Screen from "../components/Screen";

const AnimatableScrollview = Animatable.createAnimatableComponent(ScrollView);
const animation = {
  0: { opacity: 0, translateX: 50 },
  1: { opacity: 1, translateX: 0 },
};

const { height, width } = Dimensions.get("window");
const SPACING = 10;
const colorsPallete = [...niceColors[1], ...niceColors[2]];
const buttons = ["See all the bids", "Give your bid"];

const AdsListDetailsScreen = ({ navigation, route }) => {
  const { item } = route.params;
  const [visible, setVisible] = useState(false);

  return (
    <>
      <BackButton />
      <View>
        <SharedElement id={`item.${item.key}.image`} style={styles.image}>
          <Image
            source={{ uri: item.image }}
            style={{
              resizeMode: "contain",
              width: width * 2.1,
              height: width * 0.7,
            }}
          />
        </SharedElement>
        <View style={styles.meta}>
          <SharedElement id={`item.${item.key}.modal`}>
            <Text numberOfLines={1} adjustsFontSizeToFit style={styles.model}>
              {item.model}
            </Text>
          </SharedElement>
          <SharedElement id={`item.${item.key}.description`}>
            <Text style={styles.description}>{item.description}</Text>
          </SharedElement>
        </View>
        <AnimatableScrollview
          useNativeDriver
          animation={animation}
          delay={400}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ padding: SPACING }}
          style={{ flexGrow: 0, marginVertical: SPACING }}
        >
          {colorsPallete.map((color, index) => {
            return (
              <View
                key={index}
                style={[styles.swatch, { backgroundColor: color }]}
              ></View>
            );
          })}
        </AnimatableScrollview>

        <Animatable.View useNativeDriver animation={animation} delay={700}>
          <TouchableOpacity
            style={styles.rowButton}
            onPress={() => navigation.navigate(routes.BIDS_LIST)}
          >
            <Text>See all the bids</Text>
            <AntDesign name="arrowright" color="rgba(0,0,0,0.8)" size={17} />
          </TouchableOpacity>
          <Button
            title="Give your bid"
            color={colors.medium}
            onPress={() => setVisible(true)}
          />
        </Animatable.View>
      </View>

      <AppModal
        visible={visible}
        heading="Give Your bid"
        onVisible={() => setVisible(false)}
      ></AppModal>
    </>
  );
};

export default AdsListDetailsScreen;

const styles = StyleSheet.create({
  description: {
    fontSize: 12,
    opacity: 0.7,
    position: "absolute",
    top: SPACING + 30,
  },
  image: {
    width: width * 2.1,
    height: width * 0.7,
  },
  meta: {
    position: "absolute",
    top: SPACING * 4,
    left: SPACING,
    width: width * 0.6,
  },
  model: {
    fontSize: 32,
    fontWeight: "700",
    position: "absolute",
  },
  swatch: {
    height: 56,
    width: 56,
    borderRadius: 16,
    marginRight: SPACING,
  },
  rowButton: {
    flexDirection: "row",
    padding: SPACING * 2,
    justifyContent: "space-between",
    borderColor: "rgba(0,0,0,0.1)",
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
});
