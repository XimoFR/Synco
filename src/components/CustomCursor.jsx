import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dot  = useRef(null)
  const ring = useRef(null)

  useEffect(() => {
    const onMove = ({ clientX: x, clientY: y }) => {
      if (dot.current)  dot.current.style.transform  = `translate(${x - 3.5}px, ${y - 3.5}px)`
      if (ring.current) ring.current.style.transform = `translate(${x - 18}px, ${y - 18}px)`
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <>
      <div ref={dot}  className="cursor-dot"  />
      <div ref={ring} className="cursor-ring" />
    </>
  )
}
