import { supabase } from "../config/supabase.js";

//creating a note.
export const createNote = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }
    if (!title) {
      return res.status(400).json({ message: "Description is required" });
    }

    const { data, error } = await req.supabase
      .from("notes")
      .insert({
        title,
        description,
        user_id: userId,
      })
      .select()
      .single();

    if (error) {
      return res.status(500).json({ message: "Failed to create Note" });
    }

    return res.status(201).json({ message: "Note created successfully", data });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

//fetch all the notes from the database
export const getNotes = async (req, res) => {
  try {
    const userId = req.user.id; // userId from the auth middleware

    const { data, error } = await req.supabase
      .from("notes")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      return res.status(500).json({ message: "Failed to fetch notes" });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

//update specific notes.
export const updateNotes = async (req, res) => {
  try {
    const noteId = req.params.id;
    const userId = req.user.id;

    const { title, description } = req.body;

    const { data, error } = await req.supabase
      .from("notes")
      .update({
        title,
        description,
      })
      .eq("id", noteId)
      .eq("user_id", userId)
      .select()
      .single();

    if (error) {
      return res
        .status(500)
        .json({ message: "Failed to update task.", error: error.message });
    }

    if (!data) {
      return res.status(404).json({ message: "Task not found." });
    }
    return res.status(201).json(data);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server error." });
  }
};

//delete a note.
export const deleteNote = async (req, res) => {
  try {
    const noteId = req.params.id; // the url
    const userId = req.user.id;

    const { data, error } = await req.supabase
      .from("notes")
      .delete()
      .eq("id", noteId)
      .eq("user_id", userId)
      .select()
      .single();

    if (error) {
      return res.status(500).json({ message: "failed to delete note" });
    }

    if (!data) {
      return res.status(404).json({ message: "Note not found." });
    }

    return res.status(200).json({ message: "Note deleted successfully", data });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
