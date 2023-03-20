import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { SharedElement } from "react-navigation-shared-element";
import * as Animatable from "react-native-animatable";

import Header from "../components/Header";

const { width } = Dimensions.get("screen");
const SIZE = 64;
const SPACING = 12;
const s = width * 0.68;
const ITEM_WIDTH = s;

const zoomIn = {
  0: {
    opacity: 0,
    scale: 0,
  },
  1: {
    opacity: 1,
    scale: 1,
  },
};

const BlogsListDetails = ({ navigation, route }) => {
  const { item } = route.params;

  return (
    <>
      <Header />
      <SharedElement
        id={`item.${item.key}.photo`}
        style={[StyleSheet.absoluteFillObject]}
      >
        <Image
          source={{ uri: item.image }}
          style={[StyleSheet.absoluteFillObject]}
        />
      </SharedElement>
      <SharedElement id={`item.${item.key}.shopName`}>
        <Text style={[styles.shopName]}>{item.shopName}</Text>
      </SharedElement>
      <View style={styles.locationContainer}>
        <Text style={styles.location}>Locations</Text>
        <FlatList
          data={[...Array(8).keys()]}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ padding: SPACING }}
          renderItem={({ item, index }) => {
            return (
              <Animatable.View
                animation={zoomIn}
                duration={700}
                delay={400 + index * 100}
                style={styles.mapContainer}
              >
                <Image
                  source={{
                    uri: "https://img.freepik.com/free-vector/informational-city-map-with-streets-name_23-2148309621.jpg?w=1800&t=st=1665058548~exp=1665059148~hmac=c1ba21ab8e84c3261052035695b73e1bdb5fe01e1b1ea0afb3b63e9ac176079e",
                  }}
                  style={styles.mapImage}
                />
                <Text style={styles.locationText}>Location #{item + 1}</Text>
              </Animatable.View>
            );
          }}
        />
      </View>
    </>
  );
};

export default BlogsListDetails;

const styles = StyleSheet.create({
  shopName: {
    fontSize: 30,
    color: "#fff",
    fontWeight: "800",
    width: ITEM_WIDTH * 0.8,
    textTransform: "uppercase",
    position: "absolute",
    top: 70,
    left: SPACING * 2,
  },
  locationContainer: {
    position: "absolute",
    top: 250,
  },
  location: {
    fontSize: 16,
    width: "100%",
    textTransform: "uppercase",
    fontWeight: "800",
    color: "#fff",
    marginHorizontal: SPACING,
  },
  locationText: {
    fontWeight: "700",
    marginTop: 10,
  },
  mapContainer: {
    backgroundColor: "#fff",
    padding: SPACING,
    width: width * 0.33,
    height: width * 0.5,
    marginRight: SPACING,
  },
  mapImage: {
    width: "100%",
    height: "70%",
    resizeMode: "cover",
  },
});
