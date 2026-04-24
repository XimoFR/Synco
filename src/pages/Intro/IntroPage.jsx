import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const FRAME_COUNT = 95
const FRAME_PATH  = (n) => `/frames/frame_${String(n).padStart(4, '0')}.jpg`

const norm = (p, lo, hi) => Math.max(0, Math.min(1, (p - lo) / (hi - lo)))
const lerp = (a, b, t)   => a + (b - a) * t

export default function IntroPage({ onComplete }) {
  const containerRef   = useRef(null)
  const canvasRef      = useRef(null)
  const overlayRef     = useRef(null)
  const hintRef        = useRef(null)
  const beat1Ref       = useRef(null)
  const beat2Ref       = useRef(null)
  const beat3Ref       = useRef(null)
  const progressBarRef = useRef(null)
  const locationRef    = useRef(null)
  const framesRef      = useRef([])

  const [loadProgress, setLoadProgress] = useState(0)
  const [ready, setReady]               = useState(false)

  const drawFrame = useCallback((index) => {
    const canvas = canvasRef.current
    const img    = framesRef.current[index]
    if (!canvas || !img?.complete) return
    const ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
  }, [])

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.width  = window.innerWidth
    canvas.height = window.innerHeight
    drawFrame(0)
  }, [drawFrame])

  useEffect(() => {
    let loaded = 0
    const imgs = []
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image()
      img.src = FRAME_PATH(i)
      img.onload = () => {
        loaded++
        setLoadProgress(loaded / FRAME_COUNT)
        if (loaded === FRAME_COUNT) setReady(true)
      }
      imgs.push(img)
    }
    framesRef.current = imgs
  }, [])

  useEffect(() => {
    if (!ready) return

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    drawFrame(0)

    const triggerExit = () => {
      gsap.to(canvasRef.current, {
        scale: 14,
        duration: 1.2,
        ease: 'power3.in',
      })
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.5,
        delay: 0.75,
        ease: 'power2.in',
        onComplete,
      })
    }

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.5,
      onUpdate: (self) => {
        const p = self.progress

        drawFrame(Math.min(Math.round(p * (FRAME_COUNT - 1)), FRAME_COUNT - 1))

        gsap.set(progressBarRef.current, { scaleX: p })

        const b1 = norm(p, 0, 0.08) * (1 - norm(p, 0.20, 0.30))
        gsap.set(beat1Ref.current,    { opacity: b1, x: lerp(-60, 0, norm(p, 0, 0.08)) })
        gsap.set(locationRef.current, { opacity: b1 * 0.7 })

        const b2 = norm(p, 0.32, 0.42) * (1 - norm(p, 0.56, 0.66))
        gsap.set(beat2Ref.current, { opacity: b2, x: lerp(60, 0, norm(p, 0.32, 0.42)) })

        const b3 = norm(p, 0.70, 0.80) * (1 - norm(p, 0.88, 0.96))
        gsap.set(beat3Ref.current, { opacity: b3, x: lerp(-60, 0, norm(p, 0.70, 0.80)) })
      },
      onLeave: triggerExit,
    })

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top+=1',
      onEnter: () => gsap.to(hintRef.current, { opacity: 0, duration: 0.4 }),
    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [ready, drawFrame, resizeCanvas, onComplete])

  return (
    <div ref={containerRef} style={{ height: '500vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-obsidian">

        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ transformOrigin: '50% 50%' }}
        />

        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/50 via-transparent to-obsidian/70 pointer-events-none" />

        {/* Corner brackets */}
        <div className="absolute top-6 left-6 w-9 h-9 border-t-2 border-l-2 border-obsidian/20 pointer-events-none" />
        <div className="absolute top-6 right-6 w-9 h-9 border-t-2 border-r-2 border-obsidian/20 pointer-events-none" />
        <div className="absolute bottom-6 left-6 w-9 h-9 border-b-2 border-l-2 border-obsidian/20 pointer-events-none" />
        <div className="absolute bottom-6 right-6 w-9 h-9 border-b-2 border-r-2 border-obsidian/20 pointer-events-none" />

        {/* Top-right label */}
        {ready && (
          <div className="absolute top-7 right-20 pointer-events-none">
            <span className="text-[10px] font-body tracking-[0.35em] uppercase text-obsidian/30">
              2026
            </span>
          </div>
        )}

        {/* Beat 1 — izquierda */}
        <div
          ref={beat1Ref}
          className="absolute left-10 md:left-16 top-1/2 -translate-y-1/2 flex flex-col gap-4 opacity-0 pointer-events-none"
        >
          <img src="/logo.svg" alt="Synco" className="w-24" />
          <div className="flex items-center gap-3">
            <div className="w-px h-8 bg-obsidian/40" />
            <p className="text-xs font-body tracking-[0.25em] uppercase text-obsidian">
              El underground español<br />en tu mano
            </p>
          </div>
        </div>

        {/* Beat 2 — derecha */}
        <div
          ref={beat2Ref}
          className="absolute right-10 md:right-16 top-1/2 -translate-y-1/2 flex flex-col items-end gap-3 opacity-0 pointer-events-none"
        >
          <h2 className="font-display text-4xl md:text-6xl text-obsidian text-right leading-[0.9]">
            Encuentra<br />tu grupo
          </h2>
          <div className="flex items-center gap-3">
            <p className="text-xs font-body text-obsidian/60 tracking-widest uppercase text-right">
              Grupos reales · Conciertos reales
            </p>
            <div className="w-px h-8 bg-obsidian/40" />
          </div>
        </div>

        {/* Beat 3 — izquierda inferior */}
        <div
          ref={beat3Ref}
          className="absolute left-10 md:left-16 bottom-[28%] flex flex-col gap-2 opacity-0 pointer-events-none"
        >
          <div className="w-8 h-px bg-[#5B21B6] mb-2" />
          <h2 className="font-display text-5xl md:text-7xl text-[#5B21B6] leading-none">
            No vayas<br />solo.
          </h2>
        </div>

        {/* Location tag */}
        {ready && (
          <div
            ref={locationRef}
            className="absolute bottom-16 left-1/2 -translate-x-1/2 opacity-0 pointer-events-none"
          >
            <p className="text-[10px] font-body tracking-[0.35em] uppercase text-obsidian/50 whitespace-nowrap">
              Madrid · Barcelona · Valencia · Bilbao
            </p>
          </div>
        )}

        {/* Scroll progress bar */}
        {ready && (
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-obsidian/10 pointer-events-none overflow-hidden">
            <div
              ref={progressBarRef}
              className="h-full bg-[#5B21B6] origin-left"
              style={{ transform: 'scaleX(0)' }}
            />
          </div>
        )}

        {/* Loading */}
        {!ready && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-obsidian gap-4 z-10">
            <img src="/logo.svg" alt="Synco" className="w-20 opacity-60" />
            <div className="w-40 h-px bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-lavender transition-all duration-100"
                style={{ width: `${loadProgress * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Scroll hint */}
        {ready && (
          <div
            ref={hintRef}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none"
          >
            <span className="text-xs font-body tracking-widest uppercase text-obsidian/40">
              Scroll
            </span>
            <div className="w-px h-10 bg-obsidian/20 animate-pulse" />
          </div>
        )}

        {/* Exit overlay */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-obsidian opacity-0 pointer-events-none"
        />
      </div>
    </div>
  )
}
