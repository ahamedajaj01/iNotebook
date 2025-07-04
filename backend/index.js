require('dotenv').config({ path: __dirname + '/.env' });
const connectToMongo = require("./db")
const express = require('express');
const app = express();
const PORT = 5000;

const cors = require('cors');      
app.use(cors());  // Allow all origins (for dev only)

// Connect to MongoDB
connectToMongo()

app.use(express.json())

//  Aavaialble Routes
app.use('/api/auth', require ('./routes/auth'))
app.use('/api/notes', require ('./routes/notes'))

app.listen(PORT,'0.0.0.0', () => {
    console.log(`✅ iNotebook backend listening at http://0.0.0.0:${PORT}`);
});
