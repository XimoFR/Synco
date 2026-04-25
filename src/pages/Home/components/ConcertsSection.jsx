import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, MapPin, ChevronRight, X, Users } from 'lucide-react'
import { format, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'
import { toast } from 'sonner'
import { useAuth } from '../../../context/AuthContext'

const COVER_GRADIENTS = [
  'linear-gradient(135deg, #8B5CF6 0%, #C9A7F2 100%)',
  'linear-gradient(135deg, #0A0710 0%, #8B5CF6 100%)',
  'linear-gradient(135deg, #1a0a2e 0%, #D4FF4F 100%)',
  'linear-gradient(135deg, #C9A7F2 0%, #F5F0E8 100%)',
  'linear-gradient(135deg, #1E1629 0%, #C9A7F2 100%)',
  'linear-gradient(135deg, #8B5CF6 0%, #D4FF4F 100%)',
  'linear-gradient(135deg, #0f0a1e 0%, #7C3AED 100%)',
  'linear-gradient(135deg, #2d1b69 0%, #C9A7F2 100%)',
]

const MOCK = [
  { id: 1, title: 'Mad Cool 2025',        artist: 'Massive Attack',  venue: 'Estadio Cívitas Metropolitano', city: 'Madrid',      community: 'Comunidad de Madrid',  concert_date: '2025-07-10', joined: 124 },
  { id: 2, title: 'Primavera Sound 2025', artist: 'Rosalía',         venue: 'Parc del Fòrum',                city: 'Barcelona',   community: 'Cataluña',             concert_date: '2025-06-05', joined: 210 },
  { id: 3, title: 'BBK Live 2025',        artist: 'The Cure',        venue: 'Kobetamendi',                  city: 'Bilbao',      community: 'País Vasco',           concert_date: '2025-07-11', joined: 86  },
  { id: 4, title: 'FIB 2025',             artist: 'Arctic Monkeys',  venue: 'Recinto del FIB',              city: 'Benicàssim',  community: 'Comunidad Valenciana', concert_date: '2025-07-17', joined: 172 },
  { id: 5, title: 'SOS 4.8',              artist: 'Jungle',          venue: 'Recinto Ferial de Murcia',     city: 'Murcia',      community: 'Murcia',               concert_date: '2025-05-02', joined: 48  },
  { id: 6, title: 'Cala Mijas 2025',      artist: 'Bicep',           venue: 'Playa de Calahonda',           city: 'Mijas',       community: 'Andalucía',            concert_date: '2025-10-03', joined: 63  },
  { id: 7, title: 'Nova Koro',            artist: 'Nova Koro',       venue: 'Sala Apolo',                   city: 'Barcelona',   community: 'Cataluña',             concert_date: '2025-05-12', joined: 92  },
  { id: 8, title: 'Madrid Underground',   artist: 'Club Marisma',    venue: 'La Riviera',                   city: 'Madrid',      community: 'Comunidad de Madrid',  concert_date: '2025-05-18', joined: 55  },
]

/* ── Featured card — full width, sharp edges ── */
function FeaturedCard({ concert }) {
  const gradient = COVER_GRADIENTS[concert.id % COVER_GRADIENTS.length]
  const dateObj  = parseISO(concert.concert_date)
  const day      = format(dateObj, 'd')
  const month    = format(dateObj, 'MMM', { locale: es }).toUpperCase()
  const fullDate = format(dateObj, "EEEE d 'de' MMMM", { locale: es })

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,167,242,0.32)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(201,167,242,0.15)' }}
      style={{
        display:     'flex',
        minHeight:   '300px',
        border:      '1px solid rgba(201,167,242,0.15)',
        overflow:    'hidden',
        transition:  'border-color 0.3s ease',
      }}
    >
      {/* Cover — left 40% */}
      <div
        style={{
          position:   'relative',
          width:      '40%',
          flexShrink: 0,
          background: gradient,
          overflow:   'hidden',
        }}
      >
        {/* Right-side fade into body */}
        <div style={{
          position:   'absolute',
          inset:      0,
          background: 'linear-gradient(to right, transparent 55%, rgba(19,19,19,0.85) 100%)',
          pointerEvents: 'none',
        }} />

        {/* Date badge */}
        <div
          style={{
            position:        'absolute',
            top:             24,
            left:            24,
            background:      'rgba(10,10,10,0.82)',
            backdropFilter:  'blur(10px)',
            borderRadius:    '12px',
            padding:         '10px 18px',
            textAlign:       'center',
          }}
        >
          <span style={{ display: 'block', fontFamily: 'var(--font-display)', fontWeight: 800, color: '#C9A7F2', fontSize: 38, lineHeight: 1 }}>{day}</span>
          <span style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: 9, letterSpacing: '0.18em', color: 'rgba(245,240,232,0.55)', marginTop: 4, textTransform: 'uppercase' }}>{month}</span>
        </div>

        {/* Destacado — sharp rectangular sticker */}
        <div
          style={{
            position:      'absolute',
            top:           24,
            right:         24,
            background:    '#D4FF4F',
            color:         '#0A0A0A',
            fontFamily:    'var(--font-body)',
            fontWeight:    700,
            fontSize:      '10px',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            padding:       '6px 12px',
          }}
        >
          DESTACADO
        </div>
      </div>

      {/* Body — right */}
      <div
        style={{
          flex:          1,
          display:       'flex',
          flexDirection: 'column',
          justifyContent:'space-between',
          padding:       '44px 52px',
          background:    '#0A0A0A',
        }}
      >
        <div>
          <p
            style={{
              fontFamily:    'var(--font-body)',
              fontSize:      '10px',
              letterSpacing: '0.24em',
              color:         'rgba(212,255,79,0.6)',
              textTransform: 'uppercase',
              margin:        '0 0 16px 0',
            }}
          >
            {concert.community}
          </p>
          <h3
            style={{
              fontFamily:    'var(--font-display)',
              fontWeight:    800,
              fontSize:      'clamp(28px, 3.4vw, 56px)',
              letterSpacing: '-0.03em',
              lineHeight:    1,
              color:         '#F5F0E8',
              margin:        0,
            }}
          >
            {concert.artist}
          </h3>
          <p
            style={{
              marginTop:  '12px',
              fontFamily: 'var(--font-body)',
              fontSize:   '14px',
              color:      'rgba(245, 240, 232, 0.4)',
            }}
          >
            {concert.venue} · {concert.city}
          </p>
          <p
            style={{
              marginTop:     '6px',
              fontFamily:    'var(--font-body)',
              fontSize:      '11px',
              color:         'rgba(245, 240, 232, 0.22)',
              letterSpacing: '0.04em',
              textTransform: 'capitalize',
            }}
          >
            {fullDate}
          </p>
        </div>

        {/* Footer bar */}
        <div
          style={{
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'space-between',
            gap:            '16px',
            paddingTop:     '24px',
            marginTop:      '24px',
            borderTop:      '1px solid rgba(201,167,242,0.1)',
          }}
        >
          {/* Avatar stack + count */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ display: 'flex' }}>
              {['A','B','C','D','E'].map((l, i) => (
                <div
                  key={l}
                  style={{
                    width:           28,
                    height:          28,
                    borderRadius:    '50%',
                    background:      '#C9A7F2',
                    border:          '2px solid #0A0A0A',
                    display:         'flex',
                    alignItems:      'center',
                    justifyContent:  'center',
                    fontFamily:      'var(--font-display)',
                    fontWeight:      700,
                    fontSize:        10,
                    color:           '#0A0A0A',
                    marginLeft:      i > 0 ? -8 : 0,
                    zIndex:          5 - i,
                    position:        'relative',
                  }}
                >
                  {l}
                </div>
              ))}
            </div>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize:   '14px',
                color:      'rgba(245, 240, 232, 0.45)',
              }}
            >
              {concert.joined ?? 0} syncers van
            </span>
          </div>

          {/* CTA */}
          <button
            onClick={() => toast.success(`Grupos para ${concert.artist}`, { description: 'Próximamente' })}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#D4FF4F'
              e.currentTarget.style.boxShadow  = '0 12px 40px -8px rgba(212,255,79,0.45)'
              e.currentTarget.style.transform  = 'translateY(-2px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = '#C9A7F2'
              e.currentTarget.style.boxShadow  = '0 8px 28px -6px rgba(201,167,242,0.5)'
              e.currentTarget.style.transform  = 'translateY(0)'
            }}
            style={{
              display:        'inline-flex',
              alignItems:     'center',
              gap:            '8px',
              padding:        '13px 28px',
              borderRadius:   '9999px',
              border:         'none',
              background:     '#C9A7F2',
              color:          '#0A0A0A',
              fontFamily:     'var(--font-body)',
              fontWeight:     700,
              fontSize:       '14px',
              letterSpacing:  '-0.01em',
              cursor:         'pointer',
              whiteSpace:     'nowrap',
              transition:     'background 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease',
              boxShadow:      '0 8px 28px -6px rgba(201,167,242,0.5)',
            }}
          >
            Ver grupos
            <ChevronRight size={14} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </motion.article>
  )
}

/* ── Regular card — sharp, poster-like ── */
function ConcertCard({ concert, index }) {
  const gradient = COVER_GRADIENTS[concert.id % COVER_GRADIENTS.length]
  const dateObj  = parseISO(concert.concert_date)
  const day      = format(dateObj, 'd')
  const month    = format(dateObj, 'MMM', { locale: es }).toUpperCase()
  const weekday  = format(dateObj, 'EEE', { locale: es }).toUpperCase()

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,167,242,0.28)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(201,167,242,0.12)' }}
      style={{
        display:       'flex',
        flexDirection: 'column',
        border:        '1px solid rgba(201,167,242,0.12)',
        overflow:      'hidden',
        transition:    'border-color 0.3s ease',
        background:    '#0A0A0A',
      }}
    >
      {/* Cover */}
      <div
        style={{
          position:   'relative',
          aspectRatio: '4/3',
          flexShrink: 0,
          background: gradient,
          overflow:   'hidden',
        }}
      >
        <div style={{
          position:      'absolute',
          inset:         0,
          background:    'linear-gradient(to bottom, transparent 45%, rgba(10,10,10,0.8) 100%)',
          pointerEvents: 'none',
        }} />

        {/* Date badge */}
        <div
          style={{
            position:       'absolute',
            top:            16,
            left:           16,
            background:     'rgba(10,10,10,0.8)',
            backdropFilter: 'blur(8px)',
            borderRadius:   '10px',
            padding:        '8px 14px',
            textAlign:      'center',
          }}
        >
          <span style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: 8, letterSpacing: '0.2em', color: 'rgba(245,240,232,0.4)', textTransform: 'uppercase' }}>{weekday}</span>
          <span style={{ display: 'block', fontFamily: 'var(--font-display)', fontWeight: 800, color: '#C9A7F2', fontSize: 28, lineHeight: 1.1 }}>{day}</span>
          <span style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: 8, letterSpacing: '0.15em', color: 'rgba(245,240,232,0.45)', marginTop: 2, textTransform: 'uppercase' }}>{month}</span>
        </div>

        {/* Community tag */}
        <div style={{ position: 'absolute', bottom: 14, left: 16 }}>
          <span
            style={{
              fontFamily:     'var(--font-body)',
              fontSize:       '8px',
              letterSpacing:  '0.15em',
              textTransform:  'uppercase',
              color:          'rgba(245,240,232,0.5)',
              background:     'rgba(10,10,10,0.6)',
              backdropFilter: 'blur(6px)',
              borderRadius:   '9999px',
              padding:        '4px 10px',
            }}
          >
            {concert.community}
          </span>
        </div>
      </div>

      {/* Body */}
      <div
        style={{
          flex:          1,
          display:       'flex',
          flexDirection: 'column',
          padding:       '24px 24px 20px',
        }}
      >
        <h3
          style={{
            fontFamily:    'var(--font-display)',
            fontWeight:    700,
            fontSize:      'clamp(18px, 1.8vw, 24px)',
            letterSpacing: '-0.025em',
            lineHeight:    1.1,
            color:         '#F5F0E8',
            margin:        0,
          }}
        >
          {concert.artist}
        </h3>
        <p
          style={{
            marginTop:     '6px',
            fontFamily:    'var(--font-body)',
            fontSize:      '10px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color:         'rgba(245, 240, 232, 0.3)',
            overflow:      'hidden',
            textOverflow:  'ellipsis',
            whiteSpace:    'nowrap',
          }}
        >
          {concert.venue}
        </p>

        {/* Ticket stub divider */}
        <div
          style={{
            margin:      '18px 0',
            borderTop:   '1px dashed rgba(201,167,242,0.18)',
          }}
        />

        {/* Footer */}
        <div
          style={{
            marginTop:      'auto',
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'space-between',
            gap:            '8px',
          }}
        >
          {/* Avatar stack */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ display: 'flex' }}>
              {['A','B','C'].map((l, i) => (
                <div
                  key={l}
                  style={{
                    width:          20,
                    height:         20,
                    borderRadius:   '50%',
                    background:     '#C9A7F2',
                    border:         '2px solid #0A0A0A',
                    display:        'flex',
                    alignItems:     'center',
                    justifyContent: 'center',
                    fontFamily:     'var(--font-display)',
                    fontWeight:     700,
                    fontSize:       8,
                    color:          '#0A0A0A',
                    marginLeft:     i > 0 ? -6 : 0,
                    position:       'relative',
                    zIndex:         3 - i,
                  }}
                >
                  {l}
                </div>
              ))}
            </div>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize:   '12px',
                color:      'rgba(245,240,232,0.38)',
              }}
            >
              {concert.joined ?? 0} van
            </span>
          </div>

          {/* CTA small */}
          <button
            onClick={() => toast.success(`Grupos para ${concert.artist}`, { description: 'Próximamente' })}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#C9A7F2'
              e.currentTarget.style.color      = '#0A0A0A'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(201,167,242,0.08)'
              e.currentTarget.style.color      = 'rgba(201,167,242,0.8)'
            }}
            style={{
              display:        'inline-flex',
              alignItems:     'center',
              gap:            '5px',
              padding:        '8px 16px',
              borderRadius:   '9999px',
              border:         'none',
              background:     'rgba(201,167,242,0.08)',
              color:          'rgba(201,167,242,0.8)',
              fontFamily:     'var(--font-body)',
              fontWeight:     600,
              fontSize:       '12px',
              cursor:         'pointer',
              whiteSpace:     'nowrap',
              transition:     'background 0.2s ease, color 0.2s ease',
            }}
          >
            Ver grupos
            <ChevronRight size={11} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </motion.article>
  )
}

/* ── Skeleton ── */
function SkeletonCard() {
  return (
    <div
      style={{
        background:   '#0A0A0A',
        border:       '1px solid rgba(201,167,242,0.07)',
        overflow:     'hidden',
        animation:    'pulse 2s cubic-bezier(0.4,0,0.6,1) infinite',
      }}
    >
      <div style={{ aspectRatio: '4/3', background: 'rgba(201,167,242,0.04)' }} />
      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ height: '20px', background: 'rgba(201,167,242,0.05)', borderRadius: '9999px', width: '75%' }} />
        <div style={{ height: '12px', background: 'rgba(201,167,242,0.04)', borderRadius: '9999px', width: '50%' }} />
        <div style={{ marginTop: '8px', height: '1px', background: 'rgba(201,167,242,0.07)', borderStyle: 'dashed' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ height: '20px', width: '80px', background: 'rgba(201,167,242,0.04)', borderRadius: '9999px' }} />
          <div style={{ height: '28px', width: '90px', background: 'rgba(201,167,242,0.04)', borderRadius: '9999px' }} />
        </div>
      </div>
    </div>
  )
}

/* ── Section ── */
export default function ConcertsSection() {
  const { token }                 = useAuth()
  const [concerts,  setConcerts]  = useState([])
  const [loading,   setLoading]   = useState(true)
  const [community, setCommunity] = useState('Todas')
  const [search,    setSearch]    = useState('')
  const [searchFocused, setSearchFocused] = useState(false)

  useEffect(() => {
    fetch('/api/concerts', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(data => setConcerts(Array.isArray(data) && data.length ? data : MOCK))
      .catch(() => setConcerts(MOCK))
      .finally(() => setLoading(false))
  }, [token])

  const communities = ['Todas', ...new Set(concerts.map(c => c.community))]

  const filtered = concerts.filter(c => {
    const matchCommunity = community === 'Todas' || c.community === community
    const q = search.toLowerCase().trim()
    const matchSearch = !q ||
      c.artist.toLowerCase().includes(q) ||
      c.venue.toLowerCase().includes(q) ||
      (c.title || '').toLowerCase().includes(q)
    return matchCommunity && matchSearch
  })

  return (
    <section
      id="conciertos"
      style={{
        position:      'relative',
        overflow:      'hidden',
        paddingTop:    'clamp(96px, 11vh, 128px)',
        paddingBottom: 'clamp(96px, 11vh, 128px)',
        background:    '#0A0A0A',
        borderTop:     '1px solid rgba(201,167,242,0.1)',
        borderBottom:  '1px solid rgba(201,167,242,0.1)',
      }}
    >
      {/* Atmospheric glow */}
      <div
        style={{
          position:      'absolute',
          inset:         0,
          pointerEvents: 'none',
          background:
            'radial-gradient(ellipse 60% 50% at 105% 8%, rgba(124,58,237,0.14) 0%, transparent 55%),' +
            'radial-gradient(ellipse 50% 45% at -8% 92%, rgba(212,255,79,0.08) 0%, transparent 52%)',
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
        <div
          style={{
            display:        'flex',
            flexWrap:       'wrap',
            alignItems:     'flex-end',
            justifyContent: 'space-between',
            gap:            '24px',
            marginBottom:   '56px',
          }}
        >
          <div>
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
              — Agenda underground
            </p>
            <h2
              style={{
                fontFamily:    'var(--font-display)',
                fontWeight:    800,
                fontSize:      'clamp(36px, 4.8vw, 80px)',
                lineHeight:    0.92,
                letterSpacing: '-0.03em',
                color:         '#F5F0E8',
                margin:        0,
              }}
            >
              Todos los bolos.<br />
              <span style={{ WebkitTextStroke: '1.5px rgba(201,167,242,0.55)', color: 'transparent' }}>
                En tu ciudad.
              </span>
            </h2>
          </div>

          {/* Live counter */}
          <div
            style={{
              display:       'inline-flex',
              alignItems:    'center',
              gap:           '10px',
              padding:       '10px 18px',
              borderRadius:  '9999px',
              border:        '1px solid rgba(212,255,79,0.2)',
              background:    'rgba(212,255,79,0.05)',
              fontFamily:    'var(--font-body)',
              fontSize:      '12px',
              letterSpacing: '0.1em',
              color:         '#D4FF4F',
              whiteSpace:    'nowrap',
            }}
          >
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#D4FF4F', flexShrink: 0, boxShadow: '0 0 8px #D4FF4F' }} />
            {filtered.length} eventos activos
          </div>
        </div>

        {/* ── Search + filters ── */}
        <div style={{ marginBottom: '40px' }}>

          {/* Search input */}
          <div style={{ position: 'relative', maxWidth: '420px', marginBottom: '20px' }}>
            <Search
              size={14}
              style={{
                position:      'absolute',
                left:          '18px',
                top:           '50%',
                transform:     'translateY(-50%)',
                color:         'rgba(245,240,232,0.28)',
                pointerEvents: 'none',
              }}
            />
            <input
              className="synco-input"
              value={search}
              onChange={e => setSearch(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              placeholder="Buscar artista, sala..."
              style={{
                width:        '100%',
                paddingLeft:  '44px',
                paddingRight: search ? '44px' : '18px',
                paddingTop:   '13px',
                paddingBottom:'13px',
                background:   '#0A0A0A',
                border:       `1px solid ${searchFocused ? 'rgba(201,167,242,0.45)' : 'rgba(42,40,37,0.9)'}`,
                borderRadius: '9999px',
                color:        '#F5F0E8',
                fontFamily:   'var(--font-body)',
                fontSize:     '14px',
                boxShadow:    searchFocused ? '0 0 0 3px rgba(201,167,242,0.07)' : 'none',
                transition:   'border-color 0.2s ease, box-shadow 0.2s ease',
                boxSizing:    'border-box',
              }}
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                style={{
                  position:   'absolute',
                  right:      '16px',
                  top:        '50%',
                  transform:  'translateY(-50%)',
                  background: 'none',
                  border:     'none',
                  cursor:     'pointer',
                  color:      'rgba(245,240,232,0.3)',
                  display:    'flex',
                  padding:    '4px',
                }}
              >
                <X size={13} />
              </button>
            )}
          </div>

          {/* Community chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {communities.map(c => {
              const isActive = community === c
              return (
                <motion.button
                  key={c}
                  onClick={() => setCommunity(c)}
                  whileTap={{ scale: 0.96 }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor = 'rgba(201,167,242,0.35)'
                      e.currentTarget.style.color       = 'rgba(245,240,232,0.85)'
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor = 'rgba(201,167,242,0.14)'
                      e.currentTarget.style.color       = 'rgba(245,240,232,0.5)'
                    }
                  }}
                  style={{
                    display:       'inline-flex',
                    alignItems:    'center',
                    gap:           '6px',
                    padding:       '8px 16px',
                    borderRadius:  '9999px',
                    border:        `1px solid ${isActive ? '#C9A7F2' : 'rgba(201,167,242,0.14)'}`,
                    background:    isActive ? '#C9A7F2' : 'rgba(201,167,242,0.05)',
                    color:         isActive ? '#0A0A0A' : 'rgba(245,240,232,0.5)',
                    fontFamily:    'var(--font-body)',
                    fontWeight:    isActive ? 700 : 500,
                    fontSize:      '13px',
                    cursor:        'pointer',
                    transition:    'border-color 0.2s ease, color 0.2s ease, background 0.2s ease',
                    whiteSpace:    'nowrap',
                  }}
                >
                  {c === 'Todas' && <MapPin size={11} />}
                  {c}
                </motion.button>
              )
            })}
          </div>
        </div>

        {/* ── Grid ── */}
        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ background: '#0A0A0A', border: '1px solid rgba(201,167,242,0.07)', height: '300px', animation: 'pulse 2s ease infinite' }} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
              {Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? (
              <motion.div key="results" layout style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <FeaturedCard concert={filtered[0]} />
                {filtered.length > 1 && (
                  <motion.div
                    layout
                    style={{
                      display:             'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                      gap:                 '24px',
                    }}
                  >
                    {filtered.slice(1).map((c, i) => (
                      <ConcertCard key={c.id} concert={c} index={i + 1} />
                    ))}
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ paddingTop: '96px', paddingBottom: '96px', textAlign: 'center' }}
              >
                <p
                  style={{
                    fontFamily:    'var(--font-display)',
                    fontWeight:    700,
                    fontSize:      'clamp(20px, 2.4vw, 30px)',
                    color:         'rgba(245,240,232,0.18)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  No hay resultados para &ldquo;{search}&rdquo;
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        )}

      </div>
    </section>
  )
}
