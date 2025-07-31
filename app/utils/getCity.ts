import axios from "axios";

interface CityProps {
  latitude: string;
  longitude: string;
}

export const getCity = async ({
  latitude,
  longitude,
}: CityProps): Promise<string> => {
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
      {
        headers: {
          "User-Agent": "SajiloDelivery/ayushmng.21@gmail.com",
          "Accept-Language": "en",
        },
      }
    );

    if (response?.data?.address) {
      const address = response?.data;
      const finalAddress = address?.display_name
        ?.split(",")
        .map((part: any) => part.trim())
        .slice(0, 3)
        .join(", ");
      return finalAddress.trim().replace(/,\s*$/, "");
    } else {
      throw new Error("No address found for the given coordinates");
    }
  } catch (err: any) {
    console.error("Map API Error: ", err.message);
    throw err;
  }
};
