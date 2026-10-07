import { useState } from 'react'  
import './App.css'
import Home from './pages/Home'
import Closet from './pages/Closet'
import OutfitResult from './pages/OutfitResult'
import type { ClosetItem } from './types/ClosetItem'

type Page = "home" | "closet" | "result"

function App() { 
  const [page, setPage] = useState<Page>("home") 
  const [outfit, setOutfit] = useState<ClosetItem[] | null>(null);


  if (page == "closet") 
    return <Closet setPage={setPage} />
  if (page == "result" && outfit) 
    return <OutfitResult outfit={outfit} setPage={setPage}/>
  return <Home setPage={setPage} setOutfit={setOutfit} />
  
}

export default App
