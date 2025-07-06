import { supabase } from './supabase';
import './Auth.css';

export default function Auth() {
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: import.meta.env.PROD
          ? 'https://react-supabase-notes-app.netlify.app'
          : 'http://localhost:5173/', // ✅ Make sure this is 5173
      },
    });


    if (error) alert(error.message);
  };

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
