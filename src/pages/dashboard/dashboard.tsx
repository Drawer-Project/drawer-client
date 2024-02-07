import { Link, Outlet } from "react-router-dom";

import { NavBar } from "./components/navbar";
import { Setting } from "./components/setting";

function DashBoard() {
  return (
    <div className="grid min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
        <div className="flex flex-col gap-2">
          <div className="flex h-[60px] items-center px-6">
            <Link className="flex items-center gap-2 font-bold text-3xl" to="#">
              <span className="">Drawer</span>
            </Link>
          </div>
          <div className="flex-1">
            <NavBar />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex justify-end h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
          <Setting />
        </header>
        <Outlet />
      </div>
    </div>
  );
}

export { DashBoard };
