import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [focusedField, setFocusedField] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
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

  const inputStyle = (field) => ({
    width: '100%',
    background: '#131313',
    border: `1px solid ${focusedField === field ? 'rgba(201,167,242,0.45)' : 'rgba(42,40,37,0.9)'}`,
    color: '#F5F0E8',
    fontFamily: 'var(--font-body)',
    fontSize: '14px',
    borderRadius: '14px',
    padding: '14px 18px',
    boxShadow: focusedField === field ? '0 0 0 3px rgba(201,167,242,0.07)' : 'none',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    boxSizing: 'border-box',
  })

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0A0A0A',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >

      {/* Atmospheric gradient — same language as Hero */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'radial-gradient(ellipse 70% 55% at 85% -5%, rgba(124,58,237,0.22) 0%, transparent 55%),' +
            'radial-gradient(ellipse 55% 45% at 8% 108%, rgba(212,255,79,0.09) 0%, transparent 52%)',
        }}
      />

      {/* Container */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          maxWidth: '400px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >

        {/* ── Logo + title ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '52px',
          }}
        >
          <img
            src="/logo.svg"
            alt="Synco"
            style={{ width: 100, height: 100, marginBottom: '24px' }}
          />
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(30px, 4vw, 44px)',
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              color: '#F5F0E8',
              textAlign: 'center',
              margin: 0,
            }}
          >
            Bienvenido a {''}
            <span style={{ color: '#C9A7F2' }}>Synco</span>
          </h1>
          <p
            style={{
              marginTop: '14px',
              fontFamily: 'var(--font-body)',
              fontSize: '11px',
              letterSpacing: '0.22em',
              color: 'rgba(245, 240, 232, 0.32)',
              textTransform: 'uppercase',
              textAlign: 'center',
            }}
          >
            Inicia sesión para continuar
          </p>
        </motion.div>

        {/* ── Form ── */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
        >
          <input
            className="synco-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onFocus={() => setFocusedField('email')}
            onBlur={() => setFocusedField(null)}
            required
            style={inputStyle('email')}
          />
          <input
            className="synco-input"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onFocus={() => setFocusedField('password')}
            onBlur={() => setFocusedField(null)}
            required
            style={inputStyle('password')}
          />

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                color: 'rgba(248, 113, 113, 0.9)',
                textAlign: 'center',
                margin: '2px 0 0 0',
              }}
            >
              {error}
            </motion.p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            onMouseEnter={e => {
              if (!loading) {
                e.currentTarget.style.background = '#D4FF4F'
                e.currentTarget.style.boxShadow = '0 16px 52px -8px rgba(212,255,79,0.5), 0 4px 20px rgba(0,0,0,0.35)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = '#C9A7F2'
              e.currentTarget.style.boxShadow = '0 8px 36px -6px rgba(201,167,242,0.6), 0 2px 14px rgba(0,0,0,0.28)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
            style={{
              marginTop: '10px',
              width: '100%',
              padding: '15px 24px',
              borderRadius: '9999px',
              border: 'none',
              background: '#C9A7F2',
              color: '#0A0A0A',
              fontFamily: 'var(--font-body)',
              fontWeight: 700,
              fontSize: '15px',
              letterSpacing: '-0.01em',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease',
              boxShadow: '0 8px 36px -6px rgba(201,167,242,0.6), 0 2px 14px rgba(0,0,0,0.28)',
              opacity: loading ? 0.6 : 1,
            }}
          >
            {loading ? 'Entrando…' : 'Entrar'}
          </button>
        </motion.form>

        {/* ── Footer ── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.22 }}
          style={{
            marginTop: '36px',
            textAlign: 'center',
            fontFamily: 'var(--font-body)',
            fontSize: '13px',
            color: 'rgba(245, 240, 232, 0.28)',
          }}
        >
          ¿No tienes cuenta?{' '}
          <Link
            to="/register"
            onMouseEnter={e => { e.currentTarget.style.color = '#D4FF4F' }}
            onMouseLeave={e => { e.currentTarget.style.color = '#C9A7F2' }}
            style={{
              color: '#C9A7F2',
              textDecoration: 'none',
              fontWeight: 600,
              transition: 'color 0.2s ease',
            }}
          >
            Regístrate
          </Link>
        </motion.p>

      </div>
    </div>
  )
}
