import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('synco_token'))
  const [user,  setUser]  = useState(() => {
    try { return JSON.parse(localStorage.getItem('synco_user')) } catch { return null }
  })

  const login = (newToken, newUser) => {
    localStorage.setItem('synco_token', newToken)
    localStorage.setItem('synco_user', JSON.stringify(newUser))
    setToken(newToken)
    setUser(newUser)
  }

  const logout = () => {
    localStorage.removeItem('synco_token')
    localStorage.removeItem('synco_user')
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
