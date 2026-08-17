import { ExternalLink } from "lucide-react";
import React from "react";
import { Clock } from "lucide-react";

export default function NotesCard({ title, description }) {
  return (
    <div className="p-6 border bg-white border-white rounded-xl shadow-lg hover:scale-103 hover:cursor-pointer transition-all duration-300 ">
      {/* title + icon */}
      <div className="flex justify-between">
        {" "}
        <h2 className="font-semibold text-2xl">{title}</h2>
        <ExternalLink className="hover:text-gray-500" />
      </div>
      {/* description */}
      <p className="text-xl mt-4">{description}</p>

      {/* date */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4" />
          <p className="text-text-muted font-semibold">Today, 2:00 PM</p>
        </div>
        {/* dot. status dependant */}
        <div className="bg-gray-400 w-3 h-3 rounded-full" />
      </div>
    </div>
  );
}
