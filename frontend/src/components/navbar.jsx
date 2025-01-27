import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const ActiveClass = ({ isActive }) =>
    isActive ? "text-secondary font-semibold" : "hover:text-green-500";

  return (
    <nav className="bg-light text-primary p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">Chit Chat</div>
        <ul className="flex space-x-4">
          <li>
            <NavLink to="/" className={ActiveClass}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/signup" className={ActiveClass}>
              Sign Up
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" className={ActiveClass}>
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to="/update" className={ActiveClass}>
              Update
            </NavLink>
          </li>
          <li>
            <NavLink to="/logout" className={ActiveClass}>
              Logout
            </NavLink>
          </li>
          <li>
            <NavLink to="/chat" className={ActiveClass}>
              Chat
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
