import useApp from "../../hooks/use-app";
import React from "react";

function MainSection(props) {
  const { children } = props;
  const { sideBarOpen, device, collapseSideBar } = useApp();

  return (
    <div
      className={`
        "w-full h-full flex-1 overflow-y-auto transition-all duration-300 bg-grid-pattern bg-white",
        ${
          device !== "sm" &&
          (collapseSideBar ? "ml-24" : sideBarOpen ? "ml-[152px]" : "")
        }
      `}
      style={{ zIndex: 10 }}
    >
      {children}
    </div>
  );
}

export default MainSection;
