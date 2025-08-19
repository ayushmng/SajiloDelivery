import AsyncStorage from "@react-native-async-storage/async-storage";

export const token = "TOKEN";
export const rememberMe = "REMEMBER_ME";

export const homeView = [
  {
    id: 1,
    title: "Parcel",
    navigation: "Order",
    image: require("../assets/icons/parcel.png"),
  },
  {
    id: 2,
    title: "View History",
    navigation: "History",
    image: require("../assets/icons/history.png"),
  },
];

export const deliveryHistory = [
  {
    id: "1",
    date: "2025-07-27",
    time: "10:30 AM",
    pickup: "New Baneshwor, Kathmandu",
    dropoff: "Lalitpur Ring Road, Lalitpur",
  },
  {
    id: "2",
    date: "2025-07-26",
    time: "2:45 PM",
    pickup: "Thamel, Kathmandu",
    dropoff: "Maharajgunj, Kathmandu",
  },
  {
    id: "3",
    date: "2025-07-25",
    time: "9:15 AM",
    pickup: "Kalanki, Kathmandu",
    dropoff: "Kirtipur, Kathmandu",
  },
  {
    id: "4",
    date: "2025-07-24",
    time: "1:00 PM",
    pickup: "Satdobato, Lalitpur",
    dropoff: "Gwarko, Lalitpur",
  },
];

export const storeToken = async (token: string) => {
  try {
    await AsyncStorage.setItem("userToken", token);
    console.log("Token stored successfully");
  } catch (error) {
    console.log("Error storing token: ", error);
  }
};

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("userToken");
    // console.log("Show token from get: ", token);
    if (token !== null) {
      // console.log("Retrieved token: ", token);
      return token;
    } else {
      console.log("No token found");
    }
  } catch (error) {
    console.log("Error retrieving token: ", error);
  }
};

export const storeData = async (tokenVal: string, tokenKey: string) => {
  try {
    await AsyncStorage.setItem(tokenKey, tokenVal);
    console.log("Data stored successfully.");
  } catch (error) {
    console.error("Error storing data:", error);
  }
};

export const getStoredData = async (tokenKey: string) => {
  try {
    const value = await AsyncStorage.getItem(tokenKey);
    console.log("Value in db: ", value);
    if (value !== null) {
      return value;
    } else {
      console.log("No data found in AsyncStorage.");
    }
    return value;
  } catch (error) {
    console.error("Error retrieving data:", error);
  }
};
