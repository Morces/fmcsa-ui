import useApp from "../../hooks/use-app";
import { MdOutlineClose } from "react-icons/md";
import React, { useState } from "react";
import LogoSection from "./Logo";
import { ChevronLeft, ChevronRight, Menu } from "lucide-react";

function Aside(props) {
  const {
    device,
    setSideBarOpen,
    sideBarOpen,
    collapseSideBar,
    setCollapseSideBar,
  } = useApp();
  const { children } = props;

  const toggle = () => {
    setCollapseSideBar((prev) => !prev);
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full flex flex-col gap-y-6 transition-transform duration-300 border-r  ${
        sideBarOpen ? "translate-x-0" : "-translate-x-full"
      } ${device === "sm" ? "absolute z-40" : ""} ${
        device === "sm" && sideBarOpen && "w-[230px]"
      } ${device !== "sm" && collapseSideBar && "w-24"}`}
    >
      {/* FULL overlay: blurred + white bg */}
      {/* <div className="absolute inset-0 backdrop-blur-[12px] z-0" /> */}

      {/* Content wrapper should be relative & above the blur */}
      <div className="relative z-10 flex flex-col h-full">
        <div className="w-full flex gap-x-12 items-center px-4 py-4 border-b border-white/20">
          <LogoSection toggle={toggle} />
          {device === "sm" ? (
            <MdOutlineClose
              className="cursor-pointer text-3xl text-white"
              onClick={() => setSideBarOpen(false)}
            />
          ) : (
            <div>
              {collapseSideBar ? (
                <ChevronRight
                  className="cursor-pointer text-3xl text-black"
                  onClick={toggle}
                />
              ) : (
                <ChevronLeft
                  className="cursor-pointer text-3xl text-black"
                  onClick={toggle}
                />
              )}
            </div>
          )}
        </div>
        <div className="flex-1 min-h-0 overflow-y-auto pb-6">{children}</div>
      </div>
    </div>
  );
}

export default Aside;
