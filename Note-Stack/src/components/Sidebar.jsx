import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCreateTaskModal } from "../features/globalSlice";

import { useNavigate, NavLink } from "react-router-dom";
import {
  Plus,
  LayoutDashboard,
  FileText,
  ClipboardCheck,
  Calendar,
  Tags,
  Settings,
  LogOut,
} from "lucide-react";
import { supabase } from "../lib/config/supabase";

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
    href: "/tasks",
  },
];

export default function Sidebar() {
  const sidebarCollapse = useSelector((state) => state.global.sideBarCollapsed);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    const { error, data } = await supabase.auth.signOut();

    if (error) {
      console.error("Error signing out", error);
      return;
    }

    navigate("/");
  };

  //sidebar classes.
  const sidebarClasses = `bg-white fixed hide-scrollbar overflow-y-auto flex flex-col items-center h-[100%] z-40 py-[46px] px-[16px] shadow-lg transition-all duration-300 ${
    sidebarCollapse ? "w-10" : "w-[256px]"
  }`;

  return (
    <div className={sidebarClasses}>
      <div className="flex flex-col w-full h-screen">
        {/* heading logo */}
        <div className="flex items-center justify-between space-x-3 px-[12px]">
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
        <button
          onClick={() => dispatch(setCreateTaskModal(true))}
          className="flex items-center justify-center mt-[32px] py-[10px] space-x-2 shadow-xl rounded-full w-full bg-black hover:scale-103 transition-all duration-300 hover:cursor-pointer"
        >
          <Plus className="text-white" />
          <span className="text-white">New Entry</span>
        </button>

        {/* menu items */}
        <div className="mt-[32px]">
          {menuItems.map((item, idx) => {
            const Icon = item.icon;

            return (
              <NavLink
                to={item.href}
                key={idx}
                className={({ isActive }) =>
                  `relative flex items-center space-x-3 mb-4 hover:cursor-pointer hover:scale-110 hover:shadow-lg h-[46px] py-[10px] pl-[12px] rounded-lg transition-all duration-300 ${
                    isActive ? "bg-active" : ""
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <div className="absolute -right-[12px] top-0 bg-black h-full rounded-r-lg w-2 transition-all duration-300 opacity-100" />
                    )}

                    <Icon />
                    <span>{item.title}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* settings tab */}
        <div className="flex space-x-2 ml-[12px] mt-auto space-x-3 py-2 hover:cursor-pointer hover:shadow-xl hover:scale-103 transition-all duration-300">
          <Settings />
          <span>Settings</span>
        </div>

        {/* signout */}
        <div
          onClick={handleLogOut}
          className="flex ml-[12px] mt-5 space-x-3 py-2 hover:shadow-xl hover:cursor-pointer hover:scale-103 transition-all duration-300"
        >
          <LogOut />
          <span>Log out</span>
        </div>
      </div>
    </div>
  );
}
