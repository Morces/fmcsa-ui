import { MapPin } from "lucide-react";
import React from "react";
import BtnTemplate from "../BtnTemplate";

function TripsBtn(props) {
  const {
    exactPath = "/dashboard/trips",
    to = "/dashboard/trips",
    partialPath = "trips",
    label = "Trips",
    color = "#0EA5E9",
  } = props;

  return (
    <BtnTemplate
      label={label}
      exactPath={exactPath}
      partialPath={partialPath}
      to={to}
      Icon={MapPin}
      color={color}
    />
  );
}

export default TripsBtn;
