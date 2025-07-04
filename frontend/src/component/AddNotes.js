import React, { useState, useContext } from "react";
import noteContext from "../context/notes/noteContext";
import Alert from "./Alert";


export default function AddNote(props) {
    const {showAlert, alert} = props
    const context = useContext(noteContext) 
    const {addNote} = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   // Check title and description validation
if (note.title.length <= 3) {
  return showAlert("❗ Title must be more than 3 characters", "danger");
}
if (note.description.length <= 5) {
 return  showAlert("❗ Description must be more than 5 characters", "danger");
}
if (!note.tag) {
 return  showAlert("❗ Must be tag name", "danger");
}
  // call context function to add note
    addNote(note.title, note.description, note.tag)
    // reset form
    setNote({ title: "", description: "", tag: "" });
      // ✅ Show alert when note added
    showAlert("Note added successfully!", "success");
    }
  
  

  return (
    <>
      {/* Render alert here so it shows just above the form */}
      {alert && <Alert type={alert.type} message={alert.message} />}
      
    <form onSubmit={handleSubmit} className="p-4 shadow rounded bg-light">
          <h2 className="mb-4">📘✍️ Add a New Note</h2>

      <div className="mb-3">
        <label htmlFor="title" className="form-label fw-bold">Title</label>
        <input
          type="text"
          className="form-control"
          id="title"
          name="title"
          value={note.title}
          onChange={handleChange}
          placeholder="Enter title"
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label fw-bold">Description</label>
        <textarea
          className="form-control"
          id="description"
          name="description"
          value={note.description}
          onChange={handleChange}
          rows="3"
          placeholder="Write your note here..."
          required
        ></textarea>
      </div>

      <div className="mb-3">
        <label htmlFor="tag" className="form-label fw-bold">Tag</label>
        <input
          type="text"
          className="form-control"
          id="tag"
          name="tag"
          value={note.tag}
          onChange={handleChange}
          placeholder="e.g. work, personal"
        />
      </div>

      <button type="submit" className="btn btn-primary w-100">
        ➕ Add Note
      </button>
    </form>
          </>
  );
}
