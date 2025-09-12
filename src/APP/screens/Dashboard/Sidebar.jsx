import React from "react";
import {
  AnalyticsBtn,
  DashboardBtn,
  DriversBtn,
  SettingsBtn,
  TripsBtn,
  TrucksBtn,
} from "../../Layout/sidebarItems";

const Sidebar = () => {
  return (
    <div className="flex flex-col gap-5">
      <DashboardBtn />
      <DriversBtn />
      <TrucksBtn />
      <TripsBtn />
      <AnalyticsBtn />
      <SettingsBtn />
    </div>
  );
};

export default Sidebar;
