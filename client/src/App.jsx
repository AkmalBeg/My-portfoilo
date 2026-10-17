import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import { AdminProvider } from './AdminContext.jsx'
import Background from './Background.jsx'

const App = () => (
  <AdminProvider>
    <Background />

    <div className="relative z-10">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  </AdminProvider>
)

export default App