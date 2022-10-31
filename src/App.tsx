import {BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Wip from './pages/Wip'



function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<Home />} />
          <Route path="work-in-progress" element={<Wip />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
