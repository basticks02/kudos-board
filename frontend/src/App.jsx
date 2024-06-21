import React from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Dashboard from './Dashboard'
import CardPage from './CardPage'
import './App.css'

export default function App() {


  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Dashboard/>}/>
        <Route path="/boards/:boardId/cards" element={<CardPage/>}/>
      </Routes>
    </Router>
  )
}
