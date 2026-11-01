import { Link } from 'react-router-dom'
import { Diya, Lantern } from '../shared/DiwaliArt.jsx'

const LANTERNS = [
  { x: 12, len: 70, s: 0.8 },
  { x: 38, len: 130, s: 0.6 },
  { x: 66, len: 50, s: 0.9 },
  { x: 86, len: 110, s: 0.7 },
]

export default function Events() {
  return (
    <section id="events" style={{ paddingTop: 20 }}>
      <div className="wrap">
        <div className="sh"><div><span className="label">Upcoming</span><h2>On the <span className="it">air</span></h2></div></div>

        <Link className="feature" to="/diwali-bash">
          <div className="poster">
            {LANTERNS.map((l, i) => (
              <div key={i} className="lan" style={{ left: `${l.x}%`, animationDelay: `${-i * 1.4}s` }}>
                <Lantern len={l.len} scale={l.s} glow={18} />
              </div>
            ))}
            <div className="ttl"><span>Event 001 · Fri 06 Nov</span><b>Diwali<br />Bash '26</b></div>
            <div className="drow">
              {Array.from({ length: 7 }, (_, i) => <Diya key={i} simple size={58 - Math.abs(i - 3) * 7} delay={-i * 0.37} />)}
            </div>
          </div>
          <div className="info">
            <span className="tag">Booking open · closes 05 Nov</span>
            <h3>Lights, card tables <span className="it">and good people.</span></h3>
            <p>A whole villa for one night. Diyas, Teen Patti, Bollywood Tambola, sparklers at golden hour and 2000s Bollywood on the speakers.</p>
            <dl>
              <dt>When</dt><dd>Fri 06 Nov · 5 PM till late</dd>
              <dt>Where</dt><dd>Private villa, Lucknow</dd>
              <dt>Pass</dt><dd>₹799 per person</dd>
              <dt>Wear</dt><dd>Ethnic or Indo-Western</dd>
            </dl>
            <div className="go"><span>See the full night & get a pass</span><span className="a">→</span></div>
          </div>
        </Link>

        <div className="later">
          <div className="ghostcard">
            <span className="label">Event 002 · Date to be announced</span>
            <h3>The next one is <span className="it">cooking.</span></h3>
            <p>Members hear about every night before it's announced anywhere else, and get first pick of spots.</p>
            <a className="btn ghost" href="#join">Join the chat →</a>
          </div>
          <div className="ghostcard">
            <span className="label">Open frequency</span>
            <h3>Got an idea for a <span className="it">night?</span></h3>
            <p>A rooftop screening, a sunrise drive, a vinyl evening. The best nights come from members. Pitch yours.</p>
            <a className="btn ghost" href="#pitch">Pitch your idea →</a>
          </div>
        </div>
      </div>
    </section>
  )
}
