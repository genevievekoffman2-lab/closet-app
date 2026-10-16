import { useState, useEffect } from 'react'
import './App.css'
import Home from './pages/Home'
import Closet from './pages/Closet'
import OutfitResult from './pages/OutfitResult'
import type { ClosetItem } from './types/ClosetItem.ts'
import { fetchCloset } from './lib/supabase'

type Page = "home" | "closet" | "result"

function App() {
  const [page, setPage] = useState<Page>("home")
  const [outfit, setOutfit] = useState<ClosetItem[] | null>(null);
  const [closet, setCloset] = useState<ClosetItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCloset()
      .then(setCloset)
      .catch((err) => setError(err.message ?? String(err)));
  }, []);

  if (error) return <p>Couldn't load closet: {error}</p>
  if (!closet) return <p>Loading closet…</p>

  if (page == "closet")
    return <Closet closet={closet} setPage={setPage} />
  if (page == "result" && outfit)
    return <OutfitResult closet={closet} outfit={outfit} setOutfit={setOutfit} setPage={setPage}/>
  return <Home closet={closet} setPage={setPage} setOutfit={setOutfit} />

}

export default App
