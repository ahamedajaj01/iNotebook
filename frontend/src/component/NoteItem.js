import React from 'react';


export default function NoteItem(props) {
    const {note, onEdit, onDelete} = props

    
     // Format date nicely
  const formattedDate = new Date(note.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return (
    <>
 

{/* from here notes will show which one is addded */}
   <div
      className="card my-3 shadow-lg rounded-3"
      style={{ backgroundColor: "#f8f9fa", transition: "transform 0.2s ease" }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <div className="card-body p-3">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="card-title text-primary fw-bold mb-0">{note.title}</h5>
          <small className="text-muted">{formattedDate}</small>
        </div>
        <p className="card-text text-secondary">{note.description}</p>
        <div className="d-flex justify-content-end gap-2 mb-2">
          <button
            className="btn btn-sm btn-outline-primary"
            aria-label={`Edit note ${note.title}`}
            onClick={()=>{onEdit(note)}}
            >
            Edit
          </button>
          <button
              className="btn btn-sm btn-outline-danger"
            aria-label={`Delete note ${note.title}`}
onClick={()=> onDelete(note._id)}
          >
            Delete
          </button>
        </div>
      </div>
      <div
        className="text-center text-white fw-semibold py-2 rounded-bottom"
        style={{ backgroundColor: "#0dcaf0" /* Bootstrap info */ }}
        >
        {note.tag || "General"}
      </div>
    </div>
        </>
  )
}
