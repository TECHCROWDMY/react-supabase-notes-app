import { useEffect, useState } from 'react';
import { supabase } from './supabase';
import Auth from './Auth';
import Notes from './Notes';

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return session ? <Notes /> : <Auth />;
}

export default App;
