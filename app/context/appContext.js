import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");

  return (
    <AppContext.Provider
      value={{
        lat,
        setLat,
        long,
        setLong,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
