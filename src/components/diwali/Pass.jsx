import { useMemo, useRef, useState } from 'react'
import qrcode from 'qrcode-generator'
import { Mandala } from '../shared/DiwaliArt.jsx'
import { DIWALI, HOST_PHONE_DISPLAY, waLink } from '../../config.js'

const ENERGIES = ['Winning Teen Patti', 'Fit check & sparklers', 'Cozy vibes & music', 'BYOB & pure chaos']
const inr = (n) => n.toLocaleString('en-IN')

const upiUrl = (amount) =>
  `upi://pay?pa=${DIWALI.upiId}&pn=${encodeURIComponent(DIWALI.payee)}&am=${amount}.00&cu=INR&tn=${encodeURIComponent('Diwali Bash 26')}`

// QR for the exact total. Returns null if generation fails, so the UPI ID is shown on its own
// rather than a code for the wrong amount.
function useUpiQr(amount) {
  return useMemo(() => {
    try {
      const qr = qrcode(0, 'M')
      qr.addData(upiUrl(amount))
      qr.make()
      return qr.createDataURL(6, 2)
    } catch {
      return null
    }
  }, [amount])
}

const isPhone = () => window.matchMedia('(pointer: coarse)').matches

export default function Pass() {
  const [n, setN] = useState(1)
  // draft holds what's typed (may be empty mid-edit); n is always a valid 1..max count.
  const [draft, setDraft] = useState('1')
  const setPasses = (k) => {
    const v = Math.min(DIWALI.maxPasses, Math.max(1, k))
    setN(v)
    setDraft(String(v))
  }
  const typePasses = (raw) => {
    const digits = raw.replace(/\D/g, '').slice(-1)
    setDraft(digits)
    if (digits) setPasses(Number(digits))
  }
  const [form, setForm] = useState({ name: '', phone: '', email: '' })
  const [energy, setEnergy] = useState('')
  const [shot, setShot] = useState(null)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const [copied, setCopied] = useState(false)
  const nameRef = useRef(null)
  const phoneRef = useRef(null)

  const amount = n * DIWALI.price
  const qr = useUpiQr(amount)
  const phoneDevice = useMemo(isPhone, [])

  const set = (k) => (e) => { setForm((f) => ({ ...f, [k]: e.target.value })); setErrors((x) => ({ ...x, [k]: false })) }

  const copyUpi = async () => {
    try { await navigator.clipboard.writeText(DIWALI.upiId); setCopied(true); setTimeout(() => setCopied(false), 1800) } catch { /* clipboard blocked */ }
  }

  const message = () => {
    const lines = [
      `Hey Mugdha! I've just paid ₹${inr(amount)} for ${n} ${n > 1 ? 'passes' : 'pass'} to the Diwali Bash on Sat 7 Nov 🪔`,
      '',
      `Name: ${form.name.trim()}`,
      `Phone: ${form.phone.trim()}`,
    ]
    if (form.email.trim()) lines.push(`Email: ${form.email.trim()}`)
    if (energy) lines.push(`Main energy: ${energy}`)
    lines.push('', 'Attaching my payment screenshot here.')
    return lines.join('\n')
  }

  const submit = (e) => {
    e.preventDefault()
    const digits = form.phone.replace(/\D/g, '')
    const errs = { name: !form.name.trim(), phone: digits.length < 10 }
    setErrors(errs)
    if (errs.name) return nameRef.current.focus()
    if (errs.phone) return phoneRef.current.focus()
    window.open(waLink(message()), '_blank', 'noopener')
    setSent(true)
  }

  const canShareShot = shot && navigator.canShare?.({ files: [shot] })
  const shareShot = () => navigator.share({ files: [shot], text: message() }).catch(() => {})

  return (
    <section id="pass" style={{ paddingTop: 20 }}>
      <div className="wrap">
        <div className="ticket">
          <div className="t-head">
            <Mandala className="mandala" size={300} r={110} colors={['#ffe1b0', '#fff4dc', '#ffe1b0', '#fff4dc']} />
            <span className="label">Admit one · Diwali Bash '26 · Sat 07 Nov</span>
            <h2 style={{ marginTop: 8 }}>Get your pass</h2>
            <span className="label" style={{ display: 'block', marginTop: 10 }}>Closes Fri 06 Nov</span>
          </div>
          <div className="perf" />
          <div className="t-body">
            <div className="steps">
              <div className="step">
                <span className="label">Step 1</span>
                <h3>How many of you?</h3>
                <div className="stepper">
                  <button type="button" aria-label="One less pass" disabled={n <= 1} onClick={() => setPasses(n - 1)}>−</button>
                  <input type="number" inputMode="numeric" min="1" max={DIWALI.maxPasses} aria-label="Number of passes"
                    value={draft} onChange={(e) => typePasses(e.target.value)} onBlur={() => setDraft(String(n))}
                    onFocus={(e) => e.target.select()} />
                  <button type="button" aria-label="One more pass" disabled={n >= DIWALI.maxPasses} onClick={() => setPasses(n + 1)}>+</button>
                </div>
                <span className="cap-note">Up to {DIWALI.maxPasses} passes per booking</span>
                <div className="total">₹{inr(amount)}</div>
                <span className="label">{n} {n > 1 ? 'passes' : 'pass'} × ₹{DIWALI.price}</span>
              </div>

              <div className="step">
                <span className="label">Step 2</span>
                <h3>Pay with any UPI app</h3>
                <div className="qr">
                  {qr && <img src={qr} alt={`UPI QR code to pay ₹${inr(amount)} to ${DIWALI.payee}`} />}
                  <div style={{ fontSize: 14 }}>
                    Scan to pay <b>₹{inr(amount)}</b>.
                    <div className="upi">
                      {DIWALI.upiId}
                      <button type="button" className="copy" onClick={copyUpi}>{copied ? 'Copied' : 'Copy'}</button>
                    </div>
                    <div style={{ color: '#7a6452', fontSize: 13 }}>Payee: {DIWALI.payee}</div>
                  </div>
                </div>
                {phoneDevice
                  ? <a className="btn" href={upiUrl(amount)}>Pay ₹{inr(amount)} in UPI app</a>
                  : <p className="hint">On a laptop? Scan the code with your phone's UPI app.</p>}
              </div>

              <form className="step" onSubmit={submit} noValidate>
                <span className="label">Step 3</span>
                <h3>Send us your details</h3>
                <input ref={nameRef} placeholder="Full name" aria-label="Full name" autoComplete="name"
                  className={errors.name ? 'bad' : ''} value={form.name} onChange={set('name')} />
                <input ref={phoneRef} type="tel" inputMode="tel" placeholder="Phone (WhatsApp)" aria-label="Phone" autoComplete="tel"
                  className={errors.phone ? 'bad' : ''} value={form.phone} onChange={set('phone')} />
                <input type="email" placeholder="Email (optional)" aria-label="Email" autoComplete="email" value={form.email} onChange={set('email')} />
                <span className="label" style={{ display: 'block', marginTop: 6 }}>Your main energy (optional)</span>
                <div className="energy">
                  {ENERGIES.map((en) => (
                    <button key={en} type="button" aria-pressed={energy === en} className={energy === en ? 'on' : ''}
                      onClick={() => setEnergy(energy === en ? '' : en)}>{en}</button>
                  ))}
                </div>
                <label className="upload">
                  <input type="file" accept="image/*" hidden onChange={(e) => setShot(e.target.files?.[0] ?? null)} />
                  {shot ? `✓ ${shot.name}` : '＋ Attach payment screenshot'}
                </label>
                {(errors.name || errors.phone) && <p className="err">Add your name and a 10-digit WhatsApp number.</p>}
                <button className="btn" type="submit">Send on WhatsApp</button>
              </form>
            </div>

            {sent ? (
              <div className="next done" role="status">
                <svg width="26" height="26" viewBox="0 0 22 22" style={{ flex: 'none' }} aria-hidden="true"><path d="M11 3c-3 3-3 6 0 8 3-2 3-5 0-8z" fill="#c8402a" /><path d="M3 13h16c-1 4-4 6-8 6s-7-2-8-6z" fill="none" stroke="#2a1206" strokeWidth="1.4" /></svg>
                <div>
                  <p><b>Last step:</b> your details are written in WhatsApp. Attach your payment screenshot in the chat with Mugdha ({HOST_PHONE_DISPLAY}) and hit send.</p>
                  {canShareShot && <button type="button" className="btn share" onClick={shareShot}>Share screenshot to WhatsApp</button>}
                </div>
              </div>
            ) : (
              <div className="next">
                <svg width="26" height="26" viewBox="0 0 22 22" style={{ flex: 'none' }} aria-hidden="true"><path d="M11 3c-3 3-3 6 0 8 3-2 3-5 0-8z" fill="#c8402a" /><path d="M3 13h16c-1 4-4 6-8 6s-7-2-8-6z" fill="none" stroke="#2a1206" strokeWidth="1.4" /></svg>
                <p><b>What happens next:</b> we check your payment and reply on WhatsApp to confirm your spot. The villa location is sent to confirmed guests before the party.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
