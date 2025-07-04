// src/components/Navbar.js
import React, { useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';

const Navbar = (props) => {
  const {showAlert} = props
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token");
  const username = localStorage.getItem("username");


  useEffect(() => {}, [location]);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    showAlert("👋 Logged out successfully", "success");
    navigate("/");
  };

  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark shadow">
      <div className="container-fluid">
        <Link className="navbar-brand"  to= {isLoggedIn?"/dashboard":"/"}>📝 iNotebook</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Left side nav links */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={`nav-link ${location.pathname === "/mynotes" ? "active" : ""}`} to="/mynotes">My Notes</NavLink>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <NavLink className={`nav-link ${location.pathname === "/" ? "active" : ""}`} to="/">Home</NavLink>
              </li>
            )}

            <li className="nav-item">
              <NavLink className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</NavLink>
            </li>
          </ul>

          {/* Right side login/signup or logout */}
          <div className="d-flex">
            {isLoggedIn ? (
              <>
                <span className="navbar-text text-white me-3">
    👋 Hello, <strong>{username}</strong>
  </span>
              <button className="btn btn-danger" onClick={handleLogout}>
                🔓 Logout
              </button>
              </>
            ) : (
              <>
                <NavLink className="btn btn-outline-success me-2" to="/login">🔑 Login</NavLink>
                <NavLink className="btn btn-outline-primary" to="/signup">📝 Signup</NavLink>
            </>
            )}
          </div>
        </div>
        </div>
    </nav>
  );
};

export default Navbar;
