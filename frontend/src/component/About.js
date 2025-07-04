import React from 'react';
// import noteContext from "../context/notes/noteContext";

export default function About() {
    
  return (
 <div className="container py-5">
      <div className="text-center mb-4">
        <h1 className="fw-bold">About iNotebook 📝</h1>
        <p className="text-muted">Your personal cloud notebook — always with you.</p>
      </div>

      <div className="row align-items-center">
        <div className="col-md-6 mb-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
            alt="Note Illustration"
            className="img-fluid"
          />
        </div>

        <div className="col-md-6">
          <h4 className="fw-semibold">Why iNotebook?</h4>
          <p className="text-secondary">
            In a world full of chaos, we believe your thoughts deserve a peaceful space.
            iNotebook is a secure, cloud-based platform where you can capture, organize, and revisit your ideas, plans, or journal — anytime, anywhere.
          </p>
          <ul className="list-group list-group-flush mb-3">
            <li className="list-group-item">✅ Fast and simple interface</li>
            <li className="list-group-item">🔒 Your data stays private & secure</li>
            <li className="list-group-item">📱 Accessible from all your devices</li>
            <li className="list-group-item">🧠 Built for students, creators, and thinkers</li>
          </ul>
          <p className="text-muted small">
            Made with ❤️ by Ajaj Ahamed as part of a full-stack MERN learning journey.
          </p>
        </div>
      </div>
    </div>
  )
}
