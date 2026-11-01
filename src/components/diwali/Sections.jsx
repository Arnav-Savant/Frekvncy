import { Link } from 'react-router-dom'
import { Diya, Mandala } from '../shared/DiwaliArt.jsx'
import { EMAILS, HOST_PHONE_DISPLAY, waLink } from '../../config.js'

const G = { fill: 'none', stroke: '#e8c27a', strokeWidth: 1.5 }

export function Bar() {
  return (
    <div className="bar">
      <div className="wrap">
        <Link className="brand" to="/">← frek<span style={{ color: '#ff5b2e' }}>v</span>ncy</Link>
        <span className="deadline">Registration closes Thu 05 Nov</span>
        <a className="btn sm" href="#pass">Get a pass</a>
      </div>
    </div>
  )
}

const FACTS = [
  { k: 'When', b: 'Sat 07 Nov', p: '5 PM till late', icon: <svg width="30" height="30" viewBox="0 0 30 30" {...G}><rect x="4" y="6" width="22" height="20" rx="2" /><path d="M4 12h22M10 3v6M20 3v6" /></svg> },
  { k: 'Where', b: 'Private villa', p: 'Lucknow, shared on confirmation', icon: <svg width="30" height="30" viewBox="0 0 30 30" {...G}><path d="M5 27V13l10-8 10 8v14z" /><path d="M12 27v-7a3 3 0 016 0v7" /></svg> },
  { k: 'Pass', b: '₹799', p: 'Per person, all in', icon: <svg width="30" height="30" viewBox="0 0 30 30" {...G}><path d="M4 9h22v4a2 2 0 000 4v4H4v-4a2 2 0 000-4z" /><path d="M18 9v12" strokeDasharray="2 2" /></svg> },
  { k: 'Wear', b: 'Ethnic', p: 'Or Indo-Western', icon: <svg width="30" height="30" viewBox="0 0 30 30" {...G}><path d="M11 4l4 3 4-3 6 4-3 5-2-1v14H10V12l-2 1-3-5z" /></svg> },
  { k: 'Drinks', b: 'BYOB', p: 'Mixers on us', icon: <svg width="30" height="30" viewBox="0 0 30 30" {...G}><path d="M9 4h12l-2 11a4 4 0 01-8 0z" /><path d="M15 19v7M10 26h10" /></svg> },
  { k: 'Book by', b: 'Thu 05 Nov', p: 'Limited spots', hi: true, icon: <svg width="30" height="30" viewBox="0 0 30 30" {...G} stroke="#f2a033"><circle cx="15" cy="16" r="10" /><path d="M15 10v6l4 3" /></svg> },
]

export function Facts() {
  return (
    <div className="facts-wrap">
      <div className="wrap" style={{ padding: 0 }}>
        <div className="facts">
          {FACTS.map((f) => (
            <div key={f.k} className="fact">
              {f.icon}
              <span className="label">{f.k}</span>
              <b style={f.hi ? { color: 'var(--marigold)' } : undefined}>{f.b}</b>
              <p>{f.p}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function Host() {
  return (
    <section id="host">
      <div className="wrap">
        <div className="host">
          <div className="arch">
            <img src="/assets/host-mugdha.jpg" alt="Mugdha Roy, host of Diwali Bash '26" />
            <Mandala className="corner" size={110} r={46} colors={['#c8402a', '#f2a033', '#4d7a3f', '#e8c27a']} />
          </div>
          <div>
            <span className="label">A note from the host</span>
            <blockquote style={{ marginTop: 20 }}>
              Diwali feels warmest when you're surrounded by new connections, your favourite people, good food
              and fairy lights. So I'm opening up a villa and inviting you in.
            </blockquote>
            <p className="sign">Mugdha Roy · Founder, frekvncy</p>
          </div>
        </div>
      </div>
    </section>
  )
}

const ICON = { width: 52, height: 52, viewBox: '0 0 52 52', ...G }

const PROGRAM = [
  {
    t: 'Chaotic Good Teen Patti', d: "Blind plays, dramatic bluffs and Muflis rounds. Bring a poker face, or just beginner's luck.",
    icon: <svg {...ICON}><rect x="8" y="10" width="20" height="30" rx="2" transform="rotate(-12 18 25)" /><rect x="22" y="10" width="20" height="30" rx="2" transform="rotate(10 32 25)" fill="#1d1013" /><path d="M32 20l3 5-3 5-3-5z" fill="#c8402a" stroke="none" /></svg>,
  },
  {
    t: 'Plot-Twist Bollywood Tambola', d: "Not your auntie's Tambola. Music cues, spicy dares for bogeys and bragging rights.",
    icon: <svg {...ICON}><rect x="6" y="14" width="40" height="24" rx="2" /><path d="M6 22h40M6 30h40M16 14v24M26 14v24M36 14v24" /><circle cx="21" cy="18" r="2.5" fill="#f2a033" stroke="none" /><circle cx="41" cy="34" r="2.5" fill="#f2a033" stroke="none" /></svg>,
  },
  {
    t: 'Rapid-Fire Diya Relay', d: 'Light the most terracotta diyas before the clock, or the breeze, beats you.',
    icon: <svg {...ICON}><path d="M8 32h36c-2 8-9 12-18 12S10 40 8 32z" /><path d="M38 32l6-3" /><path d="M26 30c-5-4-3-10 0-16 3 6 5 12 0 16z" fill="#f2a033" stroke="none" /></svg>,
  },
  {
    t: 'Charades & Antakshari', d: '2000s Bollywood bangers, overacting, and losing our voices under the fairy lights.',
    icon: <svg {...ICON}><rect x="20" y="6" width="12" height="22" rx="6" /><path d="M14 24a12 12 0 0024 0M26 36v8M18 44h16" /><path d="M42 10q4 4 0 8M46 6q7 8 0 16" stroke="#f2a033" /></svg>,
  },
  {
    t: 'Uno No-Mercy & Chill Lounge', d: 'Floor cushions, Draw-4 betrayals and deep 1 AM conversations when you need a break.',
    icon: <svg {...ICON}><rect x="12" y="8" width="24" height="34" rx="3" /><ellipse cx="24" cy="25" rx="8" ry="12" transform="rotate(25 24 25)" stroke="#c8402a" /><text x="19" y="30" fontFamily="Archivo" fontWeight="900" fontSize="12" fill="#f2a033" stroke="none">+4</text></svg>,
  },
  {
    t: 'Night Ethnic Photoshoot', d: 'A proper photo corner after dark, lit with diyas and fairy lights. Leave with pictures worth posting.',
    icon: <svg {...ICON}><rect x="6" y="16" width="40" height="26" rx="3" /><path d="M18 16l3-6h10l3 6" /><circle cx="26" cy="29" r="7" /><circle cx="26" cy="29" r="2.5" fill="#f2a033" stroke="none" /></svg>,
  },
]

export function Program() {
  return (
    <section id="program" style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%,#24101488,transparent)' }}>
      <div className="wrap">
        <div className="head">
          <span className="label">What's going down</span>
          <h2>The night</h2>
          <svg className="orn" width="180" height="20" viewBox="0 0 180 20" aria-hidden="true">
            <path d="M0 10h70M110 10h70" stroke="#5a3a30" /><path d="M90 2l8 8-8 8-8-8z" fill="#f2a033" />
            <circle cx="76" cy="10" r="2" fill="#e8c27a" /><circle cx="104" cy="10" r="2" fill="#e8c27a" />
          </svg>
        </div>
        <div className="grid">
          <div className="act wide">
            <svg width="92" height="92" viewBox="0 0 64 64" fill="none" stroke="#f2a033" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
              <path d="M14 54L40 22" /><path d="M40 22l3-4M44 25l4-2M38 17l1-5M46 18l5-3M36 14l-2-4M48 22l5 1" stroke="#ffd36b" />
              <circle cx="44" cy="18" r="2" fill="#fff1c2" stroke="none" />
            </svg>
            <div>
              <span className="n">01</span>
              <h3>Phooljhadi & Fit-Check Hour</h3>
              <p>Sparkler trails at golden hour, warm light and candid photos, so your Diwali outfit gets the attention it deserves.</p>
            </div>
          </div>
          {PROGRAM.map((a, i) => (
            <div key={a.t} className="act">
              <span className="n">{String(i + 2).padStart(2, '0')}</span>
              {a.icon}
              <h3>{a.t}</h3>
              <p>{a.d}</p>
            </div>
          ))}
        </div>
        <div className="music"><span className="label">On the speakers</span><span className="tag">♪ 2000s Bollywood</span><span className="tag">♪ House</span></div>
      </div>
    </section>
  )
}

export function Details() {
  return (
    <section id="details" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="two">
          <div className="box">
            <h3>
              <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true"><path d="M11 3c-3 3-3 6 0 8 3-2 3-5 0-8z" fill="#f2a033" /><path d="M3 13h16c-1 4-4 6-8 6s-7-2-8-6z" fill="none" stroke="#e8c27a" strokeWidth="1.4" /></svg>
              What your pass covers
            </h3>
            <ul>
              <li>Full feast and snacks through the night</li>
              <li>Mixers for your BYOB</li>
              <li>Welcome shots, or Red Bull and soft drinks if you don't drink</li>
              <li>The whole villa and every activity</li>
              <li>Firecrackers available on the night, at extra cost</li>
            </ul>
          </div>
          <div className="box rules">
            <h3>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="#c8402a" strokeWidth="1.5" aria-hidden="true"><path d="M11 2l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V5z" /></svg>
              House rules
            </h3>
            <ul>
              <li>Respect everyone's boundaries. Anyone making others uncomfortable leaves, no exceptions.</li>
              <li>Confirmed guests only.</li>
              <li>Drink responsibly and get home safe.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer>
      <div className="diyas" style={{ position: 'relative', paddingBottom: 0 }}>
        {Array.from({ length: 5 }, (_, i) => <Diya key={i} size={46} delay={-((i * 0.43) % 1.6)} />)}
      </div>
      <div className="wrap" style={{ marginTop: 48 }}>
        <span className="label">Questions</span>
        <p style={{ marginTop: 10 }}>
          WhatsApp <a href={waLink()} target="_blank" rel="noopener noreferrer">{HOST_PHONE_DISPLAY}</a>
          {EMAILS.map((e) => <span key={e}> · <a href={`mailto:${e}`}>{e}</a></span>)}
        </p>
        <div className="big">frekvncy</div>
        <span className="label">Hosted by Mugdha Roy · Lucknow · Diwali 2026</span>
      </div>
    </footer>
  )
}
