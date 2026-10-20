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
app.use(cors());

//ROUTES
// authroutes
app.use("/api", authRoutes);
app.use("/api", authenticatedUser, tasksRoutes);
app.use("/api", authenticatedUser, notesRoutes);

const port = process.env.PORT || 3001;

export default app;

if (!process.env.VERCEL) {
  app.listen(port, () => {
    console.log("SERVER IS RUNNING LIVE ON PORT:", port);
  });
}
