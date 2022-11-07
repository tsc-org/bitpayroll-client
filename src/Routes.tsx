import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RequireAuth from './auth/RequireAuth'
import Dashboard from './pages/dashboard'
import Home from './pages/Home'
import NotFound from './pages/notFound'
import Wip from './pages/Wip'


const BaseRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="work-in-progress" element={<Wip />} />
        <Route element={<RequireAuth/>} >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
        </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default BaseRoutes