import { Router } from "express";
import {
  createTask,
  deleteTask,
  editTask,
  getTasks,
  updateTaskStatus,
} from "../controller/tasksController.js";

const router = Router();

router.post("/tasks", createTask);
router.patch("/tasks/status/:id", updateTaskStatus);
router.patch("/tasks/:id", editTask);
router.get("/Tasks", getTasks);
router.delete("/tasks/:id", deleteTask);

export default router;
