import { Link, useNavigate } from "react-router";

import { Settings, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { getInitials } from "@/lib/avatarUtils.js";
import useApp from "@/hooks/use-app";
import { useState } from "react";
import defaultImg from "../../../assets/default.jpg";
import useAuth from "@/hooks/use-auth";

export const UserMenu = () => {
  const navigate = useNavigate();

  const { user } = useApp();

  const { logout } = useAuth();

  const handleLogout = async () => {
    logout();
    navigate("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-10 w-10 rounded-full border border-gray-500 cursor-pointer"
        >
          <Avatar className="border-2 border-primary cursor-pointer">
            {user?.profile_image ? (
              <AvatarImage src={defaultImg} alt={user?.first_name || "User"} />
            ) : (
              <AvatarFallback className="bg-primary text-primary-foreground">
                {getInitials(
                  `${user?.first_name} ${user?.last_name}` || "John Doe"
                )}
              </AvatarFallback>
            )}
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 " align="end" forceMount>
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">{user?.username}</p>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
            {user?.phone_number && (
              <p className="text-xs text-muted-foreground">
                {user.phone_number}
              </p>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => navigate("/dashboard/settings")}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleLogout}
          className="text-red-600 focus:text-red-600 cursor-pointer"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
