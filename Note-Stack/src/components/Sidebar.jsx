import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Plus,
  LayoutDashboard,
  FileText,
  ClipboardCheck,
  Calendar,
  Tags,
  Settings,
} from "lucide-react";
import { Link } from "react-router-dom";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    title: "Notes",
    icon: FileText,
    href: "/notes",
  },
  {
    title: "Tasks",
    icon: ClipboardCheck,
    href: "/Tasks",
  },
  {
    title: "Calendar",
    icon: Calendar,
    href: "/calendar",
  },
  {
    title: "Tags",
    icon: Tags,
    href: "/calendar",
  },
];

export default function Sidebar() {
  const sidebarCollapse = useSelector((state) => state.global.sideBarCollapsed);
  const [isActive, setisActive] = useState("Dashboard");

  //sidebar classes.
  const sidebarClasses = `bg-white fixed hide-scrollbar overflow-y-auto flex flex-col items-center h-[100%] z-40 py-[46px] px-[16px] shadow-lg  transition-all duration-300 ${sidebarCollapse ? "w-10" : "w-[256px]"}`;
  return (
    <div className={sidebarClasses}>
      <div className="flex flex-col w-full h-screen">
        {/* heading logo */}
        <div className="flex items-center justify-between space-x-3  px-[12px]">
          {/* icon */}
          <div className="bg-black rounded-full p-4 flex items-center justify-center">
            <img src="/lock.svg" className="w-5 h-5" alt="lock icon" />
          </div>
          {/* text */}
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold">Note Stack</h1>
            <p className="text-base font-semibold">Secure Workspace</p>
          </div>
        </div>

        {/* new entry button */}
        <button className="flex items-center justify-center mt-[32px] py-[10px] space-x-2 shadow-xl rounded-full w-full bg-black ">
          <Plus className="text-white" />
          <span className="text-white">New Entry</span>
        </button>

        {/* menu items */}
        <div className="mt-[32px]">
          {menuItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Link
                to={item.href}
                onClick={() => setisActive(item.title)}
                key={idx}
                className={`relative flex items-center space-x-3 mb-4 hover:cursor-pointer hover:scale-110 hover:shadow-lg h-[46px] py-[10px] pl-[12px] rounded-lg transition-all duration-300 ${isActive === item.title ? "bg-active" : ""}`}
              >
                {/* line */}
                {isActive === item.title ? (
                  <div className="absolute -right-[12px] top-0 bg-black h-full rounded-r-lg w-2 transition-all duration-300 opacity-100" />
                ) : null}

                <Icon />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </div>

        {/* settings tab */}
        <div className="flex space-x-2 ml-[12px] mt-auto">
          <Settings />
          <span>Settings</span>
        </div>
      </div>
    </div>
  );
}
