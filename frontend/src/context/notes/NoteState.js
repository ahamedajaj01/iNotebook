import {useState} from 'react';
import NoteContext from "./noteContext";


const NoteState = (props)=>{
   const host = process.env.REACT_APP_API_URL;
 
const [notes , setNotes]= useState([])

// Step 1: ADD a note
const addNote = async (title,description,tag)=>{
  // Api call to add notes in database
const response = await fetch(`${host}/api/notes/addnotes`,{
  method: "POST",
  headers :{
'Content-Type': 'application/json',
'auth-token': localStorage.getItem('token')
  },
  body: JSON.stringify({title,description,tag}),
});

// create new note
const newNote = await response.json();
// update state: create a new array with the new note added
setNotes([...notes, newNote]);
  
}

//Step 1: fetch all notess from data base 
const getNotes = async()=>{
  // Api call to fetch notes
try {
  const response = await fetch(`${host}/api/notes/fetchallnotes`, {
  method: "GET",
  headers: {
    'Content-Type': 'application/json',
    'auth-token': localStorage.getItem('token')
  },
  });
  const json = await response.json()
  setNotes(json)
} catch (error) {
      console.error("Error fetching notes:", error);

}
}

// Step 3: Delete a note
const deleteNote = async (id)=>{
  // API CALL to delete notes from database
   await fetch(`${host}/api/notes/deletenotes/${id}`,{
    method: "DELETE",
    headers:{
      'Content-Type': 'application/json',
      'auth-token': localStorage.getItem('token')
    },
  });
// Delete note when user click delete button
const delNote = notes.filter((note)=>{return note._id !== id})
setNotes(delNote)
}

// Step 4: Edit a note
const editNote = async (id, title, description, tag)=>{
  // Api call to edit note and update in database
 await fetch(`${host}/api/notes/updatenotes/${id}`,{
  method: "PUT",
  headers:{
    'Content-Type': 'application/json',
          "auth-token": localStorage.getItem("token"),
  },
  body: JSON.stringify({title, description, tag}),
})
  
  //  Replace the old note in the notes array
  const updatedNotes = notes.map((note) =>{
    return note._id === id ? {...note,title,description,tag, date: new Date().toLocaleDateString()}
: note
  })
  // Set new Notes
  setNotes(updatedNotes)
}

return(
    <NoteContext.Provider value={{notes, addNote,deleteNote,editNote, getNotes}}>
      {props.children}
    </NoteContext.Provider>
)
};

export default NoteState;