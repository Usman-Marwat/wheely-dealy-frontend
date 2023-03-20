import {
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import { SharedElement } from "react-navigation-shared-element";

import colors from "../config/colors";
import routes from "../navigation/routes";
import MenuFoldButton from "../navigation/MenuFoldButton";

faker.seed(1);

const SPACING = 10;
const tabs = [
  "All",
  "Filter-1",
  "Filter-2",
  "Filter-3",
  "Filter-4",
  "Filter-5",
  "Filter-6",
  "Filter-7",
];
const data = [
  {
    image:
      "https://www.vwimg.com/mod/v2/VW/5H0-2023-MULTI/5H0-2023-MP1/20221010/en-US-us/0Q0Q/OB/0B1,0EN,0FA,0K0,0N4,0P0,0PJ,0TD,1D0,1E7,1G8,1J2,1KF,1LM,1R2,1X1,1XF,2CM,2F0,2I0,2JF,31K,3B7,3CA,3FB,3H0,3LJ,3NU,3Q9,4A4,4D3,4E0,4GF,4K7,4KC,4L6,4P0,4QR,4UM,4X3,4ZQ,5C1,5F1,5JC,5TE,5XX,6E5,6FH,6I2,6Q6,6T2,6XR,6Y7,7B2,7CE,7J2,7P7,7UG,7X5,7Y1,8AR,8IT,8J3,8L6,8N6,8Q5,8T3,8TH,8VG,8WM,8Z6,9JA,9M0,9P7,9VG,9Z0,9ZV,A9R,AV2,B0T,CS7,DR5,E0A,EL5,ER3,G0L,GW0,K8G,KA2,KH7,KS1,L0L,N6L,NZ4,Q4P,QJ1,QK1,QQ9,QU8,T3W,U9E,UD2,UH1,VF1/D6MOFASideview/b19d7b4a-df80-487c-908a-47785dbb35fc/eae7fc0f433da668079c5e19dd5d40d330dfd8419d54d084a13691e649b3e498.png?width=864",
  },
  {
    image:
      "https://www.vwimg.com/mod/v2/VW/55N-2023-MULTI/55N-2023-MP2/20230109/en-US-us/0Q0Q/BG/0B4,0EW,0FL,0NB,0RE,1D8,1E1,1LB,1NL,1SA,1U8,1X0,2EM,2FB,2H0,2J0,31N,3B7,3CA,3FA,3GK,3H0,3KP,3L3,3LF,3Q9,3S2,3ZD,4A3,4D0,4E0,4F6,4GF,4KF,4L2,4UM,4X3,4ZE,5C1,5D2,5MA,5RR,5SH,5XX,5ZF,6E1,6FB,6I0,6K2,6M0,6NA,6Q2,6XN,7B3,7CB,7IZ,7J1,7L6,7M5,7N1,7P0,7Q0,7X0,7Y1,8G0,8IR,8L6,8N8,8RL,8SL,8T2,8TA,8WA,8Z6,9C9,9E5,9JA,9M0,9P7,9Z0,9ZX,A8B,AV2,B0T,BU2,C7J,DR9,E0A,EL2,ER3,G1F,I8I,K8G,KA1,KH6,KL1,KN0,KS0,L0L,N4D,NZ4,Q1A,QH0,QJ0,QK0,QQ0,QV0,T6C,U5C,U9G,UD0,UH1,UK3,VC0,VF0/D6MOFASideview/b19d7b4a-df80-487c-908a-47785dbb35fc/00cf0ea2f6e3aa9de66f4f9a407756acc1e2671a52529a5e5c105388df5688db.png?width=864",
  },
  {
    image:
      "https://www.vwimg.com/mod/v2/VW/3H0-2023-MULTI/3H0-2023-MP1/20220919/en-US-us/C2C2/TO/0B5,0FA,0IJ,0K0,0P1,0RF,0TD,1A7,1D0,1E7,1G6,1LB,1Q2,1SA,1X9,2ER,2F0,2I0,2JX,2PT,3B7,3CA,3FA,3KB,3L5,3LF,3Q9,3ZD,45S,4A3,4B4,4D0,4F6,4GF,4KC,4L6,4UT,4X3,4ZN,5C1,5D2,5I3,5RR,5SH,5TH,5XX,5ZG,6I6,6K3,6NW,6Q2,6XU,7B6,7L6,7M1,7P1,7UT,7X2,7Y1,7ZS,8AR,8D6,8FA,8G0,8IU,8N6,8Q5,8RM,8S6,8SL,8T3,8TH,8WM,9C9,9JF,9M0,9P7,9S0,9TJ,9Z0,9ZV,A8B,AV2,B0T,BU2,E0A,EL5,ER3,FB0,FN7,G1C,GP1,K8C,KA2,KH0,KS0,L0L,MK2,N4S,NZ4,Q4H,QA0,QJ3,QK1,QQ0,QU8,T3W,U5C,UH2,VF1/D6MOFASideview/b19d7b4a-df80-487c-908a-47785dbb35fc/c02cde7a09eb4dde3a5f5dfcc9f47aeb1c79a1f2ec50c14146c06228d3d0d25e.png?width=864",
  },
  {
    image:
      "https://www.vwimg.com/mod/v2/VW/2GM-2023-MULTI/2GM-2023-MP1/20230116/en-US-us/2R2R/DB/0A2,0B3,0FL,0IH,0K0,0N1,1D0,1G9,1J0,1NL,1X0,1ZL,2DN,2EJ,2H0,2JB,2W3,2ZL,3C8,3CA,3FA,3H0,3L1,3NU,3Q9,3S2,41S,4A0,4AF,4D0,4E0,4GF,4I8,4KC,4L2,4P6,4QT,4R4,4UM,4X3,4ZE,5C1,5D2,5MA,5RR,5SH,5XX,5ZF,6E1,6FJ,6I0,6K2,6KL,6LZ,6NA,6Q1,6XC,7B0,7J1,7L6,7N0,7Q0,7U2,7W0,7X0,7Y8,8G0,8IT,8L6,8N8,8Q0,8RJ,8S4,8SL,8T2,8TA,8WA,9E1,9JA,9M0,9P7,9T0,9WT,9ZX,A8B,AV2,B0T,EL2,ER3,G1F,I8I,K8G,KA1,KH6,KL1,L0L,M5D,N0B,NZ4,Q1A,QJ0,QK0,QQ0,QV0,T3G,U5C,U9G,UD0,UH1,UK1,VF0/D6MOFASideview/b19d7b4a-df80-487c-908a-47785dbb35fc/419e28bdd56013e59d07cd800a31ca991a87101ac5b32fdfa82960e552b2ad00.png?width=864",
  },
  {
    image:
      "https://www.vwimg.com/mod/v2/VW/55N-2023-MULTI/55N-2023-MP2/20230109/en-US-us/0Q0Q/BG/0B4,0EW,0FL,0NB,0RE,1D8,1E1,1LB,1NL,1SA,1U8,1X0,2EM,2FB,2H0,2J0,31N,3B7,3CA,3FA,3GK,3H0,3KP,3L3,3LF,3Q9,3S2,3ZD,4A3,4D0,4E0,4F6,4GF,4KF,4L2,4UM,4X3,4ZE,5C1,5D2,5MA,5RR,5SH,5XX,5ZF,6E1,6FB,6I0,6K2,6M0,6NA,6Q2,6XN,7B3,7CB,7IZ,7J1,7L6,7M5,7N1,7P0,7Q0,7X0,7Y1,8G0,8IR,8L6,8N8,8RL,8SL,8T2,8TA,8WA,8Z6,9C9,9E5,9JA,9M0,9P7,9Z0,9ZX,A8B,AV2,B0T,BU2,C7J,DR9,E0A,EL2,ER3,G1F,I8I,K8G,KA1,KH6,KL1,KN0,KS0,L0L,N4D,NZ4,Q1A,QH0,QJ0,QK0,QQ0,QV0,T6C,U5C,U9G,UD0,UH1,UK3,VC0,VF0/D6MOFASideview/b19d7b4a-df80-487c-908a-47785dbb35fc/00cf0ea2f6e3aa9de66f4f9a407756acc1e2671a52529a5e5c105388df5688db.png?width=864",
  },
  {
    image:
      "https://www.vwimg.com/mod/v2/VW/5H0-2023-MULTI/5H0-2023-MP1/20221010/en-US-us/C2C2/UG/0B1,0EN,0FA,0K0,0N4,0NH,0P0,0TD,1A7,1D0,1E7,1G9,1J2,1KJ,1LI,1X0,2CM,2F0,2H5,2JG,2PS,31K,3B7,3CA,3FA,3H0,3LT,3NU,3PT,3Q9,4A3,4D0,4E0,4GF,4I8,4KC,4L6,4P0,4QR,4UM,4X3,4ZQ,5C1,5F1,5JC,5MR,5XX,6E5,6FF,6I2,6Q6,6T2,6XR,6Y8,7B2,7CE,7J2,7P4,7Q0,7X2,7Y1,8G0,8IT,8J3,8L6,8N6,8Q5,8RT,8T3,8TH,8VG,8WH,8Z6,9JA,9M0,9P7,9Z0,9ZV,A8H,AV2,B0T,C0Z,DQ4,E0A,EL2,ER3,G0K,GW0,I8Q,K8G,KA2,KC0,KS0,L0L,N2T,NZ4,Q0E,Q4P,QJ1,QK1,QQ9,T3J,U9E,UD1,UH1,VF1/D6MOFASideview/b19d7b4a-df80-487c-908a-47785dbb35fc/23c4b1b2d62e44777816587d28b260a37719772cb718bf35e511009bd81ad2fe.png?width=864",
  },
  {
    image:
      "https://www.vwimg.com/mod/v2/VW/17A-2023-MULTI/17A-2023-MP2/20230109/en-US-us/4C4C/BG/0A2,0B3,0EJ,0K0,0N1,0TA,1A7,1Q0,1SA,1T0,1TJ,1X0,1ZQ,2EJ,2FB,2I1,2JB,2W3,31G,3FA,3H0,3L1,3LJ,3NZ,3ZD,4A0,4D0,4GF,4K0,4KC,4L2,4P1,4QQ,4R4,4UM,4X3,4ZH,5C1,5D2,5MA,5RR,5SH,5XZ,5ZF,6E4,6FF,6I0,6K2,6KC,6NA,6Q1,6XN,7B0,7CB,7J1,7L3,7M5,7Q0,7R4,7U0,7W0,7X0,7Y8,8G0,8IT,8L6,8M0,8N8,8Q0,8RJ,8SQ,8T2,8TA,8WA,9JF,9M0,9P7,9U0,9WT,9ZX,A8A,AV2,B0T,C3L,E0A,EL2,ER3,G0K,GP1,I8I,K8B,KA1,KH6,KL1,L0L,M5D,N2E,NZ4,Q2J,QD3,QJ3,QK0,QQ0,QV0,U5C,U9G,UD0,UH1,VF0/D6MOFASideview/b19d7b4a-df80-487c-908a-47785dbb35fc/91e98ecf6e7d124ec0763e19ee9a669d572854fd302a070832b4913b01f9b2c0.png?width=864",
  },
  {
    image:
      "https://www.vwimg.com/mod/v2/VW/11K-2023-MP1/-/20230220/en-US-us/P2P2/ZX/1J0,1KB,1LN,1SA,1X2,2H5,2JB,3FA,3GA,3L3,3Q9,3S2,4AF,4E0,4GF,4K7,4KF,4L6,4N3,4QR,4UM,5C1,5F1,5IM,5JC,6H0,6XN,7UT,7W0,7Y1,8A2,8AV,8IR,8VG,9P7,9T1,AV2,EL5,ER3,ES6,FT4,GW0,J9C,K8G,KA2,KH4,KS0,L0L,N4G,NI0,NZ4,QU8,QW5,U60,UD1,VF0/D6MOFASideview/b19d7b4a-df80-487c-908a-47785dbb35fc/5135107743490fc07455a270957501ec0fd0838a91f2e7ab8a20736bdf8cdcce.png?width=864",
  },
];
const fakerData = data.map((item, index) => ({
  ...item,
  key: faker.datatype.uuid(),
  model: faker.vehicle.manufacturer(),
  price: faker.commerce.price(),
  description: [...Array(2).keys()]
    .map(faker.vehicle.vehicle)
    .join(". ")
    .substring(0, 30),
}));
const ITEM_SIZE = 120;
const BG_COLOR = "#C1CEE077";

const AdsListScreen = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  return (
    <View style={{ paddingBottom: 10 }}>
      <MenuFoldButton />
      <Button
        title="Add"
        color={colors.medium}
        onPress={() => navigation.navigate(routes.ADS_EDIT)}
      />
      {/* <View>
        <FlatList
          data={tabs}
          horizontal
          style={{ flexGrow: 1, marginHorizontal: 30 }}
          contentContainerStyle={{ padding: SPACING }}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => `${item}-${index}`}
          renderItem={({ item: tab }) => {
            return (
              <TouchableOpacity onPress={() => setSelectedTab(tab)}>
                <View
                  style={[
                    styles.pill,
                    {
                      backgroundColor:
                        selectedTab === tab ? "grey" : "transparent",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.pillText,
                      { color: selectedTab === tab ? "white" : "#000" },
                    ]}
                  >
                    {tab}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View> */}

      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: SPACING }}
        data={fakerData}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(routes.ADS_LIST_DETAIL, { item })
              }
            >
              <View style={styles.item}>
                <View>
                  <SharedElement id={`item.${item.key}.modal`}>
                    <Text style={styles.model}>{item.model}</Text>
                  </SharedElement>
                  <SharedElement id={`item.${item.key}.description`}>
                    <Text style={styles.description}>{item.description}</Text>
                  </SharedElement>
                  <SharedElement>
                    <Text style={styles.price}>$ {item.price}</Text>
                  </SharedElement>
                </View>
                <SharedElement
                  id={`item.${item.key}.image`}
                  style={styles.image}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={{ flex: 1, resizeMode: "contain" }}
                  />
                </SharedElement>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default AdsListScreen;

const styles = StyleSheet.create({
  description: {
    fontSize: 12,
    opacity: 0.7,
    position: "absolute",
    top: SPACING + 17,
  },
  item: {
    height: ITEM_SIZE * 1.7,
    borderRadius: 12,
    marginBottom: SPACING,
    padding: SPACING,
    backgroundColor: BG_COLOR,
    overflow: "hidden",
  },
  image: {
    height: ITEM_SIZE * 1.2,
    width: "100%",
    position: "absolute",
    bottom: 10,
    right: "-30%",
  },
  model: {
    fontSize: 18,
    fontWeight: "700",
    position: "absolute",
  },
  price: {
    fontSize: 12,
    fontWeight: "700",
    opacity: 0.7,
    position: "absolute",
    top: SPACING + 47,
  },
  pill: {
    paddingHorizontal: SPACING,
    paddingVertical: SPACING / 2,
    borderRadius: 12,
  },
  pillText: {
    fontWeight: "700",
  },
});
