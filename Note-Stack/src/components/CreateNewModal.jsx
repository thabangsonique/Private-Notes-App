import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";
import { LoaderCircle, X } from "lucide-react";
import { setCreateTaskModal } from "../features/globalSlice";
import { useCreateTaskMutation, useCreateNoteMutation } from "../features/api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function CreateNewModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isCreateTaskModalOpen = useSelector(
    (state) => state.global.isCreateTaskModalOpen,
  );
  const [isCreateTask, setIsCreateTask] = useState("Task");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");
  const [status, setStatus] = useState("to-do");
  const [tags, setTags] = useState("");

  const [createTask, { isLoading: isLoadingNewTask, error: errorNewTask }] =
    useCreateTaskMutation();
  const [createNote, { isLoading, error }] = useCreateNoteMutation();

  //submitting note
  const handleSubmitNote = async (e) => {
    e.preventDefault();

    const newNote = {
      title,
      description,
    };

    try {
      const data = await createNote(newNote).unwrap();
      console.log("Note created:", data);
      dispatch(setCreateTaskModal(false));
      navigate("/dashboard");
      toast.success("New Note created successfully!");
    } catch (error) {
      console.error("Failed to Create newnote", error);
    }
  };

  const handleSubmitTask = async (e) => {
    e.preventDefault();

    const newTask = {
      title,
      description,
      priority,
      status,
      tags,
    };
    try {
      const data = await createTask(newTask).unwrap();
      console.log("Task created successfully:", data);
      dispatch(setCreateTaskModal(false));
      navigate("/dashboard");
      toast.success("New Task created successfully!");
    } catch (error) {
      console.error("Failed to Create new task/ note", error);

      toast.error(
        error?.data?.message || error?.message || "Failed to create task",
      );
    }
  };

  if (!isCreateTaskModalOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-lg rounded-2xl bg-gray-300 p-8">
        <button
          onClick={() => dispatch(setCreateTaskModal(false))}
          className="absolute right-5 top-5 hover:cursor-pointer"
        >
          <X />
        </button>
        {/* creating a task */}
        <button
          onClick={() => setIsCreateTask("Task")}
          className={` ml-5 py-3 px-5 hover:cursor-pointer font-semibold rounded-full ${isCreateTask === "Task" ? "bg-black text-white" : "bg-gray-400 text-black"}`}
        >
          Create Task
        </button>
        <button
          onClick={() => setIsCreateTask("Note")}
          className={` ml-5 py-3 px-5 hover:cursor-pointer  text-black font-semibold rounded-full ${isCreateTask === "Note" ? "bg-black text-white" : "bg-gray-400 text-black"}`}
        >
          Create Note
        </button>

        {/* form goes here */}
        {isCreateTask === "Task" ? (
          <form onSubmit={handleSubmitTask} className="space-y-4 mt-6">
            {/* title */}
            <div className="flex flex-col">
              <label htmlFor="title" className="text-xl font-semibold mb-3">
                Title
              </label>
              <input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Enter Task title"
                className="bg-white rounded-2xl text-xl py-2 px-3 placeholder:text-lg placeholder:font-semibold"
              />
            </div>
            {/* description */}
            <div className="flex flex-col">
              <label
                htmlFor="description"
                className="text-xl font-semibold mb-3"
              >
                Description
              </label>
              <input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                placeholder="Enter Task Description"
                className="bg-white text-xl rounded-2xl py-2 px-3 placeholder:text-lg placeholder:font-semibold"
              />
            </div>
            {/* priority */}
            <div className="flex flex-col">
              <label htmlFor="priority" className="text-xl font-semibold mb-3">
                Priority
              </label>
              <select
                id="status"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                name="status"
                className="rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-black bg-white font-semibold"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            {/* status */}
            <div className="flex flex-col">
              <label htmlFor="status" className="text-xl font-semibold mb-3">
                Status
              </label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                name="status"
                className="rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-black bg-white font-semibold"
              >
                <option value="to-do">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            {/* tags */}
            <div className="flex flex-col">
              <label htmlFor="tags" className="text-xl font-semibold mb-3">
                Tags
              </label>
              <input
                id="tags"
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Enter Task Tags"
                className="bg-white text-xl rounded-2xl py-2 px-3 placeholder:text-lg placeholder:font-semibold"
              />
            </div>

            {/* submit button cta*/}
            <button
              type="submit"
              className="bg-black flex items-center justify-center text-white  text-xl rounded-full py-3 w-full mt-4 hover:scale-103 hover:cursor-pointer transition-all duration-300"
            >
              {isLoadingNewTask ? <LoaderCircle /> : "Create Task"}
            </button>
            {errorNewTask && (
              <p className="text-xl font-semibold text-red-500">
                {errorNewTask}
              </p>
            )}
          </form>
        ) : (
          <form onSubmit={handleSubmitNote} className="space-y-4 mt-6">
            {/* title */}
            <div className="flex flex-col">
              <label htmlFor="title" className="text-xl font-semibold mb-3">
                Title
              </label>
              <input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Enter Task title"
                className="bg-white rounded-2xl text-xl py-2 px-3 placeholder:text-lg placeholder:font-semibold"
              />
            </div>
            {/* description */}
            <div className="flex flex-col">
              <label htmlFor="title" className="text-xl font-semibold mb-3">
                Description
              </label>
              <input
                id="title"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                placeholder="Enter Task Description"
                className="bg-white rounded-2xl text-xl py-2 px-3 placeholder:text-lg placeholder:font-semibold"
              />
            </div>

            {/* submit button cta*/}
            <button
              typeof="submit"
              className="bg-black flex items-center justify-center text-white  text-xl rounded-full py-3 w-full mt-4 hover:scale-103 hover:cursor-pointer transition-all duration-300"
            >
              {isLoading ? <LoaderCircle /> : "Create Note"}
            </button>
            {error && (
              <p className="text-xl font-semibold text-red-500">{error}</p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
