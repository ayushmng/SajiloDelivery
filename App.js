import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { navigationRef, isReadyRef } from "./app/navigation/rootNavigationRef";
import { AppNavigation } from "./app/navigation/appNavigation";
import { useFonts } from "@/hooks/useFonts";
import { ActivityIndicator, View } from "react-native";
import { Colors } from "@/constants/colors";
import Toast from "react-native-toast-message";

export default function App() {
  const fontsLoaded = useFonts();
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      </View>
    );
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          isReadyRef.current = true;
        }}
      >
        <AppNavigation />
      </NavigationContainer>
      <Toast />
    </GestureHandlerRootView>
  );
}
