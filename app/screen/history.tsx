import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import Text, { fontFamily } from "@/components/text";
import { BackButton } from "@/components/button/backButton";
import { Colors } from "@/constants/colors";
import { deliveryHistory } from "@/constants/constants";
import { size } from "@/constants/fonts";
import { SafeAreaView } from "react-native-safe-area-context";
import { STORAGE_KEY, viewHistory } from "@/utils/string";
import { DeliveryRequest } from "@/constants/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigationRef } from "@/navigation/rootNavigationRef";
import { useFocusEffect } from "@react-navigation/native";
import { splitDateTime } from "@/utils/dateSplitter";

export default function History() {
  const [history, setHistory] = useState<DeliveryRequest[]>([]);

  const loadHistory = async () => {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    const parsed = stored ? JSON.parse(stored) : [];
    setHistory(parsed.reverse());
  };

  useFocusEffect(
    useCallback(() => {
      loadHistory();
    }, [])
  );

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.statusContainer}>
        <Text style={styles.dateTime}>
          {splitDateTime(item?.createdAt).date} •{" "}
          {splitDateTime(item?.createdAt).time}
        </Text>
        <Text>{item?.synced ? "🟢" : "🔴"}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Pickup:</Text>
        <Text style={styles.location}>{item.pickupAddress}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Drop-off:</Text>
        <Text style={styles.location}>{item.dropOffAddress}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.main}>
      <BackButton />
      <Text style={styles.headingStyles}>{viewHistory}</Text>
      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.container}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 16,
  },
  container: {
    paddingBottom: 32,
  },
  headingStyles: {
    marginBottom: 24,
    fontSize: size.input,
    fontFamily: fontFamily.Sans_SemiBold,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dateTime: {
    marginBottom: 8,
    color: Colors.dark4,
    fontSize: size.small,
  },
  row: {
    flexDirection: "row",
    marginBottom: 4,
  },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    width: 80,
    color: Colors.text,
    fontSize: size.medium,
  },
  location: {
    flex: 1,
    color: Colors.dark1,
    fontSize: size.medium,
  },
});
