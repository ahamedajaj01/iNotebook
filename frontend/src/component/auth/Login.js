import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import ForgotPassword from "../model/ForgotPassword";

export default function Login({ showAlert }) {
  const [showPassword, setShowPassword] = useState(false);

  const host = process.env.REACT_APP_API_URL;


  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${host}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const json = await response.json();

      if (response.ok && json.authToken) {
        localStorage.setItem("token", json.authToken);
        localStorage.setItem("username", json.user.name);

        showAlert && showAlert("🎉 Login successful!", "success");
        navigate("/dashboard");
      } else {
        showAlert &&
          showAlert(
            "❌ Login failed: " + (json.error || "Invalid credentials"),
            "danger"
          );
      }
    } catch (error) {
      console.error(error);
      showAlert && showAlert("❌ Login failed: Server error", "danger");
    }
  };

  return (
    <>
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <form
        onSubmit={handleSubmit}
        className="shadow p-4 rounded bg-light"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h3 className="text-center mb-4">🔓 Login to iNotebook</h3>

        <div className="mb-3">
          <label htmlFor="email" className="form-label fw-bold">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
            autoComplete="username"
          />
        </div>

        <div className="mb-4 position-relative">
          <label htmlFor="password" className="form-label fw-bold">
            Password
          </label>

          <input
            type={showPassword ? "text" : "password"}
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
            autoComplete="current-password"
          />

          <i
            className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              top: "70%",
              right: "10px",
              transform: "translateY(-50%)",
              cursor: "pointer",
              color: "#6c757d",
            }}
          ></i>
        </div>
 {/* Forget Password link */}
        <div className="text-center mb-3">
          {/* eslint-disable-next-line */}
         <a
  href="#"
  data-bs-toggle="modal"
  data-bs-target="#forgetPasswordModal"
  className="text-decoration-none text-secondary"
  onClick={() => document.activeElement.blur()}
>
  Forgot Password?
</a>
          {/* Ensure ForgotPassword modal manages focus and does not use aria-hidden on focused elements */}
        </div>

        <button type="submit" className="btn btn-primary w-100">
          🔐 Login
        </button>
         <div>
                  <p className="text-muted text-center">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-decoration-none">
                      Sign up
                    </Link>
                  </p>
                </div>
      </form>
    </div>
          <ForgotPassword />
          </>
  );
}
