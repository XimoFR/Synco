import { motion } from 'framer-motion'
import { Search, Users, Zap } from 'lucide-react'

const STEPS = [
  {
    n:    '01',
    Icon: Search,
    title: 'Busca el concierto',
    desc:  'Filtra por comunidad, fecha o artista. Todo el underground español en un mismo sitio.',
  },
  {
    n:    '02',
    Icon: Users,
    title: 'Únete a un grupo',
    desc:  'Encuentra gente con buen rollo que también va. O crea el tuyo en 30 segundos.',
  },
  {
    n:    '03',
    Icon: Zap,
    title: 'Vive el concierto',
    desc:  'Chat privado hasta el día del bolo. Punto de encuentro, quedadas previas y recuerdos.',
  },
]

export default function HowItWorks() {
  return (
    <section
      id="como-funciona"
      style={{
        position:      'relative',
        overflow:      'hidden',
        paddingTop:    'clamp(96px, 11vh, 128px)',
        paddingBottom: 'clamp(96px, 11vh, 128px)',
      }}
    >

      {/* Atmospheric glow */}
      <div
        style={{
          position:      'absolute',
          inset:         0,
          pointerEvents: 'none',
          background:
            'radial-gradient(ellipse 55% 50% at -5% 25%, rgba(124,58,237,0.13) 0%, transparent 55%),' +
            'radial-gradient(ellipse 40% 35% at 108% 80%, rgba(212,255,79,0.07) 0%, transparent 50%)',
        }}
      />

      {/* Ghost background text */}
      <div
        style={{
          position:         'absolute',
          top:              '50%',
          right:            '-16px',
          transform:        'translateY(-50%)',
          fontFamily:       'var(--font-display)',
          fontWeight:       800,
          fontSize:         'clamp(140px, 18vw, 280px)',
          letterSpacing:    '-0.05em',
          lineHeight:       1,
          color:            'transparent',
          WebkitTextStroke: '1px rgba(201,167,242,0.05)',
          userSelect:       'none',
          pointerEvents:    'none',
        }}
      >
        HOW
      </div>

      {/* Container — más ancho para usar la pantalla */}
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

        {/* ── Two-column layout ── */}
        <div
          style={{
            display:    'flex',
            alignItems: 'flex-start',
            gap:        'clamp(64px, 9vw, 160px)',
          }}
        >

          {/* ── LEFT — sticky text block ── */}
          <div
            style={{
              flexShrink: 0,
              width:      'clamp(280px, 36%, 480px)',
              position:   'sticky',
              top:        '120px',
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <p
                style={{
                  fontFamily:    'var(--font-body)',
                  fontSize:      '11px',
                  letterSpacing: '0.26em',
                  color:         'rgba(212,255,79,0.65)',
                  textTransform: 'uppercase',
                  margin:        '0 0 24px 0',
                }}
              >
                — Cómo funciona
              </p>

              <h2
                style={{
                  fontFamily:    'var(--font-display)',
                  fontWeight:    800,
                  fontSize:      'clamp(40px, 4.8vw, 84px)',
                  lineHeight:    0.9,
                  letterSpacing: '-0.03em',
                  color:         '#F5F0E8',
                  margin:        0,
                }}
              >
                Tres<br />pasos.
                <br />
                <span
                  style={{
                    WebkitTextStroke: '1.5px rgba(201,167,242,0.55)',
                    color:            'transparent',
                  }}
                >
                  Cero<br />postureo.
                </span>
              </h2>

              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize:   '15px',
                  color:      'rgba(245, 240, 232, 0.4)',
                  lineHeight: 1.75,
                  margin:     '36px 0 0 0',
                  maxWidth:   '320px',
                }}
              >
                Synco no es una red social más. Es solo música, gente real y conciertos que no quieres perderte.
              </p>

              {/* Decorative accent — tres puntos lima */}
              <div
                style={{
                  display:    'flex',
                  gap:        '6px',
                  marginTop:  '44px',
                  alignItems: 'center',
                }}
              >
                {[1, 0.5, 0.25].map((op, i) => (
                  <div
                    key={i}
                    style={{
                      width:        i === 0 ? '32px' : '8px',
                      height:       '3px',
                      background:   `rgba(212,255,79,${op})`,
                      borderRadius: '9999px',
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT — steps ── */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {STEPS.map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, x: 32 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={e => {
                  e.currentTarget.style.background  = 'rgba(201,167,242,0.03)'
                  e.currentTarget.style.borderColor = 'rgba(201,167,242,0.16)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background  = 'transparent'
                  e.currentTarget.style.borderColor = 'rgba(201,167,242,0.08)'
                }}
                style={{
                  padding:      '44px 40px',
                  borderBottom: i < STEPS.length - 1 ? '1px solid rgba(201,167,242,0.08)' : 'none',
                  borderRadius: '20px',
                  transition:   'background 0.3s ease, border-color 0.3s ease',
                }}
              >

                {/* Step top row: number + icon */}
                <div
                  style={{
                    display:      'flex',
                    alignItems:   'center',
                    gap:          '16px',
                    marginBottom: '24px',
                  }}
                >
                  <span
                    style={{
                      fontFamily:    'var(--font-body)',
                      fontSize:      '11px',
                      fontWeight:    600,
                      letterSpacing: '0.2em',
                      color:         'rgba(212,255,79,0.6)',
                    }}
                  >
                    {step.n}
                  </span>

                  <div
                    style={{
                      width:          '46px',
                      height:         '46px',
                      borderRadius:   '14px',
                      background:     'rgba(201,167,242,0.07)',
                      border:         '1px solid rgba(201,167,242,0.14)',
                      display:        'flex',
                      alignItems:     'center',
                      justifyContent: 'center',
                      color:          'rgba(201,167,242,0.7)',
                      flexShrink:     0,
                    }}
                  >
                    <step.Icon size={18} strokeWidth={1.75} />
                  </div>
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontFamily:    'var(--font-display)',
                    fontWeight:    700,
                    fontSize:      'clamp(24px, 3vw, 44px)',
                    letterSpacing: '-0.025em',
                    lineHeight:    1.05,
                    color:         '#F5F0E8',
                    margin:        0,
                  }}
                >
                  {step.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize:   '15px',
                    color:      'rgba(245, 240, 232, 0.52)',
                    lineHeight: 1.75,
                    margin:     '16px 0 0 0',
                    maxWidth:   '520px',
                  }}
                >
                  {step.desc}
                </p>

              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
