import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const size = {
  extraLarge: hp(6),
  large: hp(4),
  h1: hp(3.8),
  h2: hp(3.4), //30 px
  h3: hp(3), //30px
  h4: hp(2.5),
  h5: hp(2.8),
  h6: hp(2.3),
  h7: hp(2), //20px
  h8: hp(1.9), //16/18px
  input: hp(1.8), // 16px
  regular: hp(1.7), //14/16px
  regularSmall: hp(1.6), //14px
  mediumLarge: hp(1.5), //12/14px
  medium: hp(1.4), //12px
  mediumSmall: hp(1.3), //12px,
  small: hp(1.2), //10px
  xSmall: hp(1.1), //8px
  tiny: hp(1), //8px
};

export const globalStyles = StyleSheet.create({
  text1: {
    fontWeight: "bold",
    color: "black",
    fontSize: size.h7,
    alignSelf: "center",
  },
  text2: {
    color: "black",
    fontSize: size.input,
    alignSelf: "center",
  },
  text3: {
    color: "black",
    fontSize: size.medium,
    fontWeight: "300",
  },
});
