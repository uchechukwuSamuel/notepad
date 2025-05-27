import React, { useState } from 'react';

const NoteForm = ({ addNote }) => { // Use addNote instead of handleAddNote
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [folder, setFolder] = useState("General")

  const handleSubmit = (e) => {
    e.preventDefault();  // Prevent the form from refreshing the page on submit
    if (!title || !content) return; // Don't add empty notes
    addNote({ title, content, folder });  // Corrected: use addNote passed from App.js
    setTitle(''); // Clear the form
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} id='noteForm'>
      <div className="mb-3">
        <label className="form-label" htmlFor='noteTitle'>Title</label>
        <input
          type="text"
          className="form-control"
          value={title}
          id='noteTitle'
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor='note'>Content</label>
        <textarea
          className="notepad-area"
          value={content}
          rows={3}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Start typing..."
          id='note'
        />
        <select
          value={folder}
          onChange={(e) => setFolder(e.target.value)}
          id='folder'
        >
          <option value="General">General</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Study">Study</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary">
        Add Note
      </button>
    </form>
  );
};

export default NoteForm;
