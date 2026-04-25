const ITEMS = [
  { text: 'SYNCO', alt: false },
  { text: '✦', star: true },
  { text: 'SYNCO', alt: true },
  { text: '✦', star: true },
  { text: 'SYNCO', alt: false },
  { text: '✦', star: true },
  { text: 'SYNCO', alt: true },
  { text: '✦', star: true },
  { text: 'SYNCO', alt: false },
  { text: '✦', star: true },
  { text: 'SYNCO', alt: true },
  { text: '✦', star: true },
  { text: 'SYNCO', alt: false },
  { text: '✦', star: true },
  { text: 'SYNCO', alt: true },
  { text: '✦', star: true },
]

export default function MarqueeBandReverse() {
  return (
    <div
      className="overflow-hidden py-7 bg-surface"
      style={{
        borderTop: '2px solid rgba(201,167,242,0.12)',
        borderBottom: '2px solid rgba(201,167,242,0.12)',
      }}
    >
      <div className="animate-marquee-reverse flex gap-14 w-max">
        {[0, 1].map(k =>
          ITEMS.map((item, i) => (
            <span
              key={`${k}-${i}`}
              className={`whitespace-nowrap leading-none select-none ${item.star
                ? 'text-lime'
                : item.alt
                  ? 'font-display font-semibold text-lavender tracking-tight'
                  : 'font-display font-semibold text-cream/75 tracking-tight'
                }`}
              style={
                item.star
                  ? { fontSize: 40, textShadow: '0 0 12px rgba(212,255,79,0.7)' }
                  : { fontSize: 'clamp(26px, 3.2vw, 42px)' }
              }
            >
              {item.text}
            </span>
          ))
        )}
      </div>
    </div>
  )
}
