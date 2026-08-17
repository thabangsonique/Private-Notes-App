import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import tasksRoutes from "./routes/tasksRoutes.js";
import { authenticatedUser } from "./middlewares/authMiddleware.js";
import notesRoutes from "./routes/notesRoutes.js";

dotenv.config();
const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://note-stack-4w075i74q-thabangsoniques-projects.vercel.app",
    ],
  }),
);

//ROUTES
// authroutes
app.use("/api", authRoutes);
app.use("/api", authenticatedUser, tasksRoutes);
app.use("/api", authenticatedUser, notesRoutes);
