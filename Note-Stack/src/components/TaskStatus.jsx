import { MoreHorizontal } from "lucide-react";
import React from "react";
import TaskCard from "./TaskCard";
import { useGetTasksQuery, useUpdateTaskStatusMutation } from "../features/api";
import { useDrop } from "react-dnd";
import { toast } from "sonner";

export default function TaskStatus({ status, statusCount }) {
  const { data: tasks, error, isError, isLoading } = useGetTasksQuery();
  const [updateTaskStatus] = useUpdateTaskStatusMutation();

  //function for updating status.

  const taskCount = tasks?.filter((task) => task.status === status).length;

  //EACH ENTIRE STATUS COLUMN FOR TASKS.
  //DROP ZONE

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: "TASK",

    canDrop: (item) => {
      console.log("Can drop item:", item);
      console.log("Target status:", status);

      return item.status !== status;
    },

    hover: (item, monitor) => {
      console.log("Hovering over:", status);
    },

    drop: async (item) => {
      console.log("🔥 DROP DETECTED");
      console.log("Dragged item:", item);
      console.log("Target status:", status);

      if (item.status === status) {
        return;
      }

      try {
        const { error } = await updateTaskStatus({
          taskId: item.id,
          status: status,
        }).unwrap();

        if (error) {
          toast.error("Failed to update task status.");
          return;
        }

        toast.success("Task status updated successfully!");
        console.log("Task status updated successfully.");
      } catch (error) {
        console.error("failed to update task status, internal error", error);
      }
    },

    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`bg-white rounded-xl px-[24px] py-[20px] shadow-xl
    ${isOver ? "bg-blue-100" : ""}
    ${canDrop ? "ring-2 ring-green-400" : ""}
  `}
    >
      {/* heading  */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          {" "}
          <h1 className="text-xl font-semibold uppercase">{status}</h1>
          {/* status count */}
          <div className="flex items-center justify-center bg-gray-500/20 rounded-full h-6 w-6">
            <p className="font-semibold">{taskCount}</p>
          </div>
        </div>

        <MoreHorizontal />
      </div>

      {/* SECTION WILL RENDER THE TASK CARD */}
      <div className="space-y-7">
        {tasks
          ?.filter((task) => task.status === status)
          .map((task) => (
            <TaskCard
              key={task.id}
              id={task.id}
              title={task.title}
              description={task.description}
              status={task.status}
              tags={task.tags}
              priority={task.priority}
            />
          ))}
      </div>
    </div>
  );
}
