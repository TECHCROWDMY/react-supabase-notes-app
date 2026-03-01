# ⚡ React + Vite + Supabase Starter Template

<small>A starter template built with **React** and **Vite**, designed to help you **get started quickly with Supabase**.
This template includes **authentication** and a **simple CRUD notes system**, so you can focus on building features instead of wiring up the basics.</small>

---

## 🧑‍💻 Getting Started
```bash
npm install
```
---
## 🏃 Run the App
```bash
npm run dev
```

<small>Open [http://localhost:5173](http://localhost:5173) in your browser.</small>

---

## 🎯 Purpose
This project is meant to serve as a **starting point** for applications that need:
- A fast React setup using Vite
- Supabase authentication (sign up, sign in, sign out)
- A real-world CRUD example using Supabase
- A clean and minimal structure that's easy to extend
---
## ✨ Features
- 🔐 **Authentication**
  - Login with google 
  - Logout
  - Auth session handling
- 📝 **Notes CRUD**
  - Create notes
  - Read notes
  - Update notes
  - Delete notes
---
## 📦 Code Segments to Include

### Create ENV file
```javascript
// ⭐ Create .env file in the root folder
VITE_SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL_HERE
VITE_SUPABASE_KEY=YOUR_SUPABASE_PUBLISHABLE_KEY_HERE
VITE_REDIRECT_URL=YOUR_FRONTEND_PROJECT_URL_HERE

```

### 1. Load Supabase
```javascript
// ⭐ 1. Load Supabase here
import { supabase } from './supabase';
```

### 2. Load Supabase Auth Session
```javascript
// ⭐ 2. Load Supabase Auth Session here
useEffect(() => {
  supabase.auth.getSession().then(({ data: { session } }) => {
    setSession(session);
  });

  supabase.auth.onAuthStateChange((_event, session) => {
    setSession(session);
  });
}, []);
```

### 3. Login with Google
```javascript
// ⭐ 3. Login with Google
const handleGoogleLogin = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: import.meta.env.VITE_REDIRECT_URL
    },
  });
  
  if (error) alert(error.message);
};
```

### 4. Logout
```javascript
// ⭐ 4. Logout
const handleLogout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Logout error:', error.message);
  }
};
```

### 5. Fetch Notes
```javascript
// ⭐ 5. Fetch Notes
const fetchNotes = async () => {
  const { data, error } = await supabase
    .from('Notes')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error(error.message);
    showError(error.message);
    return;
  }

  setNotes(data || []);
};

```

### 6. Create Note
```javascript
// ⭐ 6. Create Note
const addNote = async () => {
  if (!newNote.trim()) return;

  // Fetch User
  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (userError || !user) {
    showError('You must be logged in to add notes');
    return;
  }

  const { data, error } = await supabase
    .from('Notes')
    .insert([
      {
        content: newNote.trim(),
        user_id: user.id
      }
    ])
    .select()
    .single();

  if (error) {
    console.error('Insert error:', error.message);
    showError(error.message);
    return;
  }

  setNewNote('');
  setNotes((prev) => [data, ...prev]);
};
```

### 7. Update Note
```javascript
// ⭐ 7. Update Note
const updateNote = async (id) => {
   if (!editingContent.trim()) return;

  const { error } = await supabase
    .from('Notes')
    .update({ content: editingContent })
    .eq('id', id);

  if (error) {
    console.error(error.message);
    showError(error.message);
    return;
  }

  setEditingId(null);
  setEditingContent('');
  fetchNotes();
};
```

### 8. Delete Note
```javascript
// ⭐ 8. Delete Note
const deleteNote = async (id) => {
  
  const { error, data } = await supabase
    .from('Notes')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(error.message);
    showError(error.message);
    return;
  }
  fetchNotes();
  
};
```


---
**Built with ❤️ using React, Vite, and Supabase**