import { useEffect, useState } from "react";

import useApp from "./use-app";

export const useAuth = () => {
  const { user, setUser, setToken, token, setIsAuthenticated } = useApp();

  useEffect(() => {
    if (token) {
      setToken(token);
    }
  }, []);

  const setItem = (key, value) => {
    try {
      let v = value;

      if (value === null || value === undefined) {
        v = "null";
      } else if (typeof value === "object") {
        v = JSON.stringify(value);
      } else {
        v = value.toString();
      }

      localStorage.setItem(key, v);
      return true;
    } catch (e) {
      //console.log(e);
      return false;
    }
  };

  const getItem = (key) => {
    try {
      const value = localStorage.getItem(key);
      if (canConvertToObject(value)) {
        return JSON.parse(value);
      }
      if (value === "null") {
        return null;
      }
      return value;
    } catch (e) {
      //console.log(e);
      return false;
    }
  };

  const saveUser = (res) => {
    if (res) {
      setItem("user", res);
      setIsAuthenticated(true);
    }
  };

  const saveToken = async (token) => {
    if (token) {
      setItem("token", token);
      setIsAuthenticated(true);
    }
  };

  const userInfo = () => {
    const user = getItem("user");
    const token = getItem("token");
    const refresh_token = getItem("refresh_token");
    if (user) {
      setUser(user);
      setIsAuthenticated(true);
    }
    if (token) {
      setToken(token);
    }

    return { user, token, refresh_token };
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
  };

  return {
    user,
    logout,
    saveUser,
    saveToken,
    userInfo,
    getItem,
  };
};

export default useAuth;
