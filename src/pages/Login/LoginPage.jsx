import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate  = useNavigate()

  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res  = await fetch('/api/auth/login', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Credenciales incorrectas')
      login(data.token, data.user)
      navigate('/')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-obsidian flex flex-col items-center justify-center px-4">

      <div className="w-full max-w-sm flex flex-col gap-8">

        {/* Logo */}
        <div className="flex flex-col items-center gap-3">
          <img src="/logo.svg" alt="Synco" className="w-16" />
          <h1 className="font-display text-3xl text-cream">
            Bienvenido de nuevo
          </h1>
          <p className="text-xs font-body text-cream/40 tracking-widest uppercase">
            Inicia sesión para continuar
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="w-full bg-surface border border-muted text-cream placeholder:text-cream/30 font-body text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-lavender/50 transition-colors duration-200"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="w-full bg-surface border border-muted text-cream placeholder:text-cream/30 font-body text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-lavender/50 transition-colors duration-200"
          />

          {error && (
            <p className="text-xs font-body text-red-400 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-lavender text-obsidian font-body font-semibold text-sm tracking-wide rounded-full py-3 mt-1 hover:bg-lavender/90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Entrando…' : 'Entrar'}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-xs font-body text-cream/30">
          ¿No tienes cuenta?{' '}
          <Link to="/register" className="text-lavender hover:text-lavender/80 transition-colors">
            Regístrate
          </Link>
        </p>

      </div>
    </div>
  )
}
