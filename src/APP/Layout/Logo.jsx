import React from "react";

import { Truck } from "lucide-react";

function LogoSection({ toggle }) {
  return (
    <div className="cursor-pointer items-center" onClick={toggle}>
      {/* <img src={logo} alt="logo" style={{ width: "10rem" }} /> */}
      <Truck className="w-12 h-12" />
    </div>
  );
}

export default LogoSection;
