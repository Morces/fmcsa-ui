import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";
import LoadingModal from "../../components/modals/LoadingModal";
import useDevice from "../../hooks/useDevice";
import useAuth from "../../hooks/use-auth";
import useAxios from "@/hooks/use-axios";
import { Toaster } from "sonner";

const Provider = ({ children }) => {
  const device = useDevice();
  const [user, setUser] = useState({});

  const [token, setToken] = useState("");

  const [isAuthenticated, setIsAuthenticated] = useState("false");

  const [loading, setIsLoading] = useState(false);

  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [collapseSideBar, setCollapseSideBar] = useState(false);

  const { saveUser } = useAuth();

  const request = useAxios();

  const ourToken = localStorage.getItem("token");

  const ourUser = localStorage.getItem("user");

  useEffect(() => {
    if (ourToken) {
      getUser();
    }

    if (ourUser) {
      setUser(ourUser);
    }
  }, [ourToken, ourUser]);

  const getUser = async () => {
    let res = await request({
      method: "GET",
      url: "auth/me/",
      show_loading: false,
      show_success: false,
      custom_token: ourToken,
    });
    if (res?.error) return;
    setUser(res);
    saveUser(res);
  };

  useEffect(() => {
    if (device === "lg") {
      setSideBarOpen(true);
    } else {
      setSideBarOpen(false);
    }
  }, [device]);

  return (
    <AppContext.Provider
      value={{
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
      }}
    >
      <Toaster position="top-right" closeButton />
      {children}
      <LoadingModal loading={loading} setIsLoading={setIsLoading} />
    </AppContext.Provider>
  );
};

export default Provider;
