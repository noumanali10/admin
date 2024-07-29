import React from "react";
import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <>
      <nav className="flex justify-around items-center bg-gray-600 text-white h-14 text-xl">
        <div className="leftNav">
          <Link to="/admin">
            <i className="fa-solid fa-bars"></i>
          </Link>
        </div>
        <div className="centerNav">
          <Link to="/admin"> Dashboard </Link>
        </div>
        <div className="rightNav">
          <i className="fa-solid fa-user"></i>
        </div>
      </nav>
      <div>
       
        
      </div>
    </>
  );
}
