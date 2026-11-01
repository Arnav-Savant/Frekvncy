import { useRef, useState } from 'react'
import { COMMUNITY_CHAT_URL, waLink } from '../../config.js'
import { prefersReducedMotion, wavePath } from '../../hooks.js'

function MemberCard() {
  const card = useRef(null)
  const move = (e) => {
    if (prefersReducedMotion()) return
    const r = card.current.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    card.current.style.transform = `rotateY(${px * 18}deg) rotateX(${-py * 14}deg)`
    card.current.style.setProperty('--shine', `${50 - px * 100}%`)
  }
  const leave = () => {
    card.current.style.transform = ''
    card.current.style.setProperty('--shine', '100%')
  }
  return (
    <div className="cardstage reveal" onPointerMove={move} onPointerLeave={leave}>
      <div className="mcard" ref={card}>
        <div className="in">
          <div className="row"><div className="wm">frek<span className="v">v</span>ncy</div><div className="chipg" /></div>
          <svg className="w" viewBox="0 0 440 60" preserveAspectRatio="none" aria-hidden="true">
            <path d={wavePath(440, 30, 22, 16)} fill="none" stroke="#ff5b2e" strokeWidth="1.5" />
          </svg>
          <div className="bot">
            <div><span className="label">Member</span><b>Your name here</b></div>
            <div style={{ textAlign: 'right' }}><span className="label">No.</span><b>0001</b></div>
          </div>
        </div>
      </div>
    </div>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm0 18.2a8.2 8.2 0 01-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1112 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 01-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 00-.7.3 3 3 0 00-.9 2.2 5.2 5.2 0 001.1 2.7 11.9 11.9 0 004.6 4c1.7.7 2.4.8 3.2.7a2.8 2.8 0 001.8-1.3 2.3 2.3 0 00.2-1.3c-.1-.1-.3-.2-.5-.3z" />
    </svg>
  )
}

function Pitch() {
  const [name, setName] = useState('')
  const [idea, setIdea] = useState('')
  const [missing, setMissing] = useState(false)
  const nameRef = useRef(null)

  const submit = (e) => {
    e.preventDefault()
    if (!name.trim()) { setMissing(true); nameRef.current.focus(); return }
    const text = `Hey! I'm ${name.trim()} and I've got an idea for frekvncy: ${idea.trim()}`
    window.open(waLink(text), '_blank', 'noopener')
  }

  return (
    <div className="pitch reveal" id="pitch">
      <div>
        <span className="label">Open frequency</span>
        <h3>Pitch us <span className="it">a night.</span></h3>
        <p>A rooftop screening, a sunrise drive, a vinyl evening. Tell us yours. It lands straight in our WhatsApp, already written.</p>
        <form className="form" onSubmit={submit} noValidate>
          <input ref={nameRef} placeholder="Your name" aria-label="Your name" autoComplete="given-name"
            style={{ gridColumn: 'span 2', borderColor: missing && !name.trim() ? '#ff5b2e' : undefined }}
            value={name} onChange={(e) => { setName(e.target.value); setMissing(false) }} />
          <textarea placeholder="Your idea (or leave it blank and finish it in WhatsApp)" aria-label="Your idea"
            value={idea} onChange={(e) => setIdea(e.target.value)} />
          <button className="btn" type="submit">Send on WhatsApp →</button>
        </form>
      </div>
      <div className="phone" aria-hidden="true">
        <div className="ph-top"><span className="av">f</span><div><b>frekvncy hosts</b><span>online</span></div></div>
        <div className="chat">
          <div className="bub">
            <span>
              Hey! I'm {name.trim() || <span className="phd">your name</span>} and I've got an idea for frekvncy:{' '}
              {idea.trim() || <span className="phd">your idea…</span>}
            </span>
            <i>now ✓✓</i>
          </div>
        </div>
        <div className="ph-bar"><span>Message</span><span className="send">➤</span></div>
      </div>
    </div>
  )
}

export default function Join() {
  return (
    <section id="join">
      <div className="wrap">
        <div className="mem">
          <MemberCard />
          <div className="reveal">
            <span className="label">Joining frekvncy</span>
            <h2>Tune <span className="it">in.</span></h2>
            <p className="lobby">The chat is the lobby. <span className="it">The nights are curated.</span></p>
            <ol>
              <li><b>Join the community chat.</b> Announcements, plans and the people behind them, all in one place.</li>
              <li><b>Say hello.</b> Introduce yourself, join the conversations, come to a slow Sunday.</li>
              <li><b>Get the invite.</b> Guest lists are hand-picked for every night, and familiar faces hear first.</li>
            </ol>
            <a className="btn wa" href={COMMUNITY_CHAT_URL} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon />Join the community chat
            </a>
            <p className="fine">Opens WhatsApp. Joining the chat doesn't guarantee a place at every night.</p>
          </div>
        </div>
        <Pitch />
      </div>
    </section>
  )
}
