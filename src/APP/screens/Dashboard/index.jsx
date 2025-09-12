import { Outlet } from "react-router";
import Layout from "../../Layout";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {
  return <Layout SideBar={Sidebar} Section={Outlet} />;
};

export default DashboardLayout;
