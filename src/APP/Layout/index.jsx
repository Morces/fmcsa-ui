import React from "react";
import Aside from "./Aside";
import MainSection from "./MainSection";
import Topbar from "./TopBar";

const Layout = (props) => {
  const { SideBar, Section } = props;
  return (
    <div className="w-screen h-screen flex flex-row">
      <Aside>
        <SideBar />
      </Aside>
      <MainSection>
        <Topbar />
        <div className="w-full min-h-screen">
          <Section />
        </div>
      </MainSection>
    </div>
  );
};

export default Layout;
