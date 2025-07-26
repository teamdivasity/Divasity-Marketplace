import { Outlet } from "react-router-dom";
import { TabBar } from "../Header/TabBar";
import { DesktopHeader } from "../Header/DesktopHeader";

export function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <DesktopHeader />
      <main className="pt-20 pb-24 md:pb-8 min-h-screen">
        <Outlet />
      </main>
      <TabBar />
    </div>
  );
}