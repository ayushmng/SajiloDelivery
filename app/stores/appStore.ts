import { DeliveryRequest } from "@/constants/types";
import { create } from "zustand";

export const useAppStore = create<DeliveryRequest>((set) => ({
  deliveryRequest: {
    name: "",
    phone: "",
    deliveryNote: "",
    pickupAddress: "",
    dropOffAddress: "",
    latitude: "",
    longitude: "",
  },

  updateRequest: (data) =>
    set((state) => ({
      deliveryRequest: {
        ...state.deliveryRequest,
        ...data,
      },
    })),

  clearData: () =>
    set({
      deliveryRequest: {
        name: "",
        phone: "",
        deliveryNote: "",
        pickupAddress: "",
        dropOffAddress: "",
        latitude: "",
        longitude: "",
      },
    }),
}));
