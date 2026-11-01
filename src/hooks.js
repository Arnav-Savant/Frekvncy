import { useEffect, useRef, useState } from 'react'

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title
  }, [title])
}

// Runs draw(ctx, w, h, t) every frame while the canvas is on screen.
export function useCanvas(draw, deps = []) {
  const ref = useRef(null)
  useEffect(() => {
    const c = ref.current
    if (!c) return
    const x = c.getContext('2d')
    let w = 0, h = 0, t = 0, raf = 0, visible = true
    const reduce = prefersReducedMotion()
    const fit = () => {
      const d = window.devicePixelRatio || 1
      w = c.clientWidth; h = c.clientHeight
      c.width = w * d; c.height = h * d
      x.setTransform(d, 0, 0, d, 0, 0)
    }
    const frame = () => {
      draw(x, w, h, t)
      t += 1
      if (!reduce && visible) raf = requestAnimationFrame(frame)
    }
    fit()
    frame()
    const io = new IntersectionObserver(([e]) => {
      const was = visible
      visible = e.isIntersecting
      if (visible && !was && !reduce) raf = requestAnimationFrame(frame)
    })
    io.observe(c)
    const onResize = () => { fit(); if (reduce) draw(x, w, h, t) }
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('resize', onResize)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
  return ref
}

// Adds .in to every .reveal element under the returned ref once it scrolls into view.
export function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const els = ref.current?.querySelectorAll('.reveal') ?? []
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
      }),
      { threshold: 0.15 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  return ref
}

export function useCountdown(iso) {
  const end = Date.parse(iso)
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])
  const ms = end - now
  if (ms <= 0) return null
  return {
    d: Math.floor(ms / 864e5),
    h: Math.floor(ms / 36e5) % 24,
    m: Math.floor(ms / 6e4) % 60,
    s: Math.floor(ms / 1e3) % 60,
  }
}

export const pad2 = (n) => String(n).padStart(2, '0')

// A gentle sine wave as an SVG path, fading out at both ends.
export function wavePath(width, mid, amp, period, step = 4) {
  let d = `M0 ${mid}`
  for (let X = 0; X <= width; X += step) {
    d += ` L${X} ${(mid + Math.sin(X / period) * Math.sin((X / width) * Math.PI) * amp).toFixed(2)}`
  }
  return d
}
