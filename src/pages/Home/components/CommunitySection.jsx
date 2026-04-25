import { motion } from 'framer-motion'

const CITIES = [
  { city: 'Madrid',    region: 'Comunidad de Madrid',  concerts: 24, syncers: '1.2K' },
  { city: 'Barcelona', region: 'Cataluña',             concerts: 31, syncers: '1.8K' },
  { city: 'Bilbao',    region: 'País Vasco',           concerts: 12, syncers: '620'  },
  { city: 'Valencia',  region: 'Com. Valenciana',      concerts: 18, syncers: '890'  },
  { city: 'Sevilla',   region: 'Andalucía',            concerts: 9,  syncers: '430'  },
  { city: 'Murcia',    region: 'Murcia',               concerts: 7,  syncers: '290'  },
]

export default function CommunitySection() {
  return (
    <section
      id="comunidad"
      style={{
        position:      'relative',
        overflow:      'hidden',
        paddingTop:    'clamp(96px, 11vh, 128px)',
        paddingBottom: 'clamp(96px, 11vh, 128px)',
      }}
    >

      {/* Ghost background text */}
      <div
        style={{
          position:         'absolute',
          top:              '50%',
          left:             '-20px',
          transform:        'translateY(-50%)',
          fontFamily:       'var(--font-display)',
          fontWeight:       800,
          fontSize:         'clamp(140px, 18vw, 280px)',
          letterSpacing:    '-0.05em',
          lineHeight:       1,
          color:            'transparent',
          WebkitTextStroke: '1px rgba(212,255,79,0.045)',
          userSelect:       'none',
          pointerEvents:    'none',
        }}
      >
        ES
      </div>

      <div
        style={{
          position:     'relative',
          zIndex:       10,
          maxWidth:     '1400px',
          margin:       '0 auto',
          paddingLeft:  'clamp(24px, 5vw, 80px)',
          paddingRight: 'clamp(24px, 5vw, 80px)',
        }}
      >

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: '64px' }}
        >
          <p
            style={{
              fontFamily:    'var(--font-body)',
              fontSize:      '11px',
              letterSpacing: '0.26em',
              color:         'rgba(212,255,79,0.65)',
              textTransform: 'uppercase',
              margin:        '0 0 20px 0',
            }}
          >
            — Comunidad synco
          </p>
          <h2
            style={{
              fontFamily:    'var(--font-display)',
              fontWeight:    800,
              fontSize:      'clamp(38px, 4.8vw, 80px)',
              lineHeight:    0.92,
              letterSpacing: '-0.03em',
              color:         '#F5F0E8',
              margin:        0,
            }}
          >
            Underground.<br />
            <span style={{ WebkitTextStroke: '1.5px rgba(201,167,242,0.55)', color: 'transparent' }}>
              En toda España.
            </span>
          </h2>
        </motion.div>

        {/* ── City grid ── */}
        <div
          style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap:                 '1px',
            background:          'rgba(201,167,242,0.1)',
            border:              '1px solid rgba(201,167,242,0.1)',
          }}
        >
          {CITIES.map((item, i) => (
            <motion.div
              key={item.city}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,167,242,0.04)' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#0A0A0A' }}
              style={{
                position:   'relative',
                padding:    '40px 36px',
                background: '#0A0A0A',
                overflow:   'hidden',
                cursor:     'default',
                transition: 'background 0.3s ease',
              }}
            >
              {/* Ghost city initials */}
              <div
                style={{
                  position:         'absolute',
                  bottom:           '-12px',
                  right:            '-4px',
                  fontFamily:       'var(--font-display)',
                  fontWeight:       800,
                  fontSize:         '100px',
                  letterSpacing:    '-0.04em',
                  lineHeight:       1,
                  color:            'transparent',
                  WebkitTextStroke: '1px rgba(201,167,242,0.07)',
                  userSelect:       'none',
                  pointerEvents:    'none',
                }}
              >
                {item.city.slice(0, 2).toUpperCase()}
              </div>

              {/* Content */}
              <p
                style={{
                  fontFamily:    'var(--font-body)',
                  fontSize:      '10px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color:         'rgba(245,240,232,0.3)',
                  margin:        '0 0 12px 0',
                }}
              >
                {item.region}
              </p>

              <h3
                style={{
                  fontFamily:    'var(--font-display)',
                  fontWeight:    800,
                  fontSize:      'clamp(28px, 3vw, 44px)',
                  letterSpacing: '-0.03em',
                  lineHeight:    1,
                  color:         '#F5F0E8',
                  margin:        '0 0 28px 0',
                }}
              >
                {item.city}
              </h3>

              {/* Divider */}
              <div style={{ height: '1px', background: 'rgba(201,167,242,0.1)', marginBottom: '20px' }} />

              {/* Stats */}
              <div style={{ display: 'flex', gap: '28px' }}>
                <div>
                  <span
                    style={{
                      display:    'block',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize:   '22px',
                      color:      '#D4FF4F',
                      lineHeight: 1,
                    }}
                  >
                    {item.concerts}
                  </span>
                  <span
                    style={{
                      display:       'block',
                      fontFamily:    'var(--font-body)',
                      fontSize:      '9px',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color:         'rgba(245,240,232,0.3)',
                      marginTop:     '5px',
                    }}
                  >
                    conciertos
                  </span>
                </div>
                <div>
                  <span
                    style={{
                      display:    'block',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize:   '22px',
                      color:      '#C9A7F2',
                      lineHeight: 1,
                    }}
                  >
                    {item.syncers}
                  </span>
                  <span
                    style={{
                      display:       'block',
                      fontFamily:    'var(--font-body)',
                      fontSize:      '9px',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color:         'rgba(245,240,232,0.3)',
                      marginTop:     '5px',
                    }}
                  >
                    syncers
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
