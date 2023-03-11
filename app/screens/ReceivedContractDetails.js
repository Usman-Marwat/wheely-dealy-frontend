import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import * as Animatable from "react-native-animatable";
import { SharedElement } from "react-navigation-shared-element";

import Screen from "../components/Screen";

const { height, width } = Dimensions.get("window");
const SPACING = 10;
const CELL_WIDTH = width * 0.64;

const DURATION = 400;
const animation = {
  0: { opacity: 0, translateY: 100 },
  1: { opacity: 1, translateY: 0 },
};
const createAnimation = (from) => ({
  0: { opacity: 0, translateY: -100, translateX: from },
  1: { opacity: 1, translateY: 0, translateX: 0 },
});
const animations = [
  createAnimation(100),
  createAnimation(0),
  createAnimation(-100),
];

const ReceivedContractDetails = ({ navigation, route }) => {
  const { item } = route.params;

  return (
    <Screen>
      <SharedElement
        id={`item.${item.key}.bg`}
        style={[
          StyleSheet.absoluteFillObject,
          { backgroundColor: item.color, borderRadius: 16 },
        ]}
      >
        <View style={[StyleSheet.absoluteFillObject]} />
      </SharedElement>
      <SharedElement id={`item.${item.key}.meta`}>
        <View style={styles.textContainer}>
          <Text style={styles.type}>{item.type}</Text>
          <Text style={styles.subType}>{item.subType}</Text>
        </View>
      </SharedElement>
      <View style={{ marginTop: height * 0.1 }}>
        <SharedElement id={`item.${item.key}.image`} style={styles.image}>
          <Image source={{ uri: item.image }} style={styles.image} />
        </SharedElement>
        <View style={styles.iconImageContainer}>
          {item.subCategories.map((subCategory, index) => {
            return (
              <Animatable.View
                animation={animations[index]}
                delay={DURATION}
                useNativeDriver
                iterationCount={3}
                key={index}
                style={{
                  backgroundColor: "white",
                  padding: SPACING,
                  borderRadius: 50,
                }}
              >
                <Image
                  style={styles.iconImage}
                  source={{ uri: subCategory.image }}
                />
              </Animatable.View>
            );
          })}
        </View>
      </View>
      <View style={{ padding: SPACING }}>
        <Animatable.Text
          useNativeDriver
          animation={animation}
          delay={DURATION + 300}
          style={styles.price}
        >
          {item.price}
        </Animatable.Text>
        <Animatable.Text
          useNativeDriver
          animation={animation}
          delay={DURATION + 400}
          style={styles.description}
        >
          {item.description}
        </Animatable.Text>
      </View>
    </Screen>
  );
};

export default ReceivedContractDetails;

const styles = StyleSheet.create({
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: "rgba(0,0,0,0.7)",
  },
  image: {
    width: CELL_WIDTH * 0.7,
    height: CELL_WIDTH * 0.7,
    alignSelf: "center",
    resizeMode: "contain",
    marginVertical: SPACING * 2,
    marginBottom: SPACING * 4,
    zIndex: 2,
  },
  iconImageContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: SPACING * 3,
  },
  iconImage: {
    width: 32,
    height: 32,
    resizeMode: "contain",
  },
  price: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: SPACING / 2,
  },
  subType: {
    color: "grey",
  },
  type: { fontWeight: "800" },
  textContainer: {
    position: "absolute",
    left: SPACING * 2,
    top: SPACING * 4,
  },
});
