import React from "react";
import GlobalHeader from "../components/GlobalHeader";
import NotesCard from "../components/NotesCard";
import { useGetNotesQuery } from "../features/api";
import { useState } from "react";

export default function Notes() {
  // fetch all notes

  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const { data: notes = [], error } = useGetNotesQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const selectedNote = notes?.find((note) => note.id === selectedNoteId);

  return (
    <div className="px-15 mt-15 mb-20">
      <GlobalHeader name="Notes" />
      {/* all notes */}
      <div className="flex gap-8">
        {/* left notes-side */}
        <div className="flex-1 grid xl:grid-cols-3 gap-6">
          {notes.map((note) => (
            <NotesCard
              key={note.id}
              title={note.title}
              description={note.description}
              onClick={() => setSelectedNoteId(note.id)}
            />
          ))}
        </div>

        {/*conditional render right-note side */}
        {selectedNote && (
          <div className="w-80 bg-white rounded-xl pt-10 px-5 border-3 border-gray-500/50">
            <h1 className="text-3xl font-bold mb-5">{selectedNote.title}</h1>
            <p className="mb-5 text-xl font-semibold">
              {selectedNote.description}
            </p>
            <p className="text-lg ">
              {new Date(selectedNote.created_at).toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
