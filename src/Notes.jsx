import { useEffect, useState } from 'react';
import { supabase } from './supabase';
import './Notes.css';
import Navbar from './Navbar';

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  const fetchNotes = async () => {
    const { data } = await supabase
      .from('notes')
      .select('*')
      .order('inserted_at', { ascending: false });
    setNotes(data);
  };

  const addNote = async () => {
    const user = (await supabase.auth.getUser()).data.user;

    const { error } = await supabase.from('notes').insert({
      title: 'New Note',
      content: newNote,
      user_id: user.id,
    });

    if (error) return console.error(error);

    setNewNote('');
    await fetchNotes();
  };

  useEffect(() => {
    fetchNotes();

    const subscription = supabase
      .channel('public:notes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'notes' }, fetchNotes)
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

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
            <button className="add-btn" onClick={addNote}>Add Note</button>
          </div>

          <div className="note-list">
            {notes.map((note) => (
              <div key={note.id} className="note-card">
                <p>{note.content}</p>
                <small>{new Date(note.inserted_at).toLocaleString()}</small>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
