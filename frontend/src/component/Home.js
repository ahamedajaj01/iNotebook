import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div
      className="py-5"
      style={{
        background: "linear-gradient(90deg, #f0f4ff 0%, #e3e6f3 100%)",
        minHeight: "100vh",
      }}
    >
      <div className="container">
        {/* Top Hero Section */}
        <div className="row align-items-center mb-5">
          {/* Left Side Text */}
          <div className="col-md-6 mb-4 mb-md-0">
            <h1 className="fw-bold display-4" style={{ color: "#4c0070" }}>
              <span style={{ color: "#8e2de2" }}>i</span>Notebook
            </h1>
            <p className="fs-5 text-dark mb-3">
              Your notebook on cloud – safe and secure
            </p>
            <p className="text-muted mb-4">
              An online platform where you can create, edit, upload, and delete your notes privately and securely — from any device, any time.
              Learn more on our{" "}
              <Link to="/about" className="text-decoration-underline text-primary">
                About Page
              </Link>.
            </p>
            <Link
              to="/signup"
              className="btn btn-lg shadow"
              style={{
                background: "linear-gradient(to right, #8e2de2, #4a00e0)",
                color: "white",
                border: "none",
                borderRadius: "8px",
              }}
            >
              ✨ Create New Note
            </Link>
          </div>

          {/* Right Side Image */}
          <div className="col-md-6 text-center">
            <img
              src="https://www.shutterstock.com/image-vector/man-write-notes-young-guy-260nw-2207285289.jpg"
              alt="Notebook Illustration"
              className="img-fluid rounded shadow"
              style={{
                maxHeight: "340px",
                objectFit: "cover",
                borderRadius: "16px",
              }}
            />
          </div>
        </div>

        {/* Features Section */}
        <div className="text-center mt-5">
          <h2 className="fw-bold mb-4" style={{ color: "#4a00e0" }}>
            Why Choose iNotebook?
          </h2>
          <div className="row g-4">
            {/* Feature 1 */}
            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body text-center">
                  <i className="fas fa-lock fa-2x mb-3 text-primary"></i>
                  <h5 className="card-title">Secure Cloud Storage</h5>
                  <p className="card-text text-muted">
                    Your notes are protected with end-to-end encryption and securely stored in the cloud.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body text-center">
                  <i className="fas fa-globe fa-2x mb-3 text-primary"></i>
                  <h5 className="card-title">Access Anytime, Anywhere</h5>
                  <p className="card-text text-muted">
                    Whether you're on mobile, tablet, or desktop, your notes follow you — anytime, anywhere.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body text-center">
                  <i className="fas fa-rocket fa-2x mb-3 text-primary"></i>
                  <h5 className="card-title">Fast & Simple</h5>
                  <p className="card-text text-muted">
                    No clutter, no noise. Just a clean, fast interface to write and manage your notes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
