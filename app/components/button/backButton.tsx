import { goBack } from "@/navigation/rootNavigationRef";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

interface BackButtonProps {
  onPress?: () => void;
}

export const BackButton: React.FC<BackButtonProps> = ({
  onPress = () => goBack(),
}) => {
  const styles = StyleSheet.create({
    backButton: { marginBottom: 24 },
  });

  return (
    <TouchableOpacity onPress={onPress} style={styles.backButton}>
      <AntDesign name="arrowleft" size={26} color="black" />
    </TouchableOpacity>
  );
};
