import { Users } from "lucide-react";
import React from "react";
import BtnTemplate from "../BtnTemplate";

function DriversBtn(props) {
  const {
    exactPath = "/dashboard/drivers",
    to = "/dashboard/drivers",
    partialPath = "drivers",
    label = "Drivers",
    color = "#0EA5E9",
  } = props;

  return (
    <BtnTemplate
      label={label}
      exactPath={exactPath}
      partialPath={partialPath}
      to={to}
      Icon={Users}
      color={color}
    />
  );
}

export default DriversBtn;
