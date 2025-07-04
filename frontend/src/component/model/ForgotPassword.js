import React, { useState } from 'react'
import { createPortal } from 'react-dom';

export default function ForgotPassword() {
    const host = process.env.REACT_APP_API_URL;

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");
    try {
      const response = await fetch(`${host}/api/auth/forgotpassword`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      const json = await response.json();
      if (response.ok) {
        setMessage(json.message || "Reset link sent! Check your email.");
      } else {
        setError(json.error || "Failed to send reset link.");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div className="modal fade" id="forgetPasswordModal" tabIndex="-1" aria-labelledby="forgetPasswordModalLabel">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="forgetPasswordModalLabel">Reset Password</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <p>Enter your email address to receive a password reset link.</p>
              <div className="mb-3" id="forgetPasswordForm">
                <label htmlFor="resetEmail" className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="resetEmail"
                  placeholder="name@example.com"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>
              {message && <div className="alert alert-success">{message}</div>}
              {error && <div className="alert alert-danger">{error}</div>}
              <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>,
    document.body
  );
}