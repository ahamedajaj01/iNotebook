// src/component/Footer.js
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-3 mt-auto shadow-sm">
      <div className="container text-center">
        <p className="mb-1">📝 iNotebook &copy; {new Date().getFullYear()}</p>
        <small>Secure • Fast • Personal Notes Manager</small>
      </div>
    </footer>
  );
};

export default Footer;
