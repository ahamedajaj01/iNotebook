const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes");
const fetchUser = require("../middleware/fetchuser")
const { body, validationResult } = require("express-validator");



// ROUTE 1: Fetch notes from data base using: Get "./api/notes/fetchallnotes"  LoggedIn Required
router.get("/fetchallnotes",fetchUser, async (req,res)=>{
    try {
         const notes = await Notes.find({ user: req.user.id }); // Assuming you store user.id in req.user from fetchUser middleware
    res.json(notes);
    } catch (error) {
          console.error("Error creating user:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }

})

// ROUTE 2: Add a new note  using: Post "./api/notes/addnotes"  LoggedIn Required
router.post("/addnotes",fetchUser,[
    // Validation for the request body
body("title", "Enter a valid title").isLength({ min: 3 }),
body("description", "Description must be at least 5 characters").isLength({ min: 5 }),


], async (req,res)=>{
  // ❌ If validation fails
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
            // Create new notes
      const { title, description, tag } = req.body;
    //   save notes
    const note = new Notes ({title, description, tag, user: req.user.id})
    const  saveNote = await note.save();
    res.json(saveNote)
    } catch (error) {
         console.error("Error creating user:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
 
})

// ROUTE 3: Update an existing  notes in data base using: Put "./api/notes/updatenotes"  LoggedIn Required
router.put("/updatenotes/:id",fetchUser,[
  // Validation for the request body
body("title", "Enter a valid title").isLength({ min: 3 }),
body("description", "Description must be at least 5 characters").isLength({ min: 5 }),
// body("tag", "Tag must be at least 3 characters").isLength({ min: 3 })
], async (req, res)=>{
    const {title, description, tag} = req.body;
//    create new notes
const newNotes = {};
if(title){newNotes.title = title};
if(description){newNotes.description = description};
if(tag){newNotes.tag = tag};

// Find the note to update and update the note
let note = await Notes.findById(req.params.id)
if(!note){
    return res.status(404).send("Not Found")
}
if(note.user.toString() !== req.user.id){
    return res.status(401).send("not Allowed")
}
note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNotes}, {new:true})
res.status(200).json({note})
})

// ROUTE 4: Delete an existing  notes in data base using: Delete "./api/notes/deletenotes"  LoggedIn Required
router.delete("/deletenotes/:id",fetchUser,async (req,res)=>{
        // Find the notes from database to delete and delete the notes
try {
           //Find the note by id
        let note = await Notes.findById(req.params.id);
if(!note){
    return res.status(404).send("Not Found")
}

    // 2. Check if user owns the note
if(note.user.toString() !== req.user.id){
    return res.status(401).send("not Allowed")
}
// Delete the note
note = await Notes.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: "✅ Note deleted successfully", note });
    
} catch (error) {
    console.error("Error deleting note:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
}
})




module.exports = router;