import { Search, Bell } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCreateTaskModal } from "../features/globalSlice";
import { supabase } from "../lib/config/supabase";

export default function Navbar() {
  const dispatch = useDispatch();
  const isCreateTaskModalOpen = useSelector(
    (state) => state.global.isCreateTaskModalOpen,
  );
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        console.error("Error getting user:", error);
        return;
      }

      if (user) {
        const firstName = user.user_metadata?.first_name;
        const lastName = user.user_metadata?.last_name;

        setUserName(`${firstName} ${lastName}`);
      }
    };

    getUser();
  }, []);

  return (
    <div className="flex sticky top-0 z-50 bg-background items-center justify-between w-full h-[80px]  px-15">
      {/* left-side */}
      <div>
        <p className="text-2xl font-bold">
          Welcome <span className="font-normal">{userName}</span>
        </p>
      </div>
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
