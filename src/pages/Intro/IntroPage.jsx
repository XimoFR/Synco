import { useRef } from 'react'
import { gsap } from 'gsap'

export default function IntroPage({ onComplete }) {
  const videoRef   = useRef(null)
  const overlayRef = useRef(null)

  const handleEnded = () => {
    gsap.to(videoRef.current, {
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

  return (
    <div className="fixed inset-0 bg-obsidian overflow-hidden">
      <video
        ref={videoRef}
        src="/videos/SyncoAnim.mp4"
        autoPlay
        muted
        playsInline
        onEnded={handleEnded}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ transformOrigin: '50% 50%' }}
      />
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-obsidian opacity-0 pointer-events-none"
      />
    </div>
  )
}
