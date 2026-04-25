import { motion } from 'framer-motion'

const TESTIMONIALS = [
  {
    quote:   'Fui sola al Mad Cool. Salí con seis nuevos amigos y ya hemos quedado para el BBK.',
    name:    'Sara M.',
    city:    'Madrid',
    initial: 'S',
  },
  {
    quote:   'Llevaba años yendo a conciertos sin conocer a nadie con el mismo gusto. Synco lo cambió en un fin de semana.',
    name:    'Álex R.',
    city:    'Barcelona',
    initial: 'A',
  },
  {
    quote:   'El grupo del Primavera sigue activo. Ya somos ocho que quedamos aunque no haya concierto.',
    name:    'Paula G.',
    city:    'Bilbao',
    initial: 'P',
  },
]

export default function TestimonialsSection() {
  return (
    <section
      style={{
        position:      'relative',
        overflow:      'hidden',
        paddingTop:    'clamp(96px, 11vh, 128px)',
        paddingBottom: 'clamp(96px, 11vh, 128px)',
        background:    '#0A0A0A',
        borderTop:     '1px solid rgba(201,167,242,0.1)',
      }}
    >

      {/* Atmospheric glow */}
      <div
        style={{
          position:      'absolute',
          inset:         0,
          pointerEvents: 'none',
          background:
            'radial-gradient(ellipse 70% 55% at 50% 115%, rgba(124,58,237,0.16) 0%, transparent 55%),' +
            'radial-gradient(ellipse 40% 35% at 98% -5%, rgba(201,167,242,0.09) 0%, transparent 50%)',
        }}
      />

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
          style={{ marginBottom: '64px', textAlign: 'center' }}
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
            — Syncers reales
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
            Lo dicen<br />
            <span style={{ WebkitTextStroke: '1.5px rgba(201,167,242,0.55)', color: 'transparent' }}>
              los syncers.
            </span>
          </h2>
        </motion.div>

        {/* ── Testimonials grid ── */}
        <div
          style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap:                 '24px',
          }}
        >
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display:       'flex',
                flexDirection: 'column',
                justifyContent:'space-between',
                padding:       '40px 36px',
                border:        '1px solid rgba(201,167,242,0.12)',
                background:    '#0A0A0A',
                minHeight:     '240px',
              }}
            >
              {/* Quote mark */}
              <div>
                <span
                  style={{
                    display:    'block',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    fontSize:   '64px',
                    lineHeight: 0.8,
                    color:      '#D4FF4F',
                    marginBottom:'20px',
                    userSelect: 'none',
                  }}
                >
                  "
                </span>

                <p
                  style={{
                    fontFamily:    'var(--font-body)',
                    fontSize:      'clamp(15px, 1.4vw, 18px)',
                    color:         'rgba(245, 240, 232, 0.82)',
                    lineHeight:    1.65,
                    margin:        0,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {t.quote}
                </p>
              </div>

              {/* Author */}
              <div
                style={{
                  display:    'flex',
                  alignItems: 'center',
                  gap:        '14px',
                  marginTop:  '32px',
                  paddingTop: '24px',
                  borderTop:  '1px solid rgba(201,167,242,0.1)',
                }}
              >
                <div
                  style={{
                    width:          '38px',
                    height:         '38px',
                    borderRadius:   '50%',
                    background:     'rgba(201,167,242,0.12)',
                    border:         '1px solid rgba(201,167,242,0.22)',
                    display:        'flex',
                    alignItems:     'center',
                    justifyContent: 'center',
                    fontFamily:     'var(--font-display)',
                    fontWeight:     700,
                    fontSize:       '15px',
                    color:          '#C9A7F2',
                    flexShrink:     0,
                  }}
                >
                  {t.initial}
                </div>
                <div>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontWeight: 600,
                      fontSize:   '14px',
                      color:      '#F5F0E8',
                      margin:     0,
                    }}
                  >
                    {t.name}
                  </p>
                  <p
                    style={{
                      fontFamily:    'var(--font-body)',
                      fontSize:      '11px',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color:         'rgba(245,240,232,0.3)',
                      margin:        '3px 0 0 0',
                    }}
                  >
                    {t.city}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
