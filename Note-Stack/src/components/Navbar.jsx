import { Search, Bell } from "lucide-react";
import React from "react";

export default function Navbar() {
  return (
    <div className="flex items-center justify-between w-full h-[80px]  px-15">
      {/* search bar */}
      <div className="flex items-center bg-white rounded w-[328px] focus-within:shadow-lg border-b border-gray-400 py-2 px-2 space-x-3 transition-all duration-300">
        <Search />
        <input placeholder="Search tags..." className="focus:outline-none " />
      </div>

      {/* left-side */}
      <div className="flex items-center space-x-5">
        <Bell />
        <div className="bg-gray-500/40 w-0.5 h-7" />
        {/* cta create task */}
        <button className="text-white bg-black py-[10px] px-[20px] rounded-full shadow-xl hover:scale-110 hover:cursor-pointer transition-all duration-300">
          Quick Add
        </button>

        {/* profile icon */}
        <div className="rounded-full overflow-hidden h-12 w-12">
          {" "}
          <img src="/user.png" alt="User image" />
        </div>
      </div>
    </div>
  );
}
