const mongoose = require('mongoose');
const {Schema} = mongoose;

// This schema will define the structure of the notes in the database
const NotesSchema = new mongoose.Schema({
   user:{
type: mongoose.Schema.Types.ObjectId,
    ref: 'user',  // Reference to the User model
   },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  tag: {
    type: String,
    default: "General"   // default tag if none provided
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('notes', NotesSchema);
