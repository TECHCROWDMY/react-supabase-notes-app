import { supabase } from './supabase';
import './Navbar.css';

export default function Navbar() {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload(); // or use routing to redirect to login
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 className="logo">📝 NotesApp</h1>
      </div>
      <div className="navbar-right">
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}
