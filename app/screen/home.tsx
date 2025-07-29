import React from "react";
import {
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { homeView } from "@/constants/constants";
import Text, { fontFamily } from "@/components/text";
import { navigate } from "@/navigation/rootNavigationRef";
import { SafeAreaView } from "react-native-safe-area-context";
import { size } from "@/constants/fonts";

export default function Home() {
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        {homeView.map((card) => (
          <TouchableOpacity
            key={card.id}
            onPress={() => navigate(card.navigation, {})}
            style={styles.card}
          >
            <Image
              source={card.image}
              style={styles.image}
              resizeMode="cover"
            />
            <Text style={styles.title}>{card.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const { width } = Dimensions.get("window");
const CARD_WIDTH = width / 2 - 24;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    padding: 8,
    marginTop: 16,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginVertical: 12,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    alignItems: "center",
  },
  image: {
    height: 62,
    width: 62,
    padding: 8,
    marginTop: 16,
  },
  title: {
    padding: 12,
    textAlign: "center",
    fontSize: size.regular,
    fontFamily: fontFamily.Sans_Medium,
  },
});
