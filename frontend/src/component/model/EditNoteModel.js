import React from "react";

export default function EditNoteModal({ note, onChange, onSave, onClose , errorMessage}) {
  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{
        backgroundColor: "rgba(0,0,0,0.5)",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1050,
        width: "100%",
        height: "100%",
        overflow: "auto",
      }}
    >

      {errorMessage && (
  <div className=" container alert alert-danger p-2 py-1 mb-3" role="alert">
    {errorMessage}
  </div>
)}
      <div className="modal-dialog">
        <div className="modal-content p-3">
          <div className="modal-header">
            <h5 className="modal-title">✏️ Edit Note</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <input
              type="text"
              name="title"
              value={note.title}
              onChange={onChange}
              className="form-control mb-2"
              placeholder="Title"
            />
            <textarea
              name="description"
              value={note.description}
              onChange={onChange}
              className="form-control mb-2"
              placeholder="Description"
              rows={3}
            />
            <input
              type="text"
              name="tag"
              value={note.tag}
              onChange={onChange}
              className="form-control"
              placeholder="Tag"
            />
          </div>
          <div className="modal-footer">
            <button className="btn btn-success" onClick={onSave}>
              Save
            </button>
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
