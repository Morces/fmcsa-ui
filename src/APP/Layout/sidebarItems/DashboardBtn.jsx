import { LayoutDashboard } from "lucide-react";
import React from "react";
import BtnTemplate from "../BtnTemplate";

function DashboardBtn(props) {
  const {
    exactPath = "/dashboard",
    to = "/dashboard",
    partialPath = null,
    label = "Dashboard",
    color = "#8B5CF6",
  } = props;

  return (
    <BtnTemplate
      label={label}
      exactPath={exactPath}
      partialPath={partialPath}
      to={to}
      Icon={LayoutDashboard}
      color={color}
    />
  );
}

export default DashboardBtn;
