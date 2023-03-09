import React, { useState, useRef } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";
import _ from "lodash";
import niceColors from "nice-color-palettes";

import AppButton from "./AppButton";
import colors from "../config/colors";

const colorsP = [
  "#3F5B98",
  ...niceColors[39],
  "#FCBE4A",
  "#FD5963",
  ...niceColors[8],
  "#FECBCD",
  ...niceColors[10].slice(1, 5),
  ...niceColors[6],
];

const CategoriesPicker = ({
  categories,
  items,
  numberOfcolumns,
  onAddCategory,
  onRemoveCategory,
  PickerItemComponent,
}) => {
  const scrollView = useRef();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollView}
        horizontal
        showsHorizontalScrollIndicator={false}
        onContentSizeChange={() => scrollView.current.scrollToEnd()}
      >
        {categories.map((category, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={styles.itemContainer}
              onPress={() => onRemoveCategory(category)}
            >
              <View
                style={[
                  styles.listItemDot,
                  { backgroundColor: colorsP[index] },
                ]}
              />
              <Text style={styles.fileName}>{category}</Text>
            </TouchableOpacity>
          );
        })}
        <AppButton
          style={styles.appButton}
          titleStyle={{ fontSize: 12, color: colors.medium }}
          title="Select-Categories"
          onPress={() => setModalVisible(true)}
        />
      </ScrollView>
      <Modal visible={modalVisible} animationType="slide">
        <Button title="Close" onPress={() => setModalVisible(false)} />
        <FlatList
          data={items}
          keyExtractor={(item) => item.value.toString()}
          numColumns={numberOfcolumns}
          renderItem={({ item }) => (
            <PickerItemComponent
              item={item}
              label={item.label}
              onPress={() => {
                setModalVisible(false);
                onAddCategory(item);
              }}
            />
          )}
        />
      </Modal>
    </View>
  );
};

export default CategoriesPicker;

const styles = StyleSheet.create({
  appButton: {
    width: 170,
    marginRight: 20,
    padding: 7,
    backgroundColor: colors.light,
  },
  container: {
    justifyContent: "center",
    height: 40,
    marginVertical: 10,
  },
  itemContainer: {
    alignItems: "center",
    backgroundColor: colors.light,
    flexDirection: "row",
    borderRadius: 40,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  list: {
    flexDirection: "row",
    alignItems: "center",
  },
  listItemDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    marginHorizontal: 7,
    backgroundColor: "black",
  },
});
