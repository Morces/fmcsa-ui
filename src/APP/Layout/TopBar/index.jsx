import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, Clock, LogOut } from "lucide-react";
import { UserMenu } from "./UserMenu";
import { useIsMobile } from "@/hooks/use-mobile.js";
import useApp from "@/hooks/use-app";
import useAuth from "@/hooks/use-auth";
import { useNavigate } from "react-router";

const Topbar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const isMobile = useIsMobile();
  const { sideBarOpen, setSideBarOpen, setCollapseSideBar } = useApp();

  const navigate = useNavigate();

  const { logout } = useAuth();

  const toggle = () => {
    setSideBarOpen(!sideBarOpen);
    setCollapseSideBar(false);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formatTime = () => {
    return currentTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const formatDate = () => {
    return currentTime.toLocaleDateString([], {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="h-16 backdrop-blur-md shadow-sm z-10 px-4 text-primary-foreground bg-primary sticky top-0">
      <div className="flex items-center justify-between h-full">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggle}
            className="text-primary-foreground hover:bg-primary-foreground/20 cursor-pointer"
          >
            <Menu size={24} className="text-primary-foreground" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>

          {!isMobile && (
            <div className="text-primary-foreground text-sm">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-accent" />
                <span>{formatDate()}</span>
              </div>
              <div className="font-semibold">{formatTime()}</div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 md:gap-6">
          <UserMenu onLogout={handleLogout} />
          {!isMobile && (
            <Button
              onClick={handleLogout}
              className="bg-transparent border-2 border-accent text-primary-foreground hover:bg-accent/20"
            >
              <LogOut className="h-4 w-4 mr-2 text-accent" />
              Logout
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
