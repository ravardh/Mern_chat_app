import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary text-light py-6">
      <div className="container mx-auto text-center flex justify-evenly">
        <h4 className="text-lg font-semibold">Chit Chat</h4>
        <p className="text-sm mt-2">© 2025 Chit Chat. All Rights Reserved.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <NavLink
            to="/privacyPolicy"
            className="text-gray-200 hover:text-green-500 transition duration-300"
          >
            Privacy Policy
          </NavLink>
          <NavLink
            to="/termsOfService"
            className="text-gray-200 hover:text-green-500 transition duration-300"
          >
            Terms of Service
          </NavLink>
          <NavLink
            to="/contactUs"
            className="text-gray-200 hover:text-green-500 transition duration-300"
          >
            Contact Us
          </NavLink>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
