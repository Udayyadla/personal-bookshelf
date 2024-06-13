import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import BookSearchPage from './pages/BookSearchPage'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import MyBookShelf from './pages/MyBookShelf'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<BookSearchPage/>}/>
      <Route path="/myshelf" element={<MyBookShelf/>}/>
    </Routes>
    </BrowserRouter>
  
     
    </>
  )
}

export default App
