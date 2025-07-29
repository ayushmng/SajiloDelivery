export type DeliveryRequestType = {
  id: string;
  name: string;
  phone: string;
  pickupAddress: string;
  dropOffAddress: string;
  deliveryNote: string;
  createdAt: string;
  synced: boolean;
};

export interface DeliveryRequestProps {
  name: string;
  phone: string;
  deliveryNote: string;
  pickupAddress: string;
  dropOffAddress: string;
  latitude: string;
  longitude: string;
}

export interface DeliveryRequest {
  deliveryRequest: DeliveryRequestProps;
  updateRequest: (data: Partial<DeliveryRequestProps>) => void;
  clearData: () => void;
}
