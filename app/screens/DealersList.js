import {
  Dimensions,
  Image,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import niceColors from "nice-color-palettes";
import { faker } from "@faker-js/faker";
import { SharedElement } from "react-navigation-shared-element";

import Screen from "../components/Screen";
import routes from "../navigation/routes";
import Header from "../components/Header";

faker.seed(1);
const colors = [
  ...niceColors[1].slice(1, niceColors[1].length),
  ...niceColors[55].slice(0, 3),
];

const data = [
  { image: "https://cdn-icons-png.flaticon.com/512/8360/8360483.png" },
  { image: "https://cdn-icons-png.flaticon.com/512/8360/8360535.png" },
  { image: "https://cdn-icons-png.flaticon.com/512/5046/5046935.png" },
  { image: "https://cdn-icons-png.flaticon.com/512/7153/7153980.png" },
  { image: "https://cdn-icons-png.flaticon.com/512/7880/7880183.png" },
  { image: "https://cdn-icons-png.flaticon.com/512/5046/5046934.png" },
  { image: "https://cdn-icons-png.flaticon.com/512/6664/6664537.png" },
  { image: "https://cdn-icons-png.flaticon.com/512/4982/4982394.png" },
];

const fakerData = data.map((item, index) => ({
  ...item,
  key: faker.datatype.uuid(),
  color: colors[index % colors.length],
  name: faker.name.firstName(),
  jobTitle: faker.name.jobTitle(),
  categories: [...Array(3).keys()].map(() => {
    return {
      key: faker.datatype.uuid(),
      title: faker.name.jobType(),
      subcats: [...Array(5).keys()].map(faker.name.jobType),
    };
  }),
}));

const { height, width } = Dimensions.get("window");
const ITEM_HEIGHT = height * 0.18;
const SPACING = 10;

const DealersList = ({ navigation }) => {
  return (
    <Screen style={styles.container}>
      <Header />
      <FlatList
        contentContainerStyle={{ padding: SPACING }}
        data={fakerData}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(routes.DEALERSLISTDETAILS, { item });
              }}
              style={styles.itemWrapper}
            >
              <View style={{ flex: 1, padding: SPACING }}>
                <SharedElement
                  id={`item.${item.key}.bg`}
                  style={StyleSheet.absoluteFillObject}
                >
                  <View style={[styles.bg, { backgroundColor: item.color }]} />
                </SharedElement>
                <SharedElement id={`item.${item.key}.name`}>
                  <Text style={styles.name}>{item.name}</Text>
                </SharedElement>
                <Text style={styles.jobTitle}>{item.jobTitle}</Text>
                <SharedElement
                  id={`item.${item.key}.image`}
                  style={styles.image}
                >
                  <Image source={{ uri: item.image }} style={styles.image} />
                </SharedElement>
              </View>
            </TouchableOpacity>
          );
        }}
      />
      <SharedElement id="general.bg">
        <View style={styles.overlay} />
      </SharedElement>
    </Screen>
  );
};

export default DealersList;

const styles = StyleSheet.create({
  bg: {
    borderRadius: 16,
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    flex: 1,
  },
  image: {
    width: ITEM_HEIGHT * 0.8,
    height: ITEM_HEIGHT * 0.8,
    resizeMode: "contain",
    position: "absolute",
    bottom: 0,
    right: SPACING,
  },
  itemWrapper: {
    marginBottom: SPACING,
    height: ITEM_HEIGHT,
  },
  jobTitle: {
    fontSize: 11,
    opacity: 0.7,
  },
  name: {
    fontWeight: "700",
    fontSize: 18,
  },
  overlay: {
    position: "absolute",
    width,
    height,
    backgroundColor: "red",
    transform: [{ translateY: height }],
    borderRadius: 32,
  },
});
