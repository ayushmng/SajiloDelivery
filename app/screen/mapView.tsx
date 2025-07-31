import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
  Alert,
  Linking,
} from "react-native";
import MapView, {
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
  Region,
} from "react-native-maps";
import * as Location from "expo-location";
import { Colors } from "@/constants/colors";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { debounce } from "lodash";
import { Button } from "@/components/button";
import Text, { fontFamily } from "@/components/text";
import { noLocationFound, updating, waitingMessage } from "@/utils/string";
import LottieView from "lottie-react-native";
import { getCity } from "@/utils/getCity";
import { AntDesign } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { goBack } from "@/navigation/rootNavigationRef";
import { useAppStore } from "@/stores/appStore";

export default function MapScreen({ route }) {
  const iconSize = 48;
  const insets = useSafeAreaInsets();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    animStyles: {
      width: 48,
      height: 48,
    },
    backButton: {
      position: "absolute",
      top: insets.top + 16,
      left: 16,
    },
    navigationWrapper: {
      height: iconSize,
      width: iconSize,
      borderRadius: iconSize / 2,
      position: "absolute",
      alignItems: "center",
      justifyContent: "center",
      bottom: "22%",
      right: 16,
      backgroundColor: "white",
      borderColor: Colors.dark2,
    },
    markerFixed: {
      left: "44%",
      top: Platform.OS == "ios" ? "45%" : "43%",
      position: "absolute",
    },
    bottomViewContainer: {
      backgroundColor: "white",
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      alignItems: "center",
      borderTopRightRadius: 8,
      borderTopLeftRadius: 8,
    },
    bottomViewWrapper: {
      height: 32,
      width: "90%",
      marginTop: 18,
      flexDirection: "row",
      alignItems: "center",
      borderRadius: 8,
      paddingHorizontal: 12,
    },
  });

  const { pickupAddress } = route?.params;
  const mapRef = useRef<MapView>(null);
  const animation = useRef<LottieView>(null);

  const [lat, setLat] = useState<number>();
  const [long, setLong] = useState<number>();
  const [address, setAddress] = useState(updating);
  const [isAddressUpdating, setIsAddressUpdating] = useState(false);
  const [initialRegion, setInitialRegion] = useState<Region | null>(null);
  const [locationPermission, setLocationPermission] = useState<boolean | null>(
    null
  );

  const { updateRequest } = useAppStore();

  useEffect(() => {
    (async () => {
      try {
        const { status, canAskAgain } =
          await Location.requestForegroundPermissionsAsync();

        if (status === "granted") {
          setLocationPermission(true);
        } else {
          setLocationPermission(false);
          goBack();

          Alert.alert(
            "Location Permission Denied",
            "To use this feature, please enable location permission from settings.",
            [
              {
                text: "Cancel",
                style: "cancel",
              },
              {
                text: "Open Settings",
                onPress: () => {
                  Linking.openSettings();
                },
              },
            ],
            { cancelable: false }
          );
        }
      } catch (error) {
        console.log("Permission request failed:", error);
        setLocationPermission(false);
      }
    })();
  }, []);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        if (locationPermission) {
          const location = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Lowest,
            timeInterval: 5000,
          });

          const {
            coords: { latitude, longitude },
          } = location;

          const region = {
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          };
          setInitialRegion(region);
          setLat(latitude);
          setLong(longitude);
        }
      } catch (error) {
        console.log("Error getting location:", error);
      }
    };

    if (locationPermission !== null) {
      fetchLocation();
    }
  }, [locationPermission]);

  if (lat === null || long === null || initialRegion === null) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <View style={{ alignItems: "center" }}>
          <ActivityIndicator size={"large"} color={Colors.primaryColor} />
          <Text style={{ marginTop: 16 }}>{waitingMessage}</Text>
        </View>
      </View>
    );
  }

  const handleLocationPress = () => {
    if (lat && long && mapRef.current) {
      const region = {
        latitude: lat,
        longitude: long,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      };
      setInitialRegion(region);
      mapRef.current.animateToRegion(region, 500);
    }
  };

  async function getAddress(lat: string, long: string) {
    setIsAddressUpdating(true);

    try {
      const cityName = await getCity({
        latitude: lat,
        longitude: long,
      });
      setAddress(cityName || noLocationFound);
    } catch (error) {
      setAddress(noLocationFound);
    }
    setTimeout(() => {
      setIsAddressUpdating(false);
    }, 1000);
  }

  const lastSpaceIndex = address.lastIndexOf(" ");

  const handleRegionChange = debounce((region) => {
    if (animation.current) {
      animation.current.play();
    }
    getAddress(region.latitude.toFixed(6), region.longitude.toFixed(6));
    setInitialRegion(region);
  }, 500);

  return (
    <View style={[styles.container]}>
      <MapView
        ref={mapRef}
        showsCompass
        provider={
          Platform.OS === "android" ? PROVIDER_GOOGLE : PROVIDER_DEFAULT
        }
        initialRegion={initialRegion}
        scrollEnabled={!isAddressUpdating}
        zoomEnabled={!isAddressUpdating}
        onRegionChange={handleRegionChange}
        onPoiClick={(event) => {
          const region = {
            latitude: event.nativeEvent.coordinate.latitude,
            longitude: event.nativeEvent.coordinate.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          };
          if (animation.current && mapRef.current) {
            setInitialRegion(region);
            mapRef.current.animateToRegion(region, 500);
            animation.current.play();
            getAddress(
              event.nativeEvent.coordinate.latitude.toFixed(6),
              event.nativeEvent.coordinate.longitude.toFixed(6)
            );
          }
        }}
        showsUserLocation={true}
        showsMyLocationButton={false}
        style={styles.container}
      />
      <TouchableOpacity onPress={() => goBack()} style={styles.backButton}>
        <AntDesign name="arrowleft" size={26} color="black" />
      </TouchableOpacity>
      <View style={styles.markerFixed}>
        <LottieView
          loop={false}
          autoPlay={false}
          ref={animation}
          style={styles.animStyles}
          source={require("@/assets/anim/marker.json")}
        />
      </View>
      <TouchableOpacity
        onPress={handleLocationPress}
        style={styles.navigationWrapper}
      >
        <FontAwesome6
          name="location-arrow"
          size={32}
          color={Colors.primaryColor}
        />
      </TouchableOpacity>
      <View style={styles.bottomViewContainer}>
        <View style={styles.bottomViewWrapper}>
          <FontAwesome6 name="map-pin" size={20} color={Colors.primaryColor} />
          <Text
            numberOfLines={2}
            style={{
              fontFamily: fontFamily.Sans_Regular,
              color: Colors.text,
              paddingHorizontal: 8,
            }}
          >
            {isAddressUpdating
              ? updating
              : address != noLocationFound
              ? address?.slice(0, lastSpaceIndex)
              : address}
          </Text>
        </View>
        <Button
          disabled={!isAddressUpdating ? false : true}
          label="Confirm Location"
          containerStyles={{
            marginVertical: 16,
            marginBottom: insets.bottom + 8 || 28,
          }}
          onPress={() => {
            address != noLocationFound &&
              updateRequest(
                pickupAddress
                  ? { pickupAddress: address?.slice(0, lastSpaceIndex) }
                  : { dropOffAddress: address?.slice(0, lastSpaceIndex) }
              );
            !isAddressUpdating && goBack();
          }}
        />
      </View>
    </View>
  );
}
