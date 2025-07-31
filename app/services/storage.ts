import { DeliveryRequestType } from "@/constants/types";
import { STORAGE_KEY } from "@/utils/string";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveRequest = async (
  request: Omit<DeliveryRequestType, "id" | "createdAt" | "synced">
) => {
  try {
    const currentRequests = await AsyncStorage.getItem(STORAGE_KEY);
    const newRequest = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      synced: false,
      ...request,
    };
    const parsed = currentRequests ? JSON.parse(currentRequests) : [];
    parsed.push(newRequest);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
    console.log("Saved request locally:", newRequest);
  } catch (error) {
    console.error("Error saving to AsyncStorage:", error);
  }
};

export const getSavedRequests = async (unsynced = true) => {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return unsynced ? parsed.filter((r) => !r.synced) : parsed;
  } catch (error) {
    console.error("Failed to fetch saved requests:", error);
    return [];
  }
};

export const markRequestAsSynced = async (id: string) => {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];

    const updated = parsed.map((r) =>
      r.id === id ? { ...r, synced: true } : r
    );

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error("Failed to update sync status:", error);
  }
};
