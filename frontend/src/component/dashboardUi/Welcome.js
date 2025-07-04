import React from "react";

export default function Welcome() {
  const userName = localStorage.getItem("username") || "User"; // assuming name is stored on login

  return (
    <div className="container mt-5">
      <div className="p-4 bg-light shadow rounded text-center">
        <h2 className="mb-3">👋 Welcome, <span className="text-primary">{userName}</span>!</h2>
        <p className="lead">
          Glad to have you back on <strong>iNotebook</strong>. Start managing your notes efficiently and securely.
        </p>

        <div className="row mt-5">
          <div className="col-md-4 mb-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title">📝 Create a Note</h5>
                <p className="card-text">Quickly jot down thoughts, ideas, or important tasks.</p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title">📂 Organize</h5>
                <p className="card-text">Use tags to group your notes by topic, priority, or category.</p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title">🔒 Secure</h5>
                <p className="card-text">All your notes are private and securely stored in the cloud.</p>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-4 text-muted">
          You can start by adding a new note using the form below 👇
        </p>
      </div>
    </div>
  );
}
