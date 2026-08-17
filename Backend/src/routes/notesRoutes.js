import { Router } from "express";
import {
  createNote,
  deleteNote,
  getNotes,
  updateNotes,
} from "../controller/notesController.js";

const router = Router();

router.post("/notes", createNote);
router.get("/notes", getNotes);
router.put("/notes/:id", updateNotes);
router.delete("/notes/:id", deleteNote);

export default router;
