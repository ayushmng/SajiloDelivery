import * as React from "react";
import { Colors } from "@/constants/colors";
import { Text as RNText, TextProps, StyleSheet } from "react-native";

export enum fontFamily {
  Mono_Medium = "Mono-Medium",
  Sans_Medium = "Sans-Medium",
  Sans_Regular = "Sans-Regular",
  Sans_Bold = "Sans-Bold",
  Sans_SemiBold = "Sans-SemiBold",
  Sans_Light = "Sans-Light",
  Tinos_Regular = "Tinos-Regular",
  Tinos_Bold = "Tinos-Bold",
}

const Text: React.FC<TextProps> = ({ onPress, style, ...props }) => {
  return <RNText style={[styles.text, style]} {...props} />;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    color: Colors.dark1,
    fontFamily: fontFamily.Sans_Medium,
  },
});

export default Text;
