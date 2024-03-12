import { CircleUserRound } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const SettingMenuList: React.FC = () => {
  return (
    <div className="grid grid-cols-4 gap-4">
      <SettingMenu />
    </div>
  );
};

const SettingMenu: React.FC = () => {
  return (
    <Link to="/dashboard/settings/account">
      <Card className="hover:shadow-lg">
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>
            Update your account information here.
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex gap-4">
          <CircleUserRound />
        </CardFooter>
      </Card>
    </Link>
  );
};

const Settings: React.FC = () => {
  return (
    <main className="w-4/6 mx-auto flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex flex-col gap-3">
        <h1 className="mt-2 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Settings
        </h1>
      </div>
      <SettingMenuList />
    </main>
  );
};

export { Settings };
