import React, { useState } from "react";
import { useForm } from "react-hook-form";
import assets from "../assets/assets";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const updateProfile = (data) => {
    console.log(data);
    navigate("/");
  };
  return (
    <div className="min-h-screen bg-cover bg-no-repeat flex items-center justify-center">
      <div className="w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg">
        <form
          onSubmit={handleSubmit(updateProfile)}
          className="flex flex-col gap-5 p-10 flex-1"
        >
          <h3 className="text-lg">Profile Details</h3>

          <label
            htmlFor="avatar"
            className="flex items-center gap-3 cursor-pointer"
          >
            <input
              {...register("profilePicture")}
              onChange={(e) => setSelectedImage(e.target.files[0])}
              type="file"
              id="avatar"
              accept=".png, .jpg, .jpeg"
              hidden
            />
            <img
              src={
                selectedImage
                  ? URL.createObjectURL(selectedImage)
                  : assets.avatar_icon
              }
              alt="profile-picture"
              className={`w-12 h-12 ${selectedImage && "rounded-full"}`}
            />
            Upload Profile Image
          </label>

          <input
            {...register("fullName")}
            type="text"
            placeholder="Your Name"
            required
            className="p-2 border border-gray-500 rounded-md"
          />

          <textarea
            {...register("bio")}
            placeholder="Write bio"
            rows={4}
            className="p-2 border border-gray-500 rounded-md"
          ></textarea>

          <button
            type="submit"
            className="bg-gradient-to-r from-purple-400 to-violet-600 text-white p-2 rounded-full text-lg cursor-pointer"
          >
            Update profile
          </button>
        </form>
        <img
          src={assets.logo_icon}
          alt="logo-icon"
          className="max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10"
        />
      </div>
    </div>
  );
}
