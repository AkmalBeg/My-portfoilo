import { createContext, useContext, useState, useCallback, useEffect } from 'react'

const AdminContext = createContext({ isAdmin: false, login: () => {}, logout: () => {} })

export function AdminProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'))

  const login = useCallback((t) => {
    localStorage.setItem('token', t)
    setToken(t)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('token')
    setToken(null)
  }, [])

  // api.js fires this when the server rejects the token (expired or invalid)
  useEffect(() => {
    window.addEventListener('auth:logout', logout)
    return () => window.removeEventListener('auth:logout', logout)
  }, [logout])

  return <AdminContext.Provider value={{ isAdmin: !!token, login, logout }}>{children}</AdminContext.Provider>
}

export const useAdmin = () => useContext(AdminContext)
