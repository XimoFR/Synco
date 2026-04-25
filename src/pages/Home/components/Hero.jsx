import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const STATS = [
  ['+1.2K', 'conciertos'],
  ['28', 'ciudades'],
  ['14K', 'usuarios'],
  ['96%', 'no se lo pierden'],
]

export default function Hero() {
  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <section style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>

      {/* Gradient atmosphere */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'radial-gradient(ellipse 65% 50% at 75% 0%, rgba(124,58,237,0.18) 0%, transparent 60%),' +
            'radial-gradient(ellipse 45% 38% at 12% 95%, rgba(212,255,79,0.09) 0%, transparent 52%)',
        }}
      />

      {/* ── Main content — stacked naturally, top-anchored after nav ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: 'clamp(100px, 10vh, 100px)',
          paddingLeft: 'clamp(24px, 5vw, 80px)',
          paddingRight: 'clamp(24px, 5vw, 80px)',
        }}
      >

        {/* 1 — Status pill */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '8px 16px',
            borderRadius: '9999px',
            border: '1px solid rgba(201,167,242,0.15)',
            background: 'rgba(201,167,242,0.04)',
            fontFamily: 'var(--font-body)',
            fontSize: '11px',
            letterSpacing: '0.22em',
            color: 'rgba(245, 240, 232, 0.69)',
            textTransform: 'uppercase',
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#D4FF4F', flexShrink: 0, boxShadow: '0 0 7px #D4FF4F' }} />
          Underground Español
        </motion.div>

        {/* 2 — Title group */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '47px' }}>

          {/* "nunca más irás" */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 500,
              fontSize: 'clamp(12px, 1.4vw, 18px)',
              letterSpacing: '0.06em',
              color: 'rgba(245, 240, 232, 0.69)',
              textTransform: 'uppercase',
              textAlign: 'center',
              margin: 0,
            }}
          >
            nunca más irás
          </motion.p>

          {/* SOLO */}
          <div style={{ overflow: 'hidden', lineHeight: 0, marginTop: '4px' }}>
            <motion.h1
              initial={{ y: '108%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1.05, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 'clamp(96px, 22vw, 340px)',
                WebkitTextStroke: '2px rgba(201,167,242,0.6)',
                color: 'transparent',
                lineHeight: 0.86,
                textAlign: 'center',
                letterSpacing: '-0.04em',
                display: 'block',
                userSelect: 'none',
                margin: 0,
              }}
            >
              SOLO
            </motion.h1>
          </div>

          {/* "a un concierto." */}
          <div style={{ overflow: 'hidden', width: '100%', display: 'flex', justifyContent: 'center', marginTop: '14px' }}>
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.85, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', justifyContent: 'center', gap: '0 16px' }}
            >
              <span style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'clamp(20px, 3.6vw, 54px)',
                color: '#F5F0E8',
                lineHeight: 1,
                letterSpacing: '-0.03em',
              }}>
                a un
              </span>

              <span style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'clamp(20px, 3.6vw, 54px)',
                color: '#D4FF4F',
                lineHeight: 1,
                letterSpacing: '-0.03em',
              }}>
                concierto.
              </span>
            </motion.div>
          </div>

        </div>

        {/* 3 — Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.52 }}
          style={{
            marginTop: '48px',
            fontFamily: 'var(--font-body)',
            fontSize: '15px',
            color: 'rgba(245, 240, 232, 0.69)',
            lineHeight: 1.75,
            textAlign: 'center',
            maxWidth: '440px',
          }}
        >
          Conciertos en toda España. Forma grupos con quien va a lo mismo.{' '}
          <span style={{ color: 'rgba(201,167,242,0.7)' }}>Sin rodeos, sin drama.</span>
        </motion.p>

        {/* 4 — CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.62, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginTop: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}
        >
          {/* Primary CTA */}
          <button
            onClick={() => scrollTo('conciertos')}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#D4FF4F'
              e.currentTarget.style.boxShadow = '0 16px 52px -8px rgba(212,255,79,0.55), 0 4px 20px rgba(0,0,0,0.35)'
              e.currentTarget.style.transform = 'translateY(-3px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = '#C9A7F2'
              e.currentTarget.style.boxShadow = '0 8px 36px -6px rgba(201,167,242,0.65), 0 2px 14px rgba(0,0,0,0.28)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '16px 36px',
              borderRadius: '9999px',
              border: 'none',
              background: '#C9A7F2',
              color: '#0A0A0A',
              fontFamily: 'var(--font-body)',
              fontWeight: 700,
              fontSize: '15px',
              letterSpacing: '-0.01em',
              cursor: 'pointer',
              transition: 'background 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease',
              boxShadow: '0 8px 36px -6px rgba(201,167,242,0.65), 0 2px 14px rgba(0,0,0,0.28)',
              whiteSpace: 'nowrap',
            }}
          >
            Explorar conciertos
            <ArrowRight size={16} strokeWidth={2.5} />
          </button>

          {/* Secondary CTA */}
          <button
            onClick={() => scrollTo('como-funciona')}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#D4FF4F'
              e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)'
              e.currentTarget.style.background = 'transparent'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = '#C9A7F2'
              e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)'
              e.currentTarget.style.background = 'transparent'
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '16px 32px',
              borderRadius: '9999px',
              border: '1px solid #C9A7F2',
              background: 'transparent',
              color: 'rgba(255, 255, 255, 0.8)',
              fontFamily: 'var(--font-body)',
              fontWeight: 500,
              fontSize: '15px',
              cursor: 'pointer',
              transition: 'border-color 0.2s ease, color 0.2s ease, background 0.2s ease',
              whiteSpace: 'nowrap',
            }}
          >
            ¿Cómo funciona?
          </button>
        </motion.div>

      </div>

      {/* 5 — Stats strip — bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.85, duration: 0.9 }}
        style={{
          position: 'relative',
          zIndex: 10,
          padding: '0 clamp(24px, 5vw, 80px) 48px',
        }}
      >
        <div
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            paddingTop: '40px',
            paddingBottom: '28px',
            borderTop: '1px solid rgb(201, 167, 242)',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '20px 56px',
          }}
        >
          {STATS.map(([num, label]) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'clamp(22px, 2.4vw, 36px)',
                color: '#C9A7F2',
                lineHeight: 1,
              }}>
                {num}
              </span>
              <span style={{
                marginTop: '6px',
                fontFamily: 'var(--font-body)',
                fontSize: '10px',
                color: 'rgba(245, 240, 232, 0.69)',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
              }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

    </section>
  )
}
