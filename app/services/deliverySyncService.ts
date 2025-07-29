import { DeliveryRequestType } from "@/constants/types";
import { STORAGE_KEY } from "@/utils/string";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { submitRequestToApi } from "./api";

export const syncPendingRequests = async () => {
  const stored = await AsyncStorage.getItem(STORAGE_KEY);
  if (!stored) return;

  const allRequests = JSON.parse(stored);
  const unsynced = allRequests.filter((r: DeliveryRequestType) => !r.synced);

  const synced = await Promise.all(
    unsynced.map(async (req: DeliveryRequestType) => {
      try {
        await submitRequestToApi(req);
        return { ...req, synced: true };
      } catch (err) {
        return req;
      }
    })
  );

  const combined = [
    ...synced,
    ...allRequests.filter((r: DeliveryRequestType) => r.synced),
  ];

  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(combined));
};
