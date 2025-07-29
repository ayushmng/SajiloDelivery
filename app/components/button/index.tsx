import * as React from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useFonts } from "expo-font";
import { Colors } from "@/constants/colors";

interface ButtonProps {
  label?: string;
  disabled?: boolean;
  isLoading?: boolean;
  onPress?: () => void;
  backgroundColor?: string;
  textStyles?: StyleProp<TextStyle>;
  containerStyles?: StyleProp<ViewStyle>;
}

export const Button = ({
  label = "Submit",
  disabled = true,
  isLoading = false,
  onPress = () => {},
  textStyles,
  containerStyles,
  backgroundColor = Colors.primaryColor,
}: ButtonProps) => {
  const [fontLoaded] = useFonts({
    Sans_SemiBold: require("@/assets/fonts/DMSans-SemiBold.ttf"),
  });

  if (!fontLoaded) {
    return null;
  }
  return (
    <TouchableOpacity
      disabled={isLoading || disabled}
      onPress={onPress}
      style={[
        styles.buttonStyles,
        containerStyles,
        { backgroundColor: disabled ? "#868686" : backgroundColor },
      ]}
    >
      {isLoading && <ActivityIndicator color={"white"} size={"small"} />}
      <Text style={[styles.text, textStyles]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyles: {
    height: hp(6),
    width: wp(90),
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    color: "white",
    marginLeft: wp(2),
    fontFamily: "Sans_SemiBold",
  },
});
