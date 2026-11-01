import { useEffect, useRef, useState } from 'react'
import { useCanvas, useCountdown, pad2 } from '../../hooks.js'
import { DIWALI } from '../../config.js'

export function Nav() {
  const [solid, setSolid] = useState(false)
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <nav className={solid ? 'solid' : ''}>
      <div className="wrap">
        <a className="logo" href="#top"><span>frek<span className="v">v</span>ncy</span></a>
        <ul>
          <li><a href="#about">About</a></li>
          <li><a href="#nights">Formats</a></li>
          <li><a href="#events">Events</a></li>
          <li><a href="#code">The Code</a></li>
        </ul>
        <a className="btn" href="#join" style={{ padding: '10px 18px', fontSize: 14 }}>Join the circle</a>
      </div>
    </nav>
  )
}

function Waves() {
  const mx = useRef(0.5)
  useEffect(() => {
    const on = (e) => { mx.current = e.clientX / window.innerWidth }
    window.addEventListener('pointermove', on)
    return () => window.removeEventListener('pointermove', on)
  }, [])
  const ref = useCanvas((x, w, h, f) => {
    const t = f * 0.012
    const lines = 28
    x.clearRect(0, 0, w, h)
    for (let i = 0; i < lines; i++) {
      const p = i / (lines - 1)
      const base = h * 0.42 + (p - 0.5) * h * 0.5
      const amp = 8 + Math.sin(p * Math.PI) * (26 + mx.current * 40)
      x.beginPath()
      for (let X = 0; X <= w; X += 6) {
        const k = X / w
        const env = Math.sin(k * Math.PI)
        const y = base + Math.sin(k * (9 + p * 4) + t * (0.6 + p * 0.4) + i * 0.35) * amp * env
        X ? x.lineTo(X, y) : x.moveTo(X, y)
      }
      const hi = Math.abs(p - 0.5) < 0.02
      x.strokeStyle = hi ? 'rgba(255,91,46,.85)' : `rgba(239,232,220,${0.04 + Math.sin(p * Math.PI) * 0.1})`
      x.lineWidth = hi ? 1.6 : 1
      x.stroke()
    }
  })
  return <canvas id="waves" ref={ref} aria-hidden="true" />
}

function OnAir() {
  const cd = useCountdown(DIWALI.startsAt)
  return (
    <a className="onair" href="#events">
      <span className="k"><i />{cd ? 'Next on air' : 'On air now'}</span>
      <b>Diwali Bash '26</b>
      {cd && <span className="cd">{`${pad2(cd.d)}d ${pad2(cd.h)}h ${pad2(cd.m)}m ${pad2(cd.s)}s`}</span>}
      <span className="go">→</span>
    </a>
  )
}

export default function Hero() {
  return (
    <header className="hero" id="top">
      <Waves />
      <div className="hero-top">
        <div className="wrap">
          <span className="live"><i />Now broadcasting · Lucknow</span>
          <OnAir />
        </div>
      </div>
      <div className="lockup">
        <div className="tag">Find your <em>frequency.</em></div>
        <h1 className="wordmark" aria-label="frekvncy">frek<span className="v">v</span>ncy</h1>
        <div className="dict">
          <div className="head">
            <span className="hw">frek·vn·cy</span>
            <span className="pron">/ˈfriː·kwən·si/</span>
            <span className="pos">noun</span>
          </div>
          <p>A private social circle in Lucknow for people on the same wavelength, and the nights that bring them together.</p>
          <div className="ex">"Skipped the club. Found my frekvncy."</div>
        </div>
      </div>
      <div />
    </header>
  )
}
