import { useContext } from "react";
import AppContext from "../APP/provider/AppContext";

function useApp() {
  const {
    user,
    setUser,
    token,
    setToken,
    loading,
    setIsLoading,
    isAuthenticated,
    setIsAuthenticated,
    sideBarOpen,
    setSideBarOpen,
    collapseSideBar,
    setCollapseSideBar,
  } = useContext(AppContext);

  return {
    user,
    setUser,
    token,
    setToken,
    loading,
    setIsLoading,
    isAuthenticated,
    setIsAuthenticated,
    sideBarOpen,
    setSideBarOpen,
    collapseSideBar,
    setCollapseSideBar,
  };
}

export default useApp;
