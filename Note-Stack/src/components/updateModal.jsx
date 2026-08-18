import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";
import { LoaderCircle, X } from "lucide-react";
import { setEditModal } from "../features/globalSlice";
import { useUpdateNotesMutation } from "../features/api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function UpdateModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isEditTaskModalOpen = useSelector(
    (state) => state.global.isEditTaskModalOpen,
  );
  const [isCreateTask, setIsCreateTask] = useState("Task");
  const selectedNoteId = useSelector((state) => state.global.selectedNoteId);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");
  const [status, setStatus] = useState("to-do");
  const [tags, setTags] = useState("");

  const [updateNotes, { isLoading, error }] = useUpdateNotesMutation();

  //submitting note
  const handleUpdateNote = async (e) => {
    e.preventDefault();

    const newNote = {
      id: selectedNoteId,
      title,
      description,
    };

    try {
      const data = await updateNotes(newNote).unwrap();
      console.log("Note created:", data);
      dispatch(setEditModal(false));

      if (error) {
        console.log("failed to update note", error);
        return;
      }
      toast.success("Note Updated successfully!");
    } catch (error) {
      console.error("Failed to Create newnote", error);
    }
  };

  if (!isEditTaskModalOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-lg rounded-2xl bg-gray-300 p-8">
        <button
          onClick={() => dispatch(setEditModal(false))}
          className="absolute right-5 top-5 hover:cursor-pointer"
        >
          <X />
        </button>
        {/* creating a task */}
        <h1 className="text-xl font-bold">Update Note</h1>

        {/* form goes here */}

        <form onSubmit={handleUpdateNote} className="space-y-4 mt-6">
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
            type="submit"
            className="bg-black flex items-center justify-center text-white  text-xl rounded-full py-3 w-full mt-4 hover:scale-103 hover:cursor-pointer transition-all duration-300"
          >
            {isLoading ? <LoaderCircle /> : "Update Note"}
          </button>
          {error && (
            <p className="text-xl font-semibold text-red-500">
              Failed to update
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
