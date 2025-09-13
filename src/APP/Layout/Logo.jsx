import React from "react";

import { Truck } from "lucide-react";
import logo from "../../../public/android-chrome-512x512.png";

function LogoSection({ toggle }) {
  return (
    <div className="cursor-pointer items-center" onClick={toggle}>
      <img src={logo} alt="logo" style={{ width: "3rem" }} />
      {/* <Truck className="w-12 h-12" /> */}
    </div>
  );
}

export default LogoSection;
