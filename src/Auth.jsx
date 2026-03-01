// Auth.jsx

import './Auth.css';

// ⭐ 1. Load Supabase here

export default function Auth() {
  
  // ⭐ 3. Login with Google
  const handleGoogleLogin = async () => {};

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className='auth-header'>
          <h2 className="auth-title">Welcome to NotesApp</h2>
          <p className="auth-subtitle">Sign in to get started</p>
        </div>


        <button className="google-btn" onClick={handleGoogleLogin}>
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google icon"
            className="google-icon"
          />
          Login with Google
        </button>
      </div>
    </div>
  );
}
