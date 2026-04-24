import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function HomePage() {
  const contentRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out', delay: 0.15 }
    )
  }, [])

  return (
    <div className="min-h-screen bg-obsidian flex flex-col items-center justify-center">
      <div ref={contentRef} className="flex flex-col items-center gap-6 opacity-0">
        <img src="/logo.svg" alt="Synco" className="w-28" />
        <p className="text-xs font-body tracking-widest uppercase text-cream/30">
          Próximamente
        </p>
      </div>
    </div>
  )
}
