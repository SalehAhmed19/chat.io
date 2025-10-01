import React from "react";
import assets from "../assets/assets";

export default function ChatContainer({ selectedUser, setSelectedUser }) {
  return (
    <div>
      <div className="flex items-center gap-3 py-3 mx-4 border-b border-stone-500">
        <img
          src={assets.profile_martin}
          alt="profile-image"
          className="w-8 rounded-full"
        />
        <p className="flex-1 text-lg text-white flex items-center gap-2">
          Mertin Johnson
          <span className="h-2 w-2 rounded-full bg-green-400"></span>
        </p>
      </div>
    </div>
  );
}
