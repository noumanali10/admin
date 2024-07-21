import React from "react";

export default function Navbar() {
  return (
    <>
      <nav className="flex justify-around items-center bg-gray-600 text-white h-14 text-xl">
        <div className="leftNav">
          <i class="fa-solid fa-bars"></i>
        </div>
        <div className="centerNav">
            <h1>Dashboard</h1>
        </div>
        <div className="rightNav">
          <i class="fa-solid fa-user"></i>
        </div>
      </nav>
    </>
  );
}
