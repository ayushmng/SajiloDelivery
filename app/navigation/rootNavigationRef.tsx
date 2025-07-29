import { StackActions } from "@react-navigation/core";
import { createNavigationContainerRef } from "@react-navigation/native";
import * as React from "react";

export const isReadyRef: React.MutableRefObject<boolean | null> =
  React.createRef();

// export const navigationRef: React.RefObject<NavigationContainerRef> =
// React.createRef();
export const navigationRef = createNavigationContainerRef<any>();

export function navigate(name: String, params: Object) {
  if (isReadyRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted
    //@ts-ignore
    navigationRef.current.navigate(name, params);
  } else {
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
  }
}
export function replace(name: string, params: Object = {}) {
  if (isReadyRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted
    //@ts-ignore
    // console.log('replace', name, params);

    navigationRef.current?.dispatch(StackActions.replace(name, params));
  } else {
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
  }
}
export function goBack(params?: number) {
  if (isReadyRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted
    //@ts-ignore
    navigationRef.current.goBack(params);
  } else {
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
  }
}
