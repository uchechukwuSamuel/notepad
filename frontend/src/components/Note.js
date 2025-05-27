import React, { useState, useEffect } from "react";

const Note = ({ note, deleteNote, editNote }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedContent, setUpdatedContent] = useState(note.content);
  const [updatedFolder, setUpdatedFolder] = useState(note.folder);

  useEffect(() => {
    setUpdatedContent(note.content);
    setUpdatedFolder(note.folder);
  }, [note.content, note.folder]);

  //  Editing mode
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Save the changes and exit editing mode
  const handleSaveClick = () => {
    editNote(note._id, updatedContent, updatedFolder);
    setIsEditing(false);
  };

  // Cancel editing and reset the textarea
  const handleCancelClick = () => {
    setIsEditing(false);
    setUpdatedContent(note.content);
    setUpdatedFolder(note.folder);
  };

  return (
    <li className="list-group-item">
      <div className="d-flex justify-content-between align-items-start">
        {/* Conditional rendering based on edit mode */}
        {isEditing ? (
          // Editable mode UI
          <div className="flex-grow-1 w-100">
            <textarea
              value={updatedContent}
              onChange={(e) => setUpdatedContent(e.target.value)}
              className="form-control mb-2"
              rows={3}
            />
            <select
              value={updatedFolder}
              onChange={(e) => setUpdatedFolder(e.target.value)} // Folder dropdown
              className="form-select mb-2"
            >
              <option value="General">General</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Study">Study</option>
              <option value="Shopping">Shopping</option>
            </select>
            <button onClick={handleSaveClick} className="btn btn-success btn-sm me-2" title="Save">
              <i className="bi bi-journal-check"></i>
            </button>
            <button onClick={handleCancelClick} className="btn btn-secondary btn-sm" title="Cancel">
              <i className="bi bi-x-square"></i>
            </button>
          </div>
        ) : (
          // Normal display mode UI
          <div className="flex-grow-1 w-100">
            <h5>{note.title}</h5>
            <p>{note.content}</p>
            {/* Display the folder of the note */}
            <small className="text-muted">Folder: {note.folder}</small>
            <button
              onClick={handleEditClick}
              className="btn btn-warning btn-sm me-2"
              title="Edit"
            >
              <i className="bi bi-pencil-square"></i>
            </button>
            <button
              onClick={() => deleteNote(note._id)}
              className="btn btn-danger btn-sm"
              title="Delete"
            >
              <i className="bi bi-trash"></i>
            </button>
          </div>
        )}
      </div>
    </li>
  );
};

export default Note;
