import { useState } from "react";
import { supabase } from "../lib/config/supabase";
import { useNavigate } from "react-router-dom";
import React from "react";
import { ArrowRight, LoaderCircle } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setIsLoading(true);

    //supabse hanldes authentication directly
    try {
      //login existing user.
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        setIsLoading(false);
        return; // stop here if login fails
      }

      console.log("logged in successfully");
      setIsLoading(false);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  //UI login screen
  return (
    <div className="py-10 px-20 bg-background h-screen">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="xl:text-5xl font-bold">Note Stack</h1>
        <div className="flex items-center justify-center bg-black rounded-full h-20 w-20">
          {" "}
          <img src="/lock.svg" alt="note stack logo" className="h-10 w-10" />
        </div>
      </div>

      {/* login/signup section */}
      <div className="flex items-center justify-center mt-20 ">
        {/* form */}
        <form
          onSubmit={handleLogin}
          className="rounded-xl bg-white shadow-2xl w-[800px] px-10 py-10"
        >
          {/* form header */}
          <div className="text-center space-y-5">
            <h1 className="text-4xl font-bold">Welcome Back</h1>
            <p className="text-xl font-semibold">
              Sign in to access your digital note stack
            </p>
          </div>

          {/* email */}
          <div className="flex flex-col mt-10">
            <label htmlFor="email" className="font-semibold text-2xl">
              Email Address
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="p-2 placeholder:text-xl placeholder:font-semibold text-lg rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-300"
            />
          </div>

          {/* password */}
          <div className="flex flex-col mt-10">
            <label htmlFor="password" className="font-semibold text-2xl">
              password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="p-2 placeholder:text-xl placeholder:font-semibold rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-300"
            />
          </div>

          {/* submit button */}
          <button
            type="submit"
            className="form-btn w-full bg-black space-x-3 shadow-xl mt-10 "
          >
            {isLoading ? (
              <LoaderCircle className="text-white animate-spin" />
            ) : (
              <div className="flex space-x-4">
                <p className="text-white text-xl">Sign In</p>
                <ArrowRight className="text-white" />
              </div>
            )}
          </button>

          {error && (
            <p className="text-red-500 font-semibold text-xl mt-5">{error}</p>
          )}

          <div className="mt-10 text-center">
            <p className="text-xl text-text-muted font-semibold">
              Dont have an account?{" "}
              <span className="text-black hover:cursor-pointer hover:text-gray-600">
                Create an account
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
