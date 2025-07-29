import React from "react";
import {
  StyleSheet,
  TextInput,
  StyleProp,
  ViewStyle,
  View,
  KeyboardTypeOptions,
  TextStyle,
  DimensionValue,
} from "react-native";
import Text, { fontFamily } from "../text";
import { Colors } from "@/constants/colors";

interface TextFieldProps {
  width?: DimensionValue | undefined;
  maxLength?: number;
  label: string;
  placeHolder: string;
  value?: string;
  numberOfLines?: number;
  autoFocus?: boolean;
  multiLine?: boolean;
  isSecureText?: boolean;
  keyboardType?: KeyboardTypeOptions;
  onChangeText?: (text: string) => void;
  inputContainerStyle?: StyleProp<TextStyle>;
  labelStyles?: StyleProp<TextStyle>;
  errorStyles?: StyleProp<TextStyle>;
  error?: string;
  isError?: boolean;
  isFieldMandatory?: boolean;
  isFieldEditable?: boolean;
  inputWrapperStyles?: StyleProp<ViewStyle>;
  containerStyles?: StyleProp<ViewStyle>;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  textAlignVertical?: "auto" | "center" | "top" | "bottom" | undefined;
}

export const TextField = ({
  width = "100%",
  maxLength,
  numberOfLines = 1,
  autoCapitalize = "sentences",
  value = "",
  label = "Username",
  placeHolder = "Enter Username",
  autoFocus = false,
  multiLine = false,
  keyboardType = "default",
  labelStyles,
  errorStyles,
  error = "",
  isError = false,
  isFieldMandatory = false,
  isFieldEditable = true,
  inputContainerStyle,
  inputWrapperStyles,
  containerStyles,
  onChangeText = (text: string) => {},
  textAlignVertical = "center",
}: TextFieldProps) => {
  return (
    <View style={[containerStyles, containerStyles]}>
      <View style={styles.rowStyles}>
        <Text style={[styles.labelStyles, labelStyles]}>{label}</Text>
        {isFieldMandatory && <Text style={styles.mandatoryText}>*</Text>}
      </View>
      <View style={styles.rowStyles}>
        <View
          style={[styles.inputWrapper, inputWrapperStyles, { width: width }]}
        >
          <TextInput
            autoFocus={autoFocus}
            autoCapitalize={autoCapitalize}
            placeholder={placeHolder}
            value={value}
            editable={isFieldEditable}
            keyboardType={keyboardType}
            onChangeText={onChangeText}
            numberOfLines={numberOfLines}
            maxLength={maxLength}
            multiline={multiLine}
            textAlignVertical={textAlignVertical}
            cursorColor={Colors.primaryColor}
            style={[styles.inputContainerStyle, inputContainerStyle]}
          />
        </View>
      </View>
      {isError && (
        <Text style={[styles.errorStyles, errorStyles]}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: Colors.grey,
    borderRadius: 8,
    borderWidth: 1,
    height: 48,
    paddingHorizontal: 12,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  rowStyles: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputContainerStyle: {
    flex: 1,
    fontSize: 14,
    fontFamily: fontFamily.Sans_Regular,
    color: Colors.dark2,
  },
  iconStyle: {
    height: 12,
    width: 18,
    marginLeft: 8,
  },
  labelStyles: {
    fontSize: 14,
    marginBottom: 6,
    color: Colors.dark1,
    fontFamily: fontFamily.Sans_SemiBold,
  },
  mandatoryText: {
    fontSize: 14,
    marginBottom: 6,
    marginLeft: 2,
    color: Colors.primaryColor,
    fontFamily: fontFamily.Sans_SemiBold,
  },
  errorStyles: {
    fontSize: 10,
    fontFamily: fontFamily.Sans_Light,
    color: Colors.primaryColor,
    marginTop: 2,
  },
});
