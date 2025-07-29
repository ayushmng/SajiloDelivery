import React from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import Text, { fontFamily } from "../text";
import { Colors } from "@/constants/colors";

interface UneditableTextFieldProps {
  label?: string;
  value?: string;
  isEmpty?: boolean;
  onPress: () => void;
  placeholder?: string;
  emptyMessage?: string;
  isFieldMandatory?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}

export const UneditableTextField = ({
  containerStyle,
  onPress = () => {},
  value,
  isEmpty = false,
  isFieldMandatory = false,
  label = "Pickup Address",
  placeholder = "Select Pickup Address",
  emptyMessage = "*Required",
}: UneditableTextFieldProps) => {
  const styles = StyleSheet.create({
    viewContainer: {
      flex: 1,
      marginBottom: 16,
    },
    textFieldContainer: {
      flexDirection: "row",
      width: "100%",
      borderRadius: 8,
      borderWidth: 1,
      borderColor: Colors.grey,
      height: 48,
      paddingHorizontal: 8,
      alignItems: "center",
    },
    errorStyles: {
      fontSize: 10,
      fontFamily: fontFamily.Sans_Light,
      color: Colors.primaryColor,
      marginTop: 2,
    },
    labelStyles: {
      fontSize: 14,
      marginBottom: 6,
      color: "black",
      fontFamily: fontFamily.Sans_SemiBold,
    },
    mandatoryText: {
      fontSize: 14,
      marginBottom: 6,
      marginLeft: 2,
      color: Colors.primaryColor,
      fontFamily: fontFamily.Sans_SemiBold,
    },
    rowStyles: {
      flexDirection: "row",
      alignItems: "center",
    },
    placeHolderText: { fontSize: 14, color: Colors.grey },
  });

  return (
    <View style={[styles.viewContainer, containerStyle]}>
      <View style={styles.rowStyles}>
        <Text style={styles.labelStyles}>{label}</Text>
        {isFieldMandatory && <Text style={styles.mandatoryText}>*</Text>}
      </View>
      <TouchableOpacity onPress={onPress} style={styles.textFieldContainer}>
        {value ? (
          <Text style={{}}>{value}</Text>
        ) : (
          <Text style={styles.placeHolderText}>{placeholder}</Text>
        )}
      </TouchableOpacity>
      {isEmpty && <Text style={styles.errorStyles}>{emptyMessage}</Text>}
    </View>
  );
};
