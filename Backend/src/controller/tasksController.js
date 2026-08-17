import { SupabaseClient } from "@supabase/supabase-js";
import { supabase } from "../config/supabase.js";

//fetch all tasks.
export const getTasks = async (req, res) => {
  try {
    const userId = req.user.id;

    const { data, error } = await req.supabase
      .from("tasks")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      return res.status(500).json({ message: "Failed to fetch tasks" });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const createTask = async (req, res) => {
  try {
    const userId = req.user.id;

    const { title, description, tags, priority, status } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Tittle is required" });
    }

    if (!description) {
      return res.status(400).json({ message: "Description is required" });
    }

    const { data, error } = await req.supabase
      .from("tasks")
      .insert({
        title,
        user_id: userId,
        description,
        tags,
        priority,
        status,
      })
      .select()
      .single();

    if (error) {
      return res
        .status(400)
        .json({ message: "Failed to create task", error: error.message });
    }

    return res
      .status(201)
      .json({ message: "Task created successfully.", data });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// editing the task
export const editTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const userId = req.user.id;

    const { title, description, tags, priority, status } = req.body;

    const updates = {};

    if (title !== undefined) {
      updates.title = title;
    }
    if (description !== undefined) updates.description = description;
    if (tags !== undefined) updates.tags = tags;
    if (priority !== undefined) updates.tags = tags;
    if (status !== undefined) updates.tags = tags;

    const { data, error } = await req.supabase
      .from("tasks")
      .update(updates)
      .eq("id", taskId)
      .eq("user_id", userId)
      .select()
      .single();

    if (error) {
      return res.status(400).json({ message: "Failed to update task" });
    }

    if (!data) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(201).json({ message: "Task updated successfully", data });
  } catch (errr) {
    return res.status(500).json({ message: " Internal server error" });
  }
};

//update status.
export const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const taskId = req.params.id;
    const userId = req.user.id;

    console.log("Task ID:", taskId);
    console.log("New status:", status);
    console.log("User ID:", userId);

    const { data, error } = await req.supabase
      .from("tasks")
      .update({ status })
      .eq("id", taskId)
      .eq("user_id", userId)
      .select()
      .single();

    if (error) {
      console.error("SUPABASE UPDATE ERROR:", error);

      return res.status(400).json({
        message: "Failed to update task the STATUS.",
        error: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      });
    }

    console.log("UPDATED TASK:", data);

    return res.status(200).json({
      message: "Task status updated successfully",
      data,
    });
  } catch (error) {
    console.error("CONTROLLER ERROR:", error);

    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
//delete a task.
export const deleteTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const noteId = req.params.id;

    const { data, error } = await req.supabase
      .from("tasks")
      .delete()
      .eq("id", noteId)
      .eq("user_id", userId)
      .select()
      .single();

    if (error) {
      return res.status(500).json({ message: "Failed to delete task" });
    }

    if (!data) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({ message: "Task deleted successfully", data });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
