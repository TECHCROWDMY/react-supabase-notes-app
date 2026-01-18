// Notes.jsx

import { useEffect, useState } from 'react';
import { Edit2, Trash2, Save, X, Plus } from 'lucide-react';
import Navbar from './Navbar';
import './Notes.css';

// ⭐ Load Supabase here

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingContent, setEditingContent] = useState('');
  const [toast, setToast] = useState(null);

  // ⭐ Fetch Notes
  const fetchNotes = async () => {};

  // ⭐ Create Note
  const addNote = async () => {};

  // ⭐ Update Note
  const updateNote = async (id) => {};

  // ⭐ Delete Note
  const deleteNote = async (id) => {};

  useEffect(() => {
    fetchNotes();
  }, []);

  const showError = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <>
      <Navbar />
      <div className="notes-bg">
        <div className="notes-container">
          <h2>Your Notes</h2>

          <textarea
            className="note-input"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Type your note..."
          />

          <div className="add-btn-wrapper">
            <button className="add-btn" onClick={addNote}>
              <Plus size={18} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
              Add Note
            </button>
          </div>

          <div className="note-list">
            {notes.map((note) => (
              <div key={note.id} className="note-card">
                {editingId === note.id ? (
                  <div className="edit-mode">
                    <textarea
                      className="note-input"
                      value={editingContent}
                      onChange={(e) => setEditingContent(e.target.value)}
                      style={{ marginBottom: '12px' }}
                    />
                    <div className="edit-actions">
                      <button className="save-btn" onClick={() => updateNote(note.id)}>
                        <Save size={16} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                        Save
                      </button>
                      <button
                        className="cancel-btn"
                        onClick={() => setEditingId(null)}
                      >
                        <X size={16} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="note-content">
                    <div className="note-text">
                      <p>{note.content}</p>
                      <small>{new Date(note.created_at).toLocaleString()}</small>
                    </div>

                    <div className="note-actions">
                      <button
                        className="icon-btn edit-icon-btn"
                        onClick={() => {
                          setEditingId(note.id);
                          setEditingContent(note.content);
                        }}
                        title="Edit note"
                      >
                        <Edit2 size={16} />
                      </button>

                      <button
                        className="icon-btn delete-icon-btn"
                        onClick={() => deleteNote(note.id)}
                        title="Delete note"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {toast && <div className="toast">{toast}</div>}
    </>
  );
}
