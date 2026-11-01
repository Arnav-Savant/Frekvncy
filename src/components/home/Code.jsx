import { useEffect, useState } from 'react'
import { prefersReducedMotion } from '../../hooks.js'

const PRINCIPLES = [
  {
    r: 'i', title: 'Warmth over status',
    big: <>No velvet ropes. <em>No one to impress.</em></>,
    body: "We don't care what you drive or who you know. We measure a night by how many strangers leave as friends.",
    chips: ['Introduce yourself', 'Include the quiet ones', 'Leave the ego at the door'],
  },
  {
    r: 'ii', title: 'Open minds, intimate rooms',
    big: <>Every kind of person. <em>Never too many of them.</em></>,
    body: 'Come as you are and think what you like. We keep rooms small on purpose, because openness only survives where everyone feels seen.',
    chips: ['Curated guest lists', "No plus-ones we haven't met"],
  },
  {
    r: 'iii', title: 'Consent is the baseline',
    big: <>Ask first. <em>Respect the answer.</em></>,
    body: "Personal space, photos, drinks, dancing: nothing happens without a yes. Cross a line and you're asked to leave that night. There are no second chances.",
    chips: ['Zero tolerance', 'Hosts on watch all night'],
  },
  {
    r: 'iv', title: 'Everyone home safe',
    big: <>The night ends when <em>everyone</em> is home.</>,
    body: 'Drink at your own pace and nobody pushes you into anything. We help sort rides, check in on each other, and never leave anyone behind.',
    chips: ['Ride check-ins', 'Sober-friendly menus'],
  },
]

export default function Code() {
  const [cur, setCur] = useState(0)

  // Auto-advance every 7s; picking a tab restarts the clock.
  useEffect(() => {
    if (prefersReducedMotion()) return
    const id = setTimeout(() => setCur((c) => (c + 1) % PRINCIPLES.length), 7000)
    return () => clearTimeout(id)
  }, [cur])

  return (
    <section id="code" className="code">
      <div className="wrap">
        <div className="sh">
          <div><span className="label">The frekvncy code</span><h2>Four things we<br /><span className="it">never</span> compromise on</h2></div>
          <p style={{ maxWidth: 340, color: '#b9afa3' }}>Every member agrees to these before their first night. They're the reason the room feels the way it does.</p>
        </div>
        <div className="codegrid">
          <ul className="tabs" role="tablist">
            {PRINCIPLES.map((p, i) => (
              <li key={p.r} role="tab" tabIndex={0} aria-selected={cur === i} className={cur === i ? 'on' : ''}
                onClick={() => setCur(i)} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), setCur(i))}>
                <span className="r">{p.r}.</span><b>{p.title}</b>
                {/* keyed by cur so the progress bar restarts on every change */}
                <span className="bar" key={cur === i ? `on${cur}` : 'off'} />
              </li>
            ))}
          </ul>
          <div className="panel" role="tabpanel">
            <div className="numeral" aria-hidden="true">{PRINCIPLES[cur].r}</div>
            {PRINCIPLES.map((p, i) => (
              <div key={p.r} className={`pane${cur === i ? ' on' : ''}`} aria-hidden={cur !== i}>
                <div className="big">{p.big}</div>
                <p>{p.body}</p>
                <div className="foot">{p.chips.map((c) => <span key={c} className="chip">{c}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
