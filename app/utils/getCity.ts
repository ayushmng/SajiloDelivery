import axios from "axios";

interface CityProps {
  fromPropertyPost?: boolean;
  latitude: string | number;
  longitude: string | number;
}

export const getCity = async ({
  latitude,
  longitude,
  fromPropertyPost = false,
}: CityProps): Promise<string> => {
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
    );

    if (response?.data?.address) {
      const address = response?.data;
      const finalAddress = address?.display_name
        ?.split(",")
        .map((part: any) => part.trim())
        .slice(0, 3)
        .join(", ");
      return fromPropertyPost
        ? finalAddress.trim().replace(/,\s*$/, "") +
            " " +
            address?.address?.county
        : finalAddress.trim().replace(/,\s*$/, "");
    } else {
      throw new Error("No address found for the given coordinates");
    }
  } catch (err: any) {
    console.error(err.message);
    throw err;
  }
};
