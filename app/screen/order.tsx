import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  BackHandler,
} from "react-native";
import { Button } from "@/components/button";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { TextField } from "@/components/textInput";
import {
  addressEmptyMessage,
  deliveryNote,
  formHeading,
  fullNamePlaceHolder,
  phoneNumber,
  pickup,
} from "@/utils/string";
import { useAppStore } from "@/stores/appStore";
import { UneditableTextField } from "@/components/textInput/UneditableTextField";
import { goBack, navigate } from "@/navigation/rootNavigationRef";
import NetInfo from "@react-native-community/netinfo";
import { saveRequest } from "@/services/storage";
import { submitRequestToApi } from "@/services/api";
import Text, { fontFamily } from "@/components/text";
import { size } from "@/constants/fonts";
import { BackButton } from "@/components/button/backButton";
import Toast from "react-native-toast-message";
import { useFocusEffect } from "@react-navigation/native";

export const useBackHandler = (onBackPress: () => boolean) => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      onBackPress
    );
    return () => backHandler.remove();
  }, [onBackPress]);
};

export default function Order() {
  const insets = useSafeAreaInsets();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 8,
    },
    buttonContainer: {
      marginTop: 42,
      alignSelf: "center",
      marginBottom: insets.bottom + 8 || 32,
    },
    headingStyles: {
      fontSize: size.input,
      marginBottom: 24,
      fontFamily: fontFamily.Sans_SemiBold,
    },
    textStyles: { marginBottom: 16 },
    inputWrapper: { height: 120 },
    inputContainer: { height: 100, overflow: "hidden" },
    row: { flexDirection: "row" },
  });

  const [isLoading, setLoading] = useState(false);
  const { deliveryRequest, updateRequest, clearData } = useAppStore();

  const isValid = (): boolean => {
    const { name, pickupAddress, dropOffAddress, phone } = deliveryRequest;

    const isEmpty = (val: string) => val.trim() === "";
    const isPhoneValid = (phone: string) =>
      phone.length === 10 &&
      (phone.startsWith("98") ||
        phone.startsWith("97") ||
        phone.startsWith("96"));

    return (
      !isEmpty(name) &&
      !isEmpty(pickupAddress) &&
      !isEmpty(dropOffAddress) &&
      pickupAddress !== dropOffAddress &&
      isPhoneValid(phone)
    );
  };

  const handleSubmit = async () => {
    setLoading(true);
    const isConnected = (await NetInfo.fetch()).isConnected;

    const requestPayload = {
      name: deliveryRequest.name,
      phone: deliveryRequest.phone,
      pickupAddress: deliveryRequest.pickupAddress,
      dropOffAddress: deliveryRequest.dropOffAddress,
      deliveryNote: deliveryRequest.deliveryNote,
    };

    if (isConnected) {
      try {
        const res = await submitRequestToApi(requestPayload);
        if (res.status) {
          setLoading(false);
          clearData();
          goBack();
          Toast.show({
            type: "success",
            text1: "Success",
            text2: "Your parcel has been requested",
          });
        }
      } catch (err) {
        setLoading(false);
        await saveRequest(requestPayload);
        clearData();
        goBack();
        Toast.show({
          type: "error",
          text1: "Network Server Error",
          text2: "Saved locally.",
        });
      }
    } else {
      setLoading(false);
      await saveRequest(requestPayload);
      clearData();
      goBack();
      Toast.show({
        type: "info",
        text1: "Offline",
        text2: "Request saved locally.",
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 24}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.container}
        >
          <BackButton
            onPress={() => {
              clearData();
              goBack();
            }}
          />
          <Text style={styles.headingStyles}>{formHeading}</Text>
          <TextField
            isError
            isFieldMandatory
            label="Receiver's Name:"
            value={deliveryRequest.name}
            onChangeText={(text) => updateRequest({ name: text })}
            placeHolder={fullNamePlaceHolder}
          />
          <TextField
            isError={
              deliveryRequest.phone !== "" &&
              !(
                deliveryRequest.phone.length === 10 &&
                (deliveryRequest.phone.startsWith("98") ||
                  deliveryRequest.phone.startsWith("97") ||
                  deliveryRequest.phone.startsWith("96"))
              )
            }
            error={"Invalid Mobile Number"}
            isFieldMandatory
            maxLength={10}
            label="Mobile Number:"
            value={deliveryRequest.phone}
            onChangeText={(text) => updateRequest({ phone: text })}
            keyboardType="numeric"
            placeHolder={phoneNumber}
            containerStyles={styles.textStyles}
          />
          <UneditableTextField
            isFieldMandatory
            label="Pickup Address:"
            value={deliveryRequest.pickupAddress}
            onPress={() => navigate("MapScreen", { pickupAddress: true })}
          />
          <UneditableTextField
            isFieldMandatory
            isEmpty={
              deliveryRequest.dropOffAddress !== "" &&
              deliveryRequest.pickupAddress === deliveryRequest.dropOffAddress
            }
            emptyMessage={addressEmptyMessage}
            label="Drop Off Address:"
            value={deliveryRequest.dropOffAddress}
            onPress={() => navigate("MapScreen", { pickupAddress: false })}
          />
          <TextField
            multiLine
            label="Delivery Note:"
            value={deliveryRequest.deliveryNote}
            onChangeText={(text) => updateRequest({ deliveryNote: text })}
            placeHolder={deliveryNote}
            inputWrapperStyles={styles.inputWrapper}
            textAlignVertical={"top"}
            inputContainerStyle={styles.inputContainer}
          />
          <Button
            disabled={isLoading || !isValid()}
            isLoading={isLoading}
            label="Submit"
            containerStyles={styles.buttonContainer}
            onPress={handleSubmit}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
