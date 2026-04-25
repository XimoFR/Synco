export default function Footer() {
  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <footer
      style={{
        position:   'relative',
        overflow:   'hidden',
        background: '#0A0A0A',
        borderTop:  '1px solid rgba(201,167,242,0.1)',
      }}
    >
      {/* Atmospheric glow */}
      <div
        style={{
          position:      'absolute',
          inset:         0,
          pointerEvents: 'none',
          background:
            'radial-gradient(ellipse 65% 80% at 15% 50%, rgba(124,58,237,0.09) 0%, transparent 55%),' +
            'radial-gradient(ellipse 40% 50% at 95% 100%, rgba(212,255,79,0.06) 0%, transparent 50%)',
        }}
      />
      {/* Main footer body */}
      <div
        style={{
          maxWidth:     '1400px',
          margin:       '0 auto',
          paddingLeft:  'clamp(24px, 5vw, 80px)',
          paddingRight: 'clamp(24px, 5vw, 80px)',
          paddingTop:   '72px',
          paddingBottom:'64px',
          display:      'flex',
          alignItems:   'flex-start',
          justifyContent:'space-between',
          gap:          '48px',
          flexWrap:     'wrap',
        }}
      >

        {/* Left — brand */}
        <div style={{ maxWidth: '320px' }}>
          <div
            style={{
              display:    'flex',
              alignItems: 'center',
              gap:        '10px',
              marginBottom:'20px',
            }}
          >
            <img src="/logo.svg" alt="Synco" style={{ width: 32, height: 32 }} />
            <span
              style={{
                fontFamily:    'var(--font-display)',
                fontWeight:    800,
                fontSize:      '22px',
                letterSpacing: '-0.02em',
                color:         '#C9A7F2',
              }}
            >
              Synco
            </span>
          </div>
          <p
            style={{
              fontFamily:    'var(--font-body)',
              fontSize:      '14px',
              color:         'rgba(245, 240, 232, 0.35)',
              lineHeight:    1.75,
              margin:        0,
            }}
          >
            La plataforma del underground español. Encuentra tu gente, vive el concierto.
          </p>

          {/* Pill badge */}
          <div
            style={{
              display:       'inline-flex',
              alignItems:    'center',
              gap:           '8px',
              marginTop:     '24px',
              padding:       '7px 14px',
              borderRadius:  '9999px',
              border:        '1px solid rgba(212,255,79,0.2)',
              background:    'rgba(212,255,79,0.04)',
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#D4FF4F', boxShadow: '0 0 7px #D4FF4F', flexShrink: 0 }} />
            <span
              style={{
                fontFamily:    'var(--font-body)',
                fontSize:      '11px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color:         'rgba(212,255,79,0.7)',
              }}
            >
              Underground Español
            </span>
          </div>
        </div>

        {/* Right — nav links */}
        <div
          style={{
            display:  'flex',
            gap:      '16px',
            flexWrap: 'wrap',
            alignItems:'flex-start',
            paddingTop:'6px',
          }}
        >
          {[
            ['como-funciona', 'Función'],
            ['conciertos',    'Conciertos'],
            ['comunidad',     'Comunidad'],
          ].map(([id, label]) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              onMouseEnter={e => { e.currentTarget.style.color = '#F5F0E8' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(245,240,232,0.38)' }}
              style={{
                background:    'none',
                border:        'none',
                fontFamily:    'var(--font-body)',
                fontSize:      '14px',
                color:         'rgba(245,240,232,0.38)',
                cursor:        'pointer',
                padding:       '4px 0',
                transition:    'color 0.2s ease',
              }}
            >
              {label}
            </button>
          ))}
        </div>

      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop:    '1px solid rgba(201,167,242,0.07)',
          paddingTop:   '20px',
          paddingBottom:'24px',
          paddingLeft:  'clamp(24px, 5vw, 80px)',
          paddingRight: 'clamp(24px, 5vw, 80px)',
          maxWidth:     '1400px',
          margin:       '0 auto',
          display:      'flex',
          alignItems:   'center',
          justifyContent:'space-between',
          gap:          '16px',
          flexWrap:     'wrap',
        }}
      >
        <p
          style={{
            fontFamily:    'var(--font-body)',
            fontSize:      '12px',
            color:         'rgba(245,240,232,0.2)',
            margin:        0,
            letterSpacing: '0.04em',
          }}
        >
          © 2025 Synco · Hecho con ruido en España
        </p>
        <p
          style={{
            fontFamily:    'var(--font-body)',
            fontSize:      '12px',
            color:         'rgba(245,240,232,0.14)',
            margin:        0,
            letterSpacing: '0.04em',
          }}
        >
          Todos los derechos reservados
        </p>
      </div>
    </footer>
  )
}
