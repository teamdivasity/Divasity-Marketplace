import { Outlet } from "react-router-dom";
import { TabBar } from "../Header/TabBar";
import { DesktopHeader } from "../Header/DesktopHeader";

export function Layout() {
  return (
    <div>
      <DesktopHeader />
      <main className="md:pt-16 pb-20 md:pb-0">
        <Outlet />
      </main>
      <TabBar />
    </div>
  );
}