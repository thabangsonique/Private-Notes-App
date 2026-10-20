import { createClient } from "@supabase/supabase-js";
import { supabase } from "../config/supabase.js";
import dotenv from "dotenv";

dotenv.config();

export const authenticatedUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    console.log(authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authorization is required" });
    }

    const token = authHeader.split(" ")[1];

    // supabase verify if user is authenticated to make the request
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    req.user = user;

    //tells superbase that this user can now be authenticated to make requests.
    req.supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY,
      {
        global: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      },
    );

    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
