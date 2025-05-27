import React from 'react';
import Note from './Note';

const NotesList = ({ notesList, deleteNote, editNote }) => {
  console.log(notesList)
  return (
    <>
      <ul className="note-list">
        {notesList.map((note) => (
          <li className="note-item">
            <Note
              key={note._id || note}
              note={note}
              deleteNote={deleteNote}
              editNote={editNote}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default NotesList;
