import { Search, Bell } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCreateTaskModal } from "../features/globalSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const isCreateTaskModalOpen = useSelector(
    (state) => state.global.isCreateTaskModalOpen,
  );
  return (
    <div className="flex sticky top-0 z-50 bg-background items-center justify-between w-full h-[80px]  px-15">
      {/* left-side */}
      <div className="flex items-center space-x-5 ml-auto">
        <Bell />
        <div className="bg-gray-500/40 w-0.5 h-7" />
        {/* cta create task */}
        <button
          onClick={() => dispatch(setCreateTaskModal(true))}
          className="text-white bg-black py-[10px] px-[20px] rounded-full shadow-xl hover:scale-110 hover:cursor-pointer transition-all duration-300"
        >
          Quick Add
        </button>

        {/* profile icon */}
        <div className="hover:scale-110 hover:cursor-pointer rounded-full overflow-hidden h-12 w-12 transition-all duration-300">
          {" "}
          <img src="/user.png" alt="User image" />
        </div>
      </div>
    </div>
  );
}
