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
