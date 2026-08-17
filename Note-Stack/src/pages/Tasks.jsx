import React from "react";
import TaskStatus from "../components/TaskStatus";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import GlobalHeader from "../components/GlobalHeader";

//TASKS PAGE
export default function Tasks() {
  return (
    <div className="text-black px-15 mt-15">
      <GlobalHeader name="Tasks" />
      {/* task status section */}
      <div className="grid xl:grid-cols-3 gap-7">
        <TaskStatus status="to-do" />
        <TaskStatus status="in-progress" />
        <TaskStatus status="completed" />
      </div>
    </div>
  );
}
