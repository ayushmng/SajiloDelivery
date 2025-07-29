import * as Font from "expo-font";
import { useEffect, useState } from "react";

export const useFonts = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        "Mono-Medium": require("@/assets/fonts/DMMono-Medium.ttf"),
        "Sans-Regular": require("@/assets/fonts/DMSans-Regular.ttf"),
        "Sans-Medium": require("@/assets/fonts/DMSans-Medium.ttf"),
        "Sans-Bold": require("@/assets/fonts/DMSans-Bold.ttf"),
        "Sans-SemiBold": require("@/assets/fonts/DMSans-SemiBold.ttf"),
        "Sans-Light": require("@/assets/fonts/DMSans-Light.ttf"),
        "Tinos-Bold": require("@/assets/fonts/Tinos-Bold.ttf"),
        "Tinos-Regular": require("@/assets/fonts/Tinos-Regular.ttf"),
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  return fontsLoaded;
};
