import React from "react";
import AppProvider from "./provider";
import AppRoutes from "./routes";

const APP = () => {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
};

export default APP;
