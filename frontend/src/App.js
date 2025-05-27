import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Header from './components/Header';
import NoteForm from './components/Noteform';
import NotesList from './components/Noteslist';
import Sidebar from './components/Sidebar'
import RecentlyDeletedModal from './components/RecentlyDeletedModal'

function App() {
  const [notesList, setNotesList] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [showDeletedModal, setShowDeletedModal] = useState(false)

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("http://localhost:5000/notes")
        setNotesList(res.data)
      }
      catch (error) {
        console.error("Error while fetching notes", error)
      }
    }
    fetchNotes()

  }, [])

  const addNote = async (newNote) => {
    try {
      const res = await axios.post("http://localhost:5000/notes", newNote)
      setNotesList([...notesList, res.data]);
      console.log("Note has been created!", res.data)
    }
    catch (error) {
      console.error("An error occured while creating the note", error)
    }

  }

  const editNote = async (id, updatedContent, updatedFolder) => {
    try {
      const updatedNote = { content: updatedContent, folder: updatedFolder };
      const res = await axios.put(`http://localhost:5000/notes/${id}`, { content: updatedContent })

      setNotesList((previousNoteList) =>
        previousNoteList.map((note) =>
          note._id === id ? { ...note, content: updatedContent, folder: updatedFolder } : note
        )
      )
      console.log("Note has been updated!", res.data)
    }
    catch (error) {
      console.error("Error updating note", error)
    }
  }

  const deleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/notes/${id}`)

      setNotesList((oldNotesList) => oldNotesList.filter((note) => note._id !== id))
    }
    catch (error) {
      console.error("Error deleting the note!", error)
    }
  }

  const filteredNotes = notesList.filter(note => {
    note.content.toUpperCase().includes(searchQuery.toLocaleLowerCase())
  })
  const pinnedNotes = notesList.filter(note => note.pinned)
  const otherNotes = notesList.filter(note => !note.pinned)


  return (
    <>
      <div className="app">
        {sidebarOpen && (
          <Sidebar
            setShowDeletedModal={setShowDeletedModal}
            setSidebarOpen={setSidebarOpen}
          />
        )}

        <NoteForm addNote={addNote} />

        {pinnedNotes.length > 0 && (
          <>
            <h2>pinned Notes</h2>
            <NotesList
              notesList={pinnedNotes}
              deleteNote={deleteNote}
              editNote={editNote}
            />
          </>
        )}

        <NotesList
          notesList={otherNotes}
          deleteNote={deleteNote}
          editNote={editNote}
        />

        {showDeletedModal && (
          <RecentlyDeletedModal
            onClose={() => setShowDeletedModal(false)}
          />
        )}


      </div>
    </>
  );
}

export default App;
