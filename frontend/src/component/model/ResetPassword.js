import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ResetPassword() {
    const host = process.env.REACT_APP_API_URL;

    
    const [showPassword, setShowPassword] = useState(false);
    
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        `${host}/api/auth/resetpassword/${token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        }
      );
      const json = await response.json();
      if (response.ok) {
        setMessage(json.message || "Password reset successful!");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setError(json.error || "Failed to reset password.");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
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
        <h3 className="text-center mb-4">🔑 Reset Password</h3>
        <div className="mb-3 position-relative">
          <label htmlFor="password" className="form-label fw-bold">
            New Password
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={5}
            required
            />
                 {/* Eye Icon */}
      <i
        className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
        onClick={() => setShowPassword(!showPassword)}
        style={{
          position: 'absolute',
          top: '70%',
          right: '10px',
          transform: 'translateY(-50%)',
          cursor: 'pointer',
          color: '#6c757d'
        }}
      ></i>      {/* Eye Icon */}
      <i
        className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
        onClick={() => setShowPassword(!showPassword)}
        style={{
          position: 'absolute',
          top: '70%',
          right: '10px',
          transform: 'translateY(-50%)',
          cursor: 'pointer',
          color: '#6c757d'
        }}
      ></i>
        </div>


        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label fw-bold">
            Confirm New Password
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            className="form-control"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            minLength={5}
            required
          />
        </div>
        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-danger">{error}</div>}
        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={loading}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
          </>
  );
}
