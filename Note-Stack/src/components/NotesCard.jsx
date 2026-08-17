import { Delete, ExternalLink, Trash, Trash2 } from "lucide-react";
import React from "react";
import { Clock } from "lucide-react";
import { useDeleteNoteMutation } from "../features/api";
import { toast } from "sonner";

export default function NotesCard({ title, description, onClick, id }) {
  const [deleteNote, { error }] = useDeleteNoteMutation();
  const handleDelete = async () => {
    try {
      await deleteNote(id).unwrap();

      if (error) {
        console.error("Failed to delet note");
        return;
      }

      toast.success("Note deleted successfully");
    } catch (error) {
      console.error("Internal server error", error);
    }
  };

  return (
    <div
      onClick={onClick}
      className="p-6 border bg-white border-white rounded-xl shadow-lg hover:scale-103 hover:cursor-pointer transition-all duration-300 "
    >
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

      {/* delete note */}
      <Trash2 onClick={handleDelete} className="text-red-500 mt-5" />
    </div>
  );
}
