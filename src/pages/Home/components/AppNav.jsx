import { useEffect, useState } from 'react'
import { LogOut } from 'lucide-react'
import { useAuth } from '../../../context/AuthContext'

const LINKS = [
  ['como-funciona', 'Función'],
  ['conciertos',    'Conciertos'],
  ['comunidad',     'Comunidad'],
]

export default function AppNav() {
  const { user, logout } = useAuth()
  const [active, setActive] = useState('')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
      const y = window.scrollY + 140
      for (const [id] of [...LINKS].reverse()) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= y) { setActive(id); break }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <nav
      style={{
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 50,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        padding: '6px 8px',
        borderRadius: '9999px',
        background: 'rgba(37, 37, 37, 0.9)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid rgba(201,167,242,0.15)',
        boxShadow: scrolled ? '0 8px 40px -8px rgba(201,167,242,0.18), 0 2px 12px rgba(0,0,0,0.4)' : '0 2px 12px rgba(0,0,0,0.3)',
        transition: 'box-shadow 0.4s ease',
        whiteSpace: 'nowrap',
      }}
    >

      {/* ── Logo ── */}
      <a
        href="#"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 14px',
          borderRadius: '9999px',
          textDecoration: 'none',
          transition: 'background 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(114, 94, 138, 0.92)'}
        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
      >
        <img src="/logo.svg" alt="Synco" style={{ width: 22, height: 22, flexShrink: 0 }} />
        <span style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: '16px',
          color: '#b89fd5',
          letterSpacing: '-0.02em',
        }}>
          Synco
        </span>
      </a>

      {/* ── Divider ── */}
      <div style={{ width: 1, height: 20, background: 'rgba(201,167,242,0.84)', margin: '0 6px', flexShrink: 0 }} />

      {/* ── Nav links ── */}
      {LINKS.map(([id, label]) => (
        <button
          key={id}
          onClick={() => scrollTo(id)}
          style={{
            padding: '8px 16px',
            borderRadius: '9999px',
            fontSize: '13px',
            fontFamily: 'var(--font-body)',
            fontWeight: 500,
            color: active === id ? '#D4FF4F' : 'rgb(255, 255, 255)',
            background: active === id ? 'rgba(114, 94, 138, 0.92)' : 'transparent',
            border: 'none',
            cursor: 'pointer',
            transition: 'background 0.2s, color 0.2s',
          }}
          onMouseEnter={e => {
            if (active !== id) {
              e.currentTarget.style.background = 'rgba(114, 94, 138, 0.92)'
              e.currentTarget.style.color = 'rgb(255, 255, 255)'
            }
          }}
          onMouseLeave={e => {
            if (active !== id) {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = 'rgb(255, 255, 255)'
            }
          }}
        >
          {label}
        </button>
      ))}

      {/* ── Divider ── */}
      <div style={{ width: 1, height: 20, background: 'rgba(201,167,242,0.84)', margin: '0 6px', flexShrink: 0 }} />

      {/* ── User area ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', paddingRight: '4px' }}>

        {/* Avatar */}
        <div style={{
          width: 30,
          height: 30,
          borderRadius: '50%',
          background: 'rgba(201,167,242,0.1)',
          border: '1px solid rgba(114, 94, 138, 0.92)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: '12px',
          color: '#C9A7F2',
          flexShrink: 0,
        }}>
          {user?.name?.[0]?.toUpperCase() ?? '?'}
        </div>

        {/* Name */}
        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize: '13px',
          color: 'rgb(255, 255, 255)',
          padding: '0 4px',
        }}>
          {user?.name}
        </span>

        {/* Logout */}
        <button
          onClick={logout}
          title="Cerrar sesión"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 32,
            height: 32,
            borderRadius: '50%',
            border: 'none',
            background: 'transparent',
            color: '#b89fd5',
            cursor: 'pointer',
            transition: 'background 0.2s, color 0.2s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(114, 94, 138, 0.92)'
            e.currentTarget.style.color = '#b89fd5'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.color = '#b89fd5'
          }}
        >
          <LogOut size={14} />
        </button>

      </div>
    </nav>
  )
}
