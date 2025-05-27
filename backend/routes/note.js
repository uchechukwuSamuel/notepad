import express from 'express'
import Note from '../models/Note.js'

const router = express.Router();
const Note = require('../models/Note');

// GET all notes
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 })
    res.json(notes)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching notes' })
  }
})

// POST a new note (with optional folder)
router.post('/', async (req, res) => {
  try {
    const newNote = new Note({
      text: req.body.text,
      folder: req.body.folder || "General"
    })
    const savedNote = await newNote.save()
    res.status(201).json(savedNote)
  } catch (error) {
    res.status(400).json({ error: 'Error while saving note' })
  }
})

// PUT - Edit a Note
router.put('/notes/:id', async (req, res) => {
  try {
    const { title, content, folder } = req.body;
    const note = await Note.findByIdAndUpdate(
      req.params.id,   // Find the note by its ID
      { title, content, folder },   // Update title, content, and folder
      { new: true }   // Return the updated note
    );
    if (!note) {
      return res.status(404).json({ msg: 'Note not found!' });
    }
    res.json(note);   // Send back the updated note
  } catch (error) {
    console.error('Error updating note:', error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// DELETE a note
router.delete('/:id', async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id)
    res.json({ message: "Note deleted" })
  } catch (error) {
    res.status(500).json({ error: 'Error deleting note' })
  }
})

export default router
