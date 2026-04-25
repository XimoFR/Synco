import clsx from 'clsx'

export function SectionLabel({ text }) {
  return (
    <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-lavender/8 border border-lavender/20 font-mono text-xs text-lavender tracking-[0.22em] uppercase">
      <span className="w-2 h-2 rounded-full bg-lime flex-shrink-0" style={{ boxShadow: '0 0 10px #D4FF4F' }} />
      {text}
    </div>
  )
}

export function SectionTitle({ children, className }) {
  return (
    <h2 className={clsx(
      'section-title font-display font-bold leading-[0.92] tracking-[-0.03em] text-cream',
      'text-[clamp(38px,5.5vw,76px)] max-w-[900px] mt-6',
      className
    )}>
      {children}
    </h2>
  )
}
