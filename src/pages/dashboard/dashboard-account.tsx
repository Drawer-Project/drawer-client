import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import React from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogout } from "@/hooks/quries/auth";
import { useUser } from "@/hooks/quries/user";

const DashBoardAccount: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { logout } = useLogout();

  return (
    <>
      <div className="flex flex-col">
        <div className="font-semibold">{user?.email}</div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="rounded-full" size="icon" variant="ghost">
            <Avatar className="flex h-9 w-9">
              <AvatarImage
                className="rounded-full flex h-9 w-9"
                alt="@shadcn"
                src={user?.profileImageUrl}
              />
              <AvatarFallback className="rounded-full flex h-9 w-9 bg-black">
                AC
              </AvatarFallback>
            </Avatar>
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/dashboard/settings")}>
            Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export { DashBoardAccount };
