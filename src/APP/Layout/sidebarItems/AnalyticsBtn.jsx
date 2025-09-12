import { BarChart3 } from "lucide-react";
import React from "react";
import BtnTemplate from "../BtnTemplate";

function AnalyticsBtn(props) {
  const {
    exactPath = "/dashboard/analytics",
    to = "/dashboard/analytics",
    partialPath = "analytics",
    label = "Analytics",
    color = "#0EA5E9",
  } = props;

  return (
    <BtnTemplate
      label={label}
      exactPath={exactPath}
      partialPath={partialPath}
      to={to}
      Icon={BarChart3}
      color={color}
    />
  );
}

export default AnalyticsBtn;
