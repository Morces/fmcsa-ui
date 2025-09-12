import { Truck } from "lucide-react";
import React from "react";
import BtnTemplate from "../BtnTemplate";

function TrucksBtn(props) {
  const {
    exactPath = "/dashboard/trucks",
    to = "/dashboard/trucks",
    partialPath = "trucks",
    label = "Trucks",
    color = "#0EA5E9",
  } = props;

  return (
    <BtnTemplate
      label={label}
      exactPath={exactPath}
      partialPath={partialPath}
      to={to}
      Icon={Truck}
      color={color}
    />
  );
}

export default TrucksBtn;
