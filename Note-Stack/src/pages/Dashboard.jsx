import React from "react";
import TaskStatus from "../components/TaskStatus";
import { ArrowRight, LoaderCircle } from "lucide-react";
import NotesCard from "../components/NotesCard";
import { useGetNotesQuery, useGetTasksQuery } from "../features/api.js";
import GlobalHeader from "../components/GlobalHeader.jsx";
import { Plus } from "lucide-react";
import TaskCard from "../components/TaskCard.jsx";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const { data, error, isError, isLoading } = useGetNotesQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const {
    data: tasks,
    error: tasksError,
    isError: tasksIsError,
    isLoading: isTasksLoading,
  } = useGetTasksQuery();

  console.log(`Here are the new notes: ${data}`);
  console.log(`error fetching notes: ${error}`);

  return (
    <div className="text-black px-15 mt-15 overflow-y-auto">
      {/* GLOBAL HEADER */}

      <GlobalHeader
        name="Dashboard"
        title="Stay organized and keep track of what matters."
      />

      {/* NOTES SECTION */}
      {/* Header */}
      <div className="flex items-center justify-between">
        {/* left-side */}
        <h2 className="text-2xl font-bold tracking-wider">Personal Notes</h2>

        {/* right-side */}
        <div className="flex items-center justify-between gap-3 hover:scale-110 hover:cursor-pointer transition-all duration-300">
          <Link to={"/notes"} className="flex space-x-3">
            {" "}
            <p className="font-semibold">View all notes</p>
            <ArrowRight />
          </Link>
        </div>
      </div>
      {/* line */}
      <div className="bg-gray-400/50 w-full h-0.5 mt-4" />

      {/* ACTUAL NOTES */}
      {isLoading ? (
        <div className="flex items-center justify-center mt-30 mb-30">
          <LoaderCircle size={60} className="animate-spin text-gray-500" />
        </div>
      ) : isError ? (
        <div className="flex items-center justify-center mt-15 mb-15">
          <p className="text-2xl text-gray-800">Failed to load notes.</p>
        </div>
      ) : !data ? (
        <div>
          <p>No notes found. Create your first note.</p>
          <button>
            <Plus />
            Create Note
          </button>
        </div>
      ) : (
        <div className="grid xl:grid-cols-3 gap-7 mt-10">
          {/* map through note cards */}
          {data?.map((note, idx) => (
            <NotesCard
              key={idx}
              title={note.title}
              description={note.description}
            />
          ))}
        </div>
      )}

      {/* TASK SECTION */}

      {/* Header */}
      <div className="flex items-center justify-between mt-10">
        {/* left-side */}
        <h2 className="text-2xl font-bold tracking-wider">Tasks</h2>

        {/* right-side */}
        <div className="flex items-center justify-between gap-3 hover:scale-110 hover:cursor-pointer transition-all duration-300">
          <p className="font-semibold">View all notes</p>
          <ArrowRight />
        </div>
      </div>
      {/* line */}
      <div className="bg-gray-400/50 w-full h-0.5 mt-4" />

      {isLoading ? (
        <div className="flex items-center justify-center mt-30 mb-30">
          <LoaderCircle size={60} className="animate-spin text-gray-500" />
        </div>
      ) : isError ? (
        <div className="flex items-center justify-center mt-15 mb-15">
          <p className="text-2xl text-gray-800">Failed to load tasks.</p>
        </div>
      ) : !data ? (
        <div>
          <p>No tasks found. Create your first task.</p>
          <button className="primary-btn">
            <Plus />
            Create Task
          </button>
        </div>
      ) : (
        <div className="grid xl:grid-cols-3 gap-7 mt-10">
          {tasks?.map((task, idx) => (
            <TaskCard
              key={idx}
              title={task.title}
              description={task.description}
              status={task.status}
              tags={task.tags}
              priority={task.priority}
            />
          ))}
        </div>
      )}
    </div>
  );
}
