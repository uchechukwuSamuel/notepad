const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

let notes = []

app.get('/', (req, res) => {
  res.send('Notepad backend is running');
});

app.get('/notes', (req, res) => {
  res.json(notes);
});

// Corrected POST route for adding a note
app.post('/notes', (req, res) => {
  const { title, content } = req.body;  // Assuming your request body has title and content properties

  if (!content) {
    return res.status(400).json({ error: "Note can't be empty" });
  }

  const newNote = {
    id: Date.now(),
    title,
    content,
  };

  notes.push(newNote);
  res.status(201).json(newNote);
});

// DELETE route to remove a note by ID
app.delete('/notes/:id', (req, res) => {
  const { id } = req.params;

  // Filter out the note by id
  notes = notes.filter(note => note.id !== Number(id));  // Ensure you're comparing the correct types
  res.json({ message: "The note has been deleted!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
