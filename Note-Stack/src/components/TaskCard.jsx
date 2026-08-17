import { CheckCircle, Clock } from "lucide-react";
import React from "react";
import { useDrag } from "react-dnd";

export default function TaskCard({
  id,
  title,
  description,
  status,
  tags,
  priority,
}) {
  // console.log(`here is the task status: ${status}`);

  //react drag and drop function.
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",

    item: {
      id,
      status,
    },

    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  }));

  return (
    <div
      ref={drag}
      className={`relative rounded-xl p-5 shadow-2xl
    hover:cursor-pointer hover:scale-103 transition-all duration-300

    ${
      isDragging
        ? "opacity-50 border-3 border-blue-500"
        : status === "to-do"
          ? "border-2 border-gray-500/40"
          : status === "in-progress"
            ? "border-3 border-blue-500/40"
            : status === "completed"
              ? "border-3 border-green-500/70"
              : ""
    }
  `}
    >
      {/* line */}

      <div
        className={`absolute top-0 left-0 h-full rounded-l-xl w-1 ${status === "in-progress" && "bg-blue-500/50"}`}
      />

      {/* tags */}
      <div className="flex space-x-4">
        <div className="font-bold bg-gray-500/40 rounded-full px-3">Work</div>
        <div
          className={` ${
            priority === "high"
              ? "font-bold text-red-400 bg-red-500/25 rounded-full px-3"
              : priority === "medium"
                ? "font-bold text-yellow-600 bg-yellow-400/25 rounded-full px-3"
                : priority === "low"
                  ? "font-bold text-blue-600 bg-blue-600/25 rounded-full px-3"
                  : ""
          }`}
        >
          {priority}
        </div>

        {/* checkmark */}
        {status === "completed" && (
          <CheckCircle className="ml-auto text-green" />
        )}
      </div>

      {/* task text */}
      <div className="mt-4">
        <h1 className="text-xl font-semibold">{title}</h1>
        <p className="mt-2 h-20">{description}</p>
      </div>

      {/* task set date and time */}
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
