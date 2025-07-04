import React, { useContext, useState, useEffect } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import EditNoteModal from "./model/EditNoteModel";
import AddNotes from './AddNotes'; //To render addnotes component to addnotes in mynotes page


export default function MyNotes(props) {
  const context = useContext(noteContext);
  const { notes, deleteNote, editNote, getNotes } = context;
    const [showAddNote, setShowAddNote] = useState(false);

  // state for to show error message while editing notes
  const [errorMessage, setErrorMessage] = useState("");

  setTimeout(() => {
    setErrorMessage();
  }, 1500);

  // State for note change edit del
  const [noteState, setNoteState] = useState(null);

  const { showAlert} = props;

  // Get all notes from data base
  useEffect(() => {
    getNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // show model with note when user click edit button
  // ✏️ Handle edit
  const handleEdit = (note) => {
    setNoteState(note);
    console.log("Editing note:", note);
    // You can also trigger a modal here and pass `note` to it
  };
  // Update model input
  const handleEditChange = (e) => {
    setNoteState({ ...noteState, [e.target.name]: e.target.value });
  };
  // Save updated note and close model
  const handleUpdate = () => {
    if (noteState.title.length <= 3) {
      return setErrorMessage("❗ Title must be more than 3 characters");
    }
    if (noteState.description.length <= 5) {
      return setErrorMessage("❗ Description must be more than 5 characters");
    }
    // If valid proceed to update
    editNote(
      noteState._id,
      noteState.title,
      noteState.description,
      noteState.tag
    );
    setNoteState(null);
    showAlert("✏️ Note updated successfully", "success");
  };

  // Handle delete
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "⚠️ Are you sure you want to delete this note?"
    );
    if (confirmDelete) {
      deleteNote(id);
      showAlert("🗑️ Note deleted successfully", "success");
    }
  };

  return (
    <>
      {/* Modal: show only if noteState is not null */}
      {noteState && (
        <EditNoteModal
          note={noteState}
          onChange={handleEditChange}
          onSave={handleUpdate}
          onClose={() => setNoteState(null)}
          errorMessage={errorMessage}
        />
      )}
      <div className="container" style={{marginTop: "70px"}}>
        <h2>📒 My Notes</h2>

  {/* Top Add Note button */}
      <div className="d-flex justify-content-end mb-3">
        
        <button
          className="btn btn-primary"
          onClick={() => setShowAddNote(!showAddNote)}
        >
          📘✍️ Add a New Note
        </button>
      </div>
      {/* Show AddNotes below the button as banner */}
      {showAddNote && (
        <div className="mb-3 p-3 bg-light border rounded">
<div className="position-relative">
  <button
    type="button"
    className="btn-close position-absolute top-0 end-0 m-2"
    aria-label="Close" onClick={()=>setShowAddNote(false)}
  ></button>
</div>          <AddNotes  showAlert={showAlert}/>
        </div>
      )}

{/* from here when Mynotes route empty */}
        {notes.length === 0 && (
          <div className="alert alert-info text-center shadow-sm p-4 mt-4">
            <h4 className="mb-3">📭 No Notes Yet</h4>
            <p className="mb-0">
              You haven’t added any notes yet. Start by clicking{" "}
              <strong>“Add Note”</strong> above to create your first one!
            </p>
            <div className="container" style={{color: "blue", fontSize: "larger"}}>
              <br/>
             
            </div>
          </div>
        )}
        {/* Fetch notes from data base */}
        {Array.isArray(notes) && notes.map((note, index) => {
          return (
            <NoteItem
              key={note._id || index}
              note={note}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          );
        })}
      </div>
    </>
  );
}
