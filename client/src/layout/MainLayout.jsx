import React from "react";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="bg-[url('../src/assets/bgImage.svg')] bg-no-repeat bg-cover text-white">
      <Outlet />
    </div>
  );
}
