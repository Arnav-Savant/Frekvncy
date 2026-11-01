import { useCanvas, wavePath } from '../../hooks.js'
import { COMMUNITY_CHAT_URL, EMAILS } from '../../config.js'

const TICKER = [
  ['Afterhours'], ['House sessions'], ['Find your frequency', 'it'], ['Festival editions'],
  ['Coffee raves'], ['Verse & vinyl'], ['The atelier'], ['Slow sundays'], ['Journeys, soon'],
  ['Same wavelength', 'it'], ['Lucknow'],
]

export function Ticker() {
  // The row is rendered twice so the -50% scroll loops seamlessly.
  const row = (p) => TICKER.flatMap(([t, c], i) => [
    <span key={`${p}t${i}`} className={c || ''}>{t}</span>,
    <span key={`${p}d${i}`} className="dot">●</span>,
  ])
  return (
    <div className="ticker" aria-hidden="true">
      <div>{row('a')}{row('b')}</div>
    </div>
  )
}

function Scope() {
  const ref = useCanvas((x, w, h, f) => {
    const t = f * 0.016
    x.clearRect(0, 0, w, h)
    x.strokeStyle = '#272320'
    x.lineWidth = 1
    for (let i = 1; i < 8; i++) { x.beginPath(); x.moveTo((w * i) / 8, 0); x.lineTo((w * i) / 8, h); x.stroke() }
    for (let i = 1; i < 4; i++) { x.beginPath(); x.moveTo(0, (h * i) / 4); x.lineTo(w, (h * i) / 4); x.stroke() }
    x.beginPath()
    for (let X = 0; X <= w; X += 2) {
      const k = X / w
      const noise = (1 - k) * (Math.sin(X * 0.9 + t * 7) * Math.sin(X * 0.13 + t * 3)) * h * 0.32
      const clean = Math.sin(k * 18 - t * 2) * h * 0.3 * k
      const y = h / 2 + noise + clean
      X ? x.lineTo(X, y) : x.moveTo(X, y)
    }
    const g = x.createLinearGradient(0, 0, w, 0)
    g.addColorStop(0, '#5a524a')
    g.addColorStop(1, '#ff5b2e')
    x.strokeStyle = g
    x.lineWidth = 1.6
    x.stroke()
  })
  return <canvas id="scope" ref={ref} aria-hidden="true" />
}

export function About() {
  return (
    <section id="about">
      <div className="wrap">
        <div className="about">
          <div className="reveal">
            <span className="label">What is frekvncy</span>
            <p className="big" style={{ marginTop: 22 }}>
              Not a club. Not a crowd. <span className="it">A circle.</span>{' '}
              <span className="m">A few good people on the same wavelength, and a reason to leave the house.</span>
            </p>
            <p className="small">
              We host the nights we'd want to go to ourselves: techno rooms, house sessions, festival
              celebrations, coffee raves, art and poetry evenings. Small rooms, people who look out for
              each other, and every member someone we'd happily introduce to a friend.
            </p>
            <div className="stats">
              <div><b>8</b><span className="label">Formats</span></div>
              <div><b>1</b><span className="label">City, for now</span></div>
              <div><b>0</b><span className="label">Randoms</span></div>
            </div>
          </div>
          <div className="scope reveal">
            <div className="row" style={{ margin: '0 0 12px' }}>
              <span className="label">Signal</span><span className="label" style={{ color: '#ff5b2e' }}>● Live</span>
            </div>
            <Scope />
            <div className="row"><span className="label">Strangers</span><span className="label">Same wavelength</span></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Founder() {
  return (
    <section id="founder">
      <div className="wrap">
        <div className="founder">
          <div className="ph reveal">
            <img src="/assets/host-mugdha.jpg" alt="Mugdha Roy, founder of frekvncy" loading="lazy" />
            <span className="cap">FOUNDER</span>
            <svg viewBox="0 0 400 60" preserveAspectRatio="none" aria-hidden="true">
              <path d={wavePath(400, 30, 22, 14)} fill="none" stroke="#ff5b2e" strokeWidth="2" />
            </svg>
          </div>
          <div className="reveal">
            <span className="label">A note from the founder</span>
            <blockquote style={{ marginTop: 22 }}>
              "I kept meeting people in Lucknow who loved a good night but hated the usual scene. frekvncy is
              my answer: <em>fewer people, better people,</em> and nights that feel like they were planned with
              you in mind."
            </blockquote>
            <div className="sig">
              <div><b style={{ fontSize: 18 }}>Mugdha Roy</b><div className="label" style={{ marginTop: 3 }}>Founder, frekvncy</div></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="fgrid">
          <div>
            <a className="logo" href="#top"><span>frek<span className="v">v</span>ncy</span></a>
            <p style={{ marginTop: 14, color: 'var(--mute)', maxWidth: 320 }}>
              A private social circle in Lucknow. Raves, salons, festivals, workshops and soon, journeys.
            </p>
          </div>
          <div>
            <h4>Say hello</h4>
            <ul>
              <li><a href={COMMUNITY_CHAT_URL} target="_blank" rel="noopener noreferrer">Community chat</a></li>
              <li><a href={`mailto:${EMAILS[1]}`}>{EMAILS[1]}</a></li>
            </ul>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>
              <li><a href="#events">Upcoming</a></li>
              <li><a href="#code">The Code</a></li>
              <li><a href="#join">Join</a></li>
            </ul>
          </div>
        </div>
        <div className="huge" aria-hidden="true">frek<span className="v">v</span>ncy</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginTop: 20 }}>
          <span className="label">© 2026 frekvncy · Lucknow</span>
          <span className="label">For people who'd rather stay in</span>
        </div>
      </div>
    </footer>
  )
}
