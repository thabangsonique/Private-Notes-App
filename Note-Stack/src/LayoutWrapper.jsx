import React from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function LayoutWrapper() {
  const sidebarCollapse = useSelector((state) => state.global.sideBarCollapsed);
  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />

      <main className={`w-full ${sidebarCollapse ? "" : "md:ml-[256px]"}`}>
        <Navbar />
        <Outlet />
      </main>
    </div>
  );
}
