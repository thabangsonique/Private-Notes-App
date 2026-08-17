import { supabase } from "../config/supabase.js";

export const signUp = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    });

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    return res
      .status(200)
      .json({ message: "User was created successfully", user: data.user });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// user sign in
export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(400).jason({ message: error });
    }

    return res.status(201).json({
      message: "Log in successful.",
      user: data.user,
      session: data.session,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

//user Sign-out.
export const LogOut = async (req, res) => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return res.status(400).json({ message: error });
    }

    return res.status(201).json({ message: "Log out was successful!" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
