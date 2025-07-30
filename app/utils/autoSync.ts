import NetInfo from "@react-native-community/netinfo";
import { submitRequestToApi } from "@/services/api";
import { getSavedRequests, markRequestAsSynced } from "@/services/storage";

export const setupAutoSync = () => {
  NetInfo.addEventListener(async (state) => {
    if (state.isConnected) {
      const unsynced = await getSavedRequests(false);
      if (unsynced.length === 0) return;

      for (const req of unsynced) {
        try {
          const res = await submitRequestToApi(req);
          if (res.status) {
            await markRequestAsSynced(req.id);
            console.log("Synced request:", req.id);
          }
        } catch (err) {
          console.log("Failed to sync request:", req.id);
        }
      }
    }
  });
};
