import { useRef, useState } from 'react'

const S = { fill: 'none', stroke: '#efe8dc', strokeWidth: 1.2 }

const FORMATS = [
  {
    c: '#ff5b2e', bg: '#0f0b0a', glow: '#ff5b2e33',
    a: 'After', b: 'hours', kick: 'Techno · After dark',
    desc: 'A blacked-out room, a serious sound system and a floor that belongs entirely to the music. Phones stay in pockets.',
    meta: ['Late, till later', 'Hypnotic', 'DJ sets'],
    art: (
      <svg viewBox="0 0 300 300" {...S}>
        <rect x="80" y="30" width="140" height="240" rx="6" />
        <circle cx="150" cy="190" r="52" /><circle cx="150" cy="190" r="34" stroke="#ff5b2e" />
        <circle cx="150" cy="190" r="10" fill="#ff5b2e" stroke="none" />
        <circle cx="150" cy="86" r="26" /><circle cx="150" cy="86" r="8" fill="#efe8dc" stroke="none" />
        <g stroke="#ff5b2e" opacity=".7"><path d="M150 190 L20 40" className="float" /><path d="M150 190 L290 60" /><path d="M150 190 L10 150" /></g>
      </svg>
    ),
  },
  {
    c: '#e9b872', bg: '#14100c', glow: '#e9b87233',
    a: 'House', b: 'sessions', kick: 'House · Intimate',
    desc: 'Salon-sized parties in beautiful homes. A short guest list, a long playlist, and a kitchen that becomes the dance floor by midnight.',
    meta: ['Evening on', 'Warm, loud', 'Hosted at home'],
    art: (
      <svg viewBox="0 0 300 300" {...S}>
        <path d="M40 270V130L150 50l110 80v140z" /><rect x="125" y="190" width="50" height="80" />
        <rect x="70" y="160" width="34" height="34" /><rect x="196" y="160" width="34" height="34" fill="#e9b87233" stroke="#e9b872" />
        <path d="M10 70 Q80 110 150 70 T290 70" stroke="#6a5f55" />
        <g fill="#e9b872" stroke="none">
          {[[30, 81], [70, 92], [110, 86], [190, 86], [230, 92], [270, 81]].map(([cx, cy]) => <circle key={cx} cx={cx} cy={cy} r="4" />)}
        </g>
      </svg>
    ),
  },
  {
    c: '#f2a033', bg: '#1a0c0c', glow: '#f2a03344',
    a: 'Festival', b: 'editions', kick: 'Seasonal · Diwali is live',
    desc: "Diwali, Holi, New Year's Eve. The calendar's biggest days, celebrated the way they deserve, with people who feel like family.",
    meta: ['All evening', 'Golden', 'Villa takeovers'],
    link: { href: '#events', label: "Diwali Bash '26 is live →" },
    art: (
      <svg viewBox="0 0 300 300" {...S}>
        <circle cx="150" cy="170" r="120" fill="#f2a03314" stroke="none" />
        <path d="M40 180h220c-10 55-60 80-110 80S50 235 40 180z" /><path d="M40 180 Q150 210 260 180" />
        <g className="float">
          <path d="M150 160c-30-25-20-70 0-120 20 50 30 95 0 120z" fill="#f2a033" stroke="none" />
          <path d="M150 150c-12-12-10-35 0-60 10 25 12 48 0 60z" fill="#fff1c2" stroke="none" />
        </g>
        <path d="M80 230 q14-12 28 0 q14 12 28 0 q14-12 28 0 q14 12 28 0" stroke="#f2a033" />
      </svg>
    ),
  },
  {
    c: '#e6cfa6', bg: '#1b120d', glow: '#b0703a40',
    a: 'Coffee', b: 'raves', kick: 'Daybreak · Alcohol-free',
    desc: 'Specialty pour-overs, a DJ before noon, and a dance floor that runs on caffeine alone. The cleanest high in the city.',
    meta: ['Morning', 'Bright, sober', 'Café takeover'],
    art: (
      <svg viewBox="0 0 300 300" {...S}>
        <path d="M70 140h140v60a60 60 0 01-60 60h-20a60 60 0 01-60-60z" />
        <path d="M210 160h16a24 24 0 010 48h-20" /><ellipse cx="140" cy="140" rx="70" ry="10" fill="#6b3f22" stroke="#e6cfa6" />
        <path d="M40 270h200" />
        <g stroke="#e6cfa6" className="steam">
          <path d="M100 120 Q90 100 100 80 T100 40" /><path d="M140 120 Q130 95 145 70 T140 20" /><path d="M180 120 Q170 100 180 80 T180 40" />
        </g>
      </svg>
    ),
  },
  {
    c: '#d98a6a', bg: '#13140f', glow: '#7d8a5a40',
    a: 'The', b: 'atelier', kick: 'Art · Hands-on',
    desc: 'Guided sessions in painting, clay and print-making, led by local artists. No talent required, only curiosity and a willingness to get paint on your sleeves.',
    meta: ['Afternoon', 'Unhurried', 'Workshop'],
    art: (
      <svg viewBox="0 0 300 300" {...S}>
        <path d="M150 40L80 280M150 40l70 240M150 40v30" /><rect x="70" y="70" width="160" height="120" fill="#1d1f17" />
        <circle cx="125" cy="125" r="28" fill="#d98a6a" stroke="none" opacity=".85" />
        <path d="M90 175 Q140 120 210 160" stroke="#9aa86d" strokeWidth="3" />
        <path d="M175 95 l25 25" stroke="#e6cfa6" strokeWidth="2" />
        <g className="float"><path d="M250 150 L210 230" strokeWidth="3" /><path d="M210 230 l-6 18 14-12z" fill="#d98a6a" stroke="none" /></g>
      </svg>
    ),
  },
  {
    c: '#c9b8f0', bg: '#0e1018', glow: '#5a4a9040',
    a: 'Verse', b: '& vinyl', kick: 'Poetry · Open mic',
    desc: "Candlelit evenings of spoken word in Hindi, Urdu and English, with records spinning between readings. Lucknow's old love for shayari, rewritten for now.",
    meta: ['Evening', 'Candlelit', 'Readings, open mic'],
    art: (
      <svg viewBox="0 0 300 300" {...S}>
        <g className="spin">
          <circle cx="140" cy="160" r="110" fill="#0a0a0f" />
          {[90, 70, 50].map((r) => <circle key={r} cx="140" cy="160" r={r} stroke="#2a2a35" />)}
          <circle cx="140" cy="160" r="26" fill="#c9b8f0" stroke="none" /><circle cx="140" cy="160" r="3" fill="#0a0a0f" stroke="none" />
          <path d="M60 110 Q80 90 100 85" stroke="#ffffff30" />
        </g>
        <path d="M270 30 C230 60 210 110 205 160 L215 158 C225 110 250 70 280 40z" fill="#efe8dc22" /><path d="M270 30 L208 180" />
      </svg>
    ),
  },
  {
    c: '#9cc3b4', bg: '#0d1312', glow: '#3f6b5a40',
    a: 'Slow', b: 'sundays', kick: 'Meetups · Daytime',
    desc: 'Kulhad chai by the Gomti, board games, and heritage walks through old Lucknow. Low effort, high return.',
    meta: ['Sunday', 'Easy', 'Walks & tables'],
    art: (
      <svg viewBox="0 0 300 300" {...S}>
        <circle cx="220" cy="80" r="34" stroke="#9cc3b4" />
        <path d="M20 200 Q90 180 150 200 T290 200" stroke="#9cc3b4" opacity=".6" />
        <path d="M20 220 Q90 200 150 220 T290 220" stroke="#9cc3b4" opacity=".35" />
        <path d="M70 120h50l-6 60h-38zM150 120h50l-6 60h-38z" />
        <g className="steam" stroke="#9cc3b4"><path d="M95 110 q-8-14 0-28" /><path d="M175 110 q-8-14 0-28" /></g>
      </svg>
    ),
  },
  {
    c: '#8fb4e0', bg: '#0c1016', glow: '#2f4f7a40',
    a: 'The', b: 'journeys', vt: 'Journeys', kick: 'Travel', soon: true,
    desc: 'The same circle, further from home. Mountain weekends, coastal escapes and long scenic drives. The first itinerary is being drawn up.',
    meta: ['Weekends', 'Wanderlust', 'Small-group trips'],
    art: (
      <svg viewBox="0 0 300 300" {...S}>
        <path d="M10 250 L90 120 L140 190 L190 110 L290 250z" /><path d="M90 120 l-18 30 18-8 14 10" stroke="#8fb4e0" />
        <circle cx="230" cy="70" r="22" stroke="#8fb4e0" />
        <path d="M10 270 h280" strokeDasharray="4 6" />
        <g className="float"><path d="M40 60 l40 10 l-40 10 l8-10z" fill="#8fb4e0" stroke="none" /></g>
      </svg>
    ),
  },
]

const META_LABELS = ['Hours', 'Mood', 'Format']

export default function Repertoire() {
  const [open, setOpen] = useState(0)
  const timer = useRef(0)
  const hoverable = typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches
  const refs = useRef([])

  const onKey = (e) => {
    const n = FORMATS.length
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); refs.current[(open + 1) % n]?.focus() }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); refs.current[(open - 1 + n) % n]?.focus() }
  }

  return (
    <section id="nights" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="sh">
          <div><span className="label">The repertoire</span><h2>Eight formats.<br />One <span className="it">frequency.</span></h2></div>
          <p style={{ maxWidth: 340, color: '#b9afa3' }}>
            From blacked-out techno rooms to candlelit poetry and sober sunrise raves. Every format is small, hosted and members first.
          </p>
        </div>

        <div className="rep" onKeyDown={onKey}>
          {FORMATS.map((f, i) => (
            <article
              key={f.b}
              ref={(el) => { refs.current[i] = el }}
              className={`pn${open === i ? ' on' : ''}`}
              tabIndex={0}
              aria-expanded={open === i}
              style={{ '--c': f.c, '--bg': f.bg, '--glow': f.glow }}
              onClick={() => setOpen(i)}
              onFocus={() => setOpen(i)}
              onMouseEnter={hoverable ? () => { clearTimeout(timer.current); timer.current = setTimeout(() => setOpen(i), 120) } : undefined}
              onMouseLeave={hoverable ? () => clearTimeout(timer.current) : undefined}
            >
              <div className="pn-col" aria-hidden={open === i}>
                <span className="no">{String(i + 1).padStart(2, '0')}</span>
                <span className="vt">{f.vt ? <span className="it">{f.vt}</span> : <>{f.a} <span className="it">{f.b}</span></>}</span>
                <i className="dot" />
              </div>
              <div className="pn-body">
                <div className="pn-art" aria-hidden="true">{f.art}</div>
                <div className="pn-txt">
                  <span className="kick">{f.kick}{f.soon && <> · <span className="soon">Coming soon</span></>}</span>
                  <h3>{f.a}<span className="it">{f.b}</span></h3>
                  <p>{f.desc}</p>
                  <dl className="meta">
                    {f.meta.map((m, k) => <div key={k}><dt>{META_LABELS[k]}</dt><dd>{m}</dd></div>)}
                  </dl>
                  {f.link && <a className="pn-link" href={f.link.href}>{f.link.label}</a>}
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="rep-foot">
          <span className="hint">{hoverable ? 'Hover or tap a panel to open it' : 'Tap a panel to open it'}</span>
          <div className="pips">{FORMATS.map((f, i) => <i key={f.b} className={open === i ? 'on' : ''} />)}</div>
        </div>
      </div>
    </section>
  )
}
