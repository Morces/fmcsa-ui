import { Settings } from "lucide-react";
import React from "react";
import BtnTemplate from "../BtnTemplate";

function SettingsBtn(props) {
  const {
    exactPath = "/dashboard/settings",
    to = "/dashboard/settings",
    partialPath = "settings",
    label = "Settings",
    color = "#0EA5E9",
  } = props;

  return (
    <BtnTemplate
      label={label}
      exactPath={exactPath}
      partialPath={partialPath}
      to={to}
      Icon={Settings}
      color={color}
    />
  );
}

export default SettingsBtn;
