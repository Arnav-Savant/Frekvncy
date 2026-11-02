import { useEffect, useState } from 'react'
import { Diya, Lantern, Mandala } from '../shared/DiwaliArt.jsx'
import { DIWALI } from '../../config.js'

function useWidth() {
  const [w, setW] = useState(() => window.innerWidth)
  useEffect(() => {
    const on = () => setW(window.innerWidth)
    window.addEventListener('resize', on)
    return () => window.removeEventListener('resize', on)
  }, [])
  return w
}

function Toran({ width }) {
  const count = Math.max(10, Math.round(width / 42))
  return (
    <div className="toran" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => {
        const len = 4 + Math.round(4 * Math.abs(Math.sin(i * 0.7))) + (i % 2)
        return (
          <div key={i} className="ladi" style={{ animationDelay: `${-((i * 1.7) % 5)}s` }}>
            {Array.from({ length: len }, (_, k) => <i key={k} className={(k + i) % 3 === 0 ? 'y' : ''} />)}
            <b />
          </div>
        )
      })}
    </div>
  )
}

const LANTERNS = [
  { x: 9, len: 200, s: 1 },
  { x: 22, len: 280, s: 0.75, hideSm: true },
  { x: 78, len: 250, s: 0.85, hideSm: true },
  { x: 91, len: 190, s: 1 },
]

// A string of bulbs hanging in three shallow loops across the hero.
function FairyLights({ width }) {
  const sag = 60, segs = 3, sw = width / segs
  let d = 'M0 10'
  for (let s = 0; s < segs; s++) d += ` Q ${sw * s + sw / 2} ${10 + sag} ${sw * (s + 1)} 10`
  const n = Math.round(width / 34)
  const cols = ['#ffd36b', '#f2a033', '#fff1c2', '#ff8a5c']
  const bulbs = []
  for (let k = 1; k < n; k++) {
    const u = (k / n) * segs, s = Math.floor(u), t = u - s
    const x0 = sw * s, cx = sw * s + sw / 2, x1 = sw * (s + 1)
    const x = (1 - t) ** 2 * x0 + 2 * (1 - t) * t * cx + t ** 2 * x1
    const y = (1 - t) ** 2 * 10 + 2 * (1 - t) * t * (10 + sag) + t ** 2 * 10
    bulbs.push({ x, y: y + 4, c: cols[k % 4], delay: -((k * 0.37) % 2.4) })
  }
  return (
    <svg className="lights" style={{ top: 150 }} width="100%" height="90" viewBox={`0 0 ${width} 90`} aria-hidden="true">
      <path d={d} stroke="#4a3226" fill="none" />
      {bulbs.map((b, i) => (
        <circle key={i} className="bulb" cx={b.x} cy={b.y} r="3.2" fill={b.c}
          style={{ animationDelay: `${b.delay}s`, filter: `drop-shadow(0 0 5px ${b.c})` }} />
      ))}
    </svg>
  )
}

export default function Hero() {
  const width = useWidth()
  const diyas = width < 600 ? 5 : 9
  return (
    <header className="hero">
      <div className="rope" />
      <Toran width={width} />
      <div className="lanterns" aria-hidden="true">
        {LANTERNS.map((l, i) => (
          <div key={i} className={`lantern${l.hideSm ? ' hide-sm' : ''}`} style={{ left: `${l.x}%`, animationDelay: `${-i * 1.3}s` }}>
            <Lantern len={l.len / l.s} scale={l.s} />
          </div>
        ))}
      </div>
      <FairyLights width={width} />

      <div className="wrap hero-inner">
        <div className="deva" lang="hi">शुभ दीपावली</div>
        <h1>Diwali<br />Bash '26</h1>
        <div className="meta">
          <span className="label" style={{ color: 'var(--gold)' }}>Sat 07 Nov · 5 PM till late</span>
          <span className="label" style={{ color: 'var(--gold)' }}>Private villa · Lucknow</span>
        </div>
        <p className="lede">A whole villa, glowing diyas, loud card tables, 2000s Bollywood and a lot of good people. One night only.</p>
        <div className="cta">
          <a className="btn" href="#pass">Get your pass · ₹{DIWALI.price}</a>
          <a className="btn ghost" href="#program">See the night</a>
        </div>
      </div>

      <Mandala className="rangoli-floor" size={520} r={110} colors={['#c8402a', '#f2a033', '#e8c27a', '#fff1c2']} />
      <div className="diyas">
        {Array.from({ length: diyas }, (_, i) => {
          const mid = (diyas - 1) / 2
          return <Diya key={i} size={Math.round(78 - Math.abs(i - mid) * 7)} delay={-((i * 0.43) % 1.6)} />
        })}
      </div>
    </header>
  )
}
