import {
  Dimensions,
  Image,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
} from "react-native";
import React, { useState, useContext } from "react";
import niceColors from "nice-color-palettes";
import { faker } from "@faker-js/faker";
import { SharedElement } from "react-navigation-shared-element";

import MenuFoldButton from "../navigation/MenuFoldButton";
import Screen from "../components/Screen";
import routes from "../navigation/routes";
import AppModal from "../components/AppModal";

faker.seed(1);
const colors = niceColors[1];

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
  type: faker.commerce.product(),
  subType: faker.commerce.productName(),
  color: `${colors[index % colors.length]}66`,
  fullColor: colors[index % colors.length],

  description: [...Array(2).keys()]
    .map(faker.commerce.productDescription)
    .join(". "),
  price: `$${(faker.random.numeric(200) + 50) / 10}`.substring(0, 7),
  subCategories: faker.helpers.shuffle(data).slice(0, 3),
}));

const { height, width } = Dimensions.get("window");

const ORANGE = "#FB9B06";
const SPACING = 10;
const CELL_WIDTH = width * 0.64;
const CELL_HEIGHT = CELL_WIDTH * 1.4;
const FULL_SIZE = CELL_WIDTH + SPACING * 2;

const Received = ({ navigation }) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <MenuFoldButton />

      <Screen style={{ paddingTop: 40 }}>
        <View>
          <FlatList
            data={fakerData}
            horizontal
            contentContainerStyle={{ padding: SPACING }}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.key}
            snapToInterval={FULL_SIZE}
            decelerationRate="fast"
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("RecievedContractDetails", { item });
                  }}
                  style={styles.itemCell}
                >
                  <View style={styles.itemContainer}>
                    <SharedElement
                      id={`item.${item.key}.bg`}
                      style={[StyleSheet.absoluteFillObject]}
                    >
                      <View
                        style={[
                          StyleSheet.absoluteFillObject,
                          { backgroundColor: item.color, borderRadius: 16 },
                        ]}
                      />
                    </SharedElement>
                    <SharedElement
                      id={`item.${item.key}.meta`}
                      style={StyleSheet.absoluteFillObject}
                    >
                      <View style={styles.textContainer}>
                        <Text style={styles.type}>{item.type}</Text>
                        <Text style={styles.subType}>{item.subType}</Text>
                      </View>
                    </SharedElement>
                    <SharedElement
                      id={`item.${item.key}.image`}
                      style={styles.image}
                    >
                      <Image
                        source={{ uri: item.image }}
                        style={styles.image}
                      />
                    </SharedElement>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>

        <Button title="Add Car Requirement" onPress={() => setVisible(true)} />

        <View>
          <FlatList
            data={[...Array(20).keys()]}
            keyExtractor={(item) => item}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    height: 50,
                    width: "80%",
                    marginVertical: 30,
                    backgroundColor: "orange",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text>{item}</Text>
                </View>
              );
            }}
          />
        </View>
      </Screen>
      <AppModal
        visible={visible}
        heading="Add Your Car Requirements"
        onVisible={() => setVisible(false)}
      ></AppModal>
    </>
  );
};

export default Received;

const styles = StyleSheet.create({
  itemCell: {
    height: CELL_WIDTH,
    width: CELL_WIDTH,
    margin: SPACING,
  },
  itemContainer: {
    flex: 1,
    padding: SPACING,
    justifyContent: "center",
  },
  image: {
    width: CELL_WIDTH * 0.5,
    height: CELL_WIDTH * 0.5,
    alignSelf: "center",
    resizeMode: "contain",
    position: "absolute",
    right: 7,
    bottom: 20,
  },

  subType: {
    color: "grey",
  },
  type: { fontWeight: "800" },
  textContainer: {
    position: "absolute",
    left: SPACING,
    top: SPACING * 2,
  },
});
