import { Link, Outlet } from "react-router-dom";

import { DashBoardAccount } from "./dashboard-account";
import { DashBoardNav } from "./dashboard-nav";

function DashBoard() {
  return (
    <div className="grid min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
        <div className="flex flex-col gap-2">
          <div className="flex h-[60px] items-center px-6">
            <Link
              className="flex items-center gap-2 font-bold text-3xl"
              to="/dashboard/bookmark"
            >
              <span className="">Drawer</span>
            </Link>
          </div>
          <div className="flex justify-between  h-[60px] gap-4 items-center px-6 bg-slate-200">
            <div className="flex flex-col">
              <div className="font-semibold">This is a toy project.</div>
            </div>
          </div>
          <div className="flex-1">
            <DashBoardNav />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex justify-end h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
          <DashBoardAccount />
        </header>
        <Outlet />
      </div>
    </div>
  );
}

export { DashBoard };
