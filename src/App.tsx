import { useState, useEffect } from 'react'
import './App.css'
import Home from './pages/Home'
import Closet from './pages/Closet'
import OutfitResult from './pages/OutfitResult'
import Login from './pages/Login'
import type { ClosetItem } from './types/ClosetItem.ts'
import type { Session } from '@supabase/supabase-js'
import { fetchCloset, supabase } from './lib/supabase'

type Page = "home" | "closet" | "result" | "login"

function App() {
  const [page, setPage] = useState<Page>("home")
  const [outfit, setOutfit] = useState<ClosetItem[] | null>(null);
  const [closet, setCloset] = useState<ClosetItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    fetchCloset()
      .then(setCloset)
      .catch((err) => setError(err.message ?? String(err)));
  }, []);

  // restore the saved session, then keep it in sync on sign in / sign out
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((_event, session) => setSession(session));
    return () => data.subscription.unsubscribe();
  }, []);

  if (page == "login")
    return <Login setPage={setPage} />

  const authBar = (
    <div className="auth_bar">
      {session
        ? <>{session.user.email} <button onClick={() => supabase.auth.signOut()}>Sign out</button></>
        : <button onClick={() => setPage("login")}>Log in</button>}
    </div>
  )

  if (error) return <p>Couldn't load closet: {error}</p>
  if (!closet) return <p>Loading closet…</p>

  return (
    <>
      {authBar}
      {page == "closet" ? <Closet closet={closet} setPage={setPage} />
        : page == "result" && outfit ? <OutfitResult closet={closet} outfit={outfit} setOutfit={setOutfit} setPage={setPage}/>
        : <Home closet={closet} setPage={setPage} setOutfit={setOutfit} />}
    </>
  )
}

export default App
