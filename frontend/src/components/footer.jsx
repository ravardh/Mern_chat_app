import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className=" bg-primary text-light py-6 sticky bottom-0">
      <div className="container mx-auto text-center flex justify-evenly">
        <h4 className="text-lg font-semibold">My Website</h4>
        <p className="text-sm mt-2">© 2025 My Website. All Rights Reserved.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <NavLink
            to="/privacy-policy"
            className="text-gray-200 hover:text-white transition duration-300"
            activeClassName="text-white"
          >
            Privacy Policy
          </NavLink>
          <NavLink
            to="/terms-of-service"
            className="text-gray-200 hover:text-white transition duration-300"
            activeClassName="text-white"
          >
            Terms of Service
          </NavLink>
          <NavLink
            to="/contact-us"
            className="text-gray-200 hover:text-white transition duration-300"
            activeClassName="text-white"
          >
            Contact Us
          </NavLink>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
