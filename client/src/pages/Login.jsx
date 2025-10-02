import React, { useContext, useState } from "react";
import assets from "../assets/assets";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/context";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState("Sign up");
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { login } = useContext(AuthContext);

  const handleAuthentication = (data) => {
    if (current === "Sign up" && !submitted) {
      setSubmitted(true);
      return;
    }
    login(current === "Sign up" ? "signup" : "login", {
      fullName: data.fullName,
      email: data.email,
      password: data.password,
      bio: data.bio,
    });
  };
  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl">
      {/* left */}
      <img src={assets.logo_big} alt="logo" className="w-[min(30vh, 250px)]" />
      {/* right */}

      <form
        onSubmit={handleSubmit(handleAuthentication)}
        className="border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg"
      >
        <h2 className="font-medium text-2xl flex justify-between items-center">
          {current}
          {submitted && (
            <img
              onClick={() => setSubmitted(false)}
              src={assets.arrow_icon}
              alt="arrow-icon"
              className="w-5 cursor-pointer"
            />
          )}
        </h2>

        {current === "Sign up" && !submitted && (
          <input
            {...register("fullName")}
            type="text"
            placeholder="Full name"
            required
            className="p-2 border border-gray-500 rounded-md outline-none"
          />
        )}
        {!submitted && (
          <>
            <input
              {...register("email")}
              type="email"
              placeholder="Email Address"
              required
              className="p-2 border border-gray-500 rounded-md outline-none"
            />
            <input
              {...register("password")}
              type="password"
              placeholder="Password"
              required
              className="p-2 border border-gray-500 rounded-md outline-none"
            />
          </>
        )}

        {current === "Sign up" && submitted && (
          <textarea
            {...register("bio")}
            rows={4}
            type="text"
            placeholder="Bio"
            required
            className="p-2 border border-gray-500 rounded-md outline-none"
          />
        )}

        <button
          type="submit"
          className="py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer"
        >
          {current === "Sign up" ? "Create Account" : "Login"}
        </button>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <input type="checkbox" />{" "}
          <p>Agree to the terms of use & privacy policy.</p>
        </div>
        <div className="flex flex-col gap-2">
          {current === "Sign up" ? (
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <span
                onClick={() => {
                  setCurrent("Login");
                  submitted(false);
                }}
                className="font-medium text-violet-500 cursor-pointer"
              >
                Login
              </span>
            </p>
          ) : (
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <span
                onClick={() => {
                  setCurrent("Sign up");
                }}
                className="font-medium text-violet-500 cursor-pointer"
              >
                Signup
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
