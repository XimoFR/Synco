import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import IntroPage    from './pages/Intro/IntroPage'
import HomePage     from './pages/Home/HomePage'
import LoginPage    from './pages/Login/LoginPage'
import RegisterPage from './pages/Register/RegisterPage'

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

function AppContent() {
  const { isAuthenticated } = useAuth()
  const [introComplete, setIntroComplete] = useState(false)

  if (!introComplete) {
    return <IntroPage onComplete={() => setIntroComplete(true)} />
  }

  return (
    <Routes>
      <Route path="/login"    element={isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />} />
      <Route path="/register" element={isAuthenticated ? <Navigate to="/" replace /> : <RegisterPage />} />
      <Route path="/"         element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
      <Route path="*"         element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  )
}
