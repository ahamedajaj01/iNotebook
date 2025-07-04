import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  
  return (
    <section
      className="d-flex align-items-center justify-content-center text-center"
      style={{
        minHeight: "80vh",
        background:
          "linear-gradient(to right,rgba(191, 242, 233, 0.68), #acb6e5)",
      }}
    >
      <div className="container">
        <h1 className="display-4 fw-bold text-dark">Welcome to 📝 iNotebook</h1>
        <p className="lead text-secondary mt-3 mb-4">
          Your private and secure place to store personal notes — available
          anywhere, anytime.
        </p>
        <div>
          <Link to="/signup" className="btn btn-primary btn-lg">
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
}
