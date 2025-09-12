import React, { useEffect, useState } from "react";
import useApp from "../../hooks/use-app";
import { useLocation, useNavigate } from "react-router";
import { Layout } from "lucide-react";

function BtnTemplate(props) {
  const [active, setActive] = useState(false);
  const { setSideBarOpen, device, collapseSideBar } = useApp();

  const {
    exactPath = null,
    partialPath = null,
    to = "",
    Icon = <Layout className="text-xl" />,
    label = "Label",
    color = "8B5CF6",
  } = props;

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (to) {
      if (location.pathname === to) {
        setActive(true);
        return;
      }
    }

    if (partialPath) {
      if (location.pathname.includes(partialPath)) {
        setActive(true);
        return;
      }
    }

    setActive(false);
  }, [location.pathname, to, partialPath, exactPath]);

  const handleNavigate = () => {
    if (to) {
      navigate(to);
      if (device === "sm") {
        setSideBarOpen(false);
      }
    }
  };

  return (
    <>
      <OpenBtn
        label={label}
        active={active}
        Icon={Icon}
        click={handleNavigate}
        collapseSideBar={collapseSideBar}
        color={color}
      />
      <ClosedBtn
        active={active}
        Icon={Icon}
        click={handleNavigate}
        collapseSideBar={collapseSideBar}
        label={label}
        color={color}
      />
    </>
  );
}

function OpenBtn(props) {
  const { label, active, Icon, color, click, collapseSideBar } = props;

  if (collapseSideBar) {
    return null;
  }

  return (
    <div
      className={`relative rounded-md py-1.5 flex items-center gap-x-2 cursor-pointer w-full  text-gray-800 ${
        active ? "bg-white/40" : ""
      }`}
      onClick={click}
    >
      <span className={`text-2xl cursor-pointer px-2`} style={{ color: color }}>
        <Icon className={`text-sm font-light`} />
      </span>
      <span className="text-sm font-semibold text-gray-700 cursor-pointer">
        {label}
      </span>
    </div>
  );
}

function ClosedBtn(props) {
  const { active, Icon, color, click, collapseSideBar } = props;

  if (!collapseSideBar) {
    return null;
  }

  return (
    <div
      className="flex py-1.5 justify-center w-full cursor-pointer active:opacity-50"
      onClick={click}
    >
      <span
        className={`text-xl ${active ? " px-2 rounded-lg bg-white/30" : ""} `}
      >
        <span className="text-2xl" style={{ color: color }}>
          <Icon />
        </span>
      </span>
    </div>
  );
}

export default BtnTemplate;
