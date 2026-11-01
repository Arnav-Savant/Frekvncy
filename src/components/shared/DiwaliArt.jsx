import { useId } from 'react'

export function Diya({ size = 60, delay = 0, simple = false }) {
  const id = useId().replace(/:/g, '')
  if (simple) {
    return (
      <svg width={size} height={size} viewBox="0 0 80 80" aria-hidden="true">
        <circle cx="40" cy="38" r="34" fill="#ffcf6b" opacity=".12" />
        <g className="flame" style={{ animationDelay: `${delay}s` }}>
          <path d="M40 12 C33 24 34 33 40 38 C46 33 47 24 40 12Z" fill="#f2a033" />
          <path d="M40 22 C37 28 37 33 40 36 C43 33 43 28 40 22Z" fill="#fff1c2" />
        </g>
        <path d="M6 44 Q40 34 74 44 Q70 70 40 72 Q10 70 6 44Z" fill="#9a4219" />
        <path d="M6 44 Q40 52 74 44" stroke="#e8a060" strokeWidth="1.5" fill="none" />
      </svg>
    )
  }
  return (
    <div className="diya">
      <svg width={size} height={size * 1.05} viewBox="0 0 80 84" aria-hidden="true">
        <defs>
          <radialGradient id={`g${id}`} cx="50%" cy="60%" r="50%">
            <stop offset="0" stopColor="#ffcf6b" stopOpacity=".55" />
            <stop offset="1" stopColor="#ffcf6b" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`f${id}`} x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="#c8402a" />
            <stop offset=".35" stopColor="#f2a033" />
            <stop offset=".8" stopColor="#fff1c2" />
            <stop offset="1" stopColor="#fff" />
          </linearGradient>
          <linearGradient id={`c${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#c2622f" />
            <stop offset="1" stopColor="#6e2a12" />
          </linearGradient>
        </defs>
        <circle cx="40" cy="38" r="34" fill={`url(#g${id})`} />
        <g className="flame" style={{ animationDelay: `${delay}s` }}>
          <path d="M40 12 C33 24 34 33 40 38 C46 33 47 24 40 12 Z" fill={`url(#f${id})`} />
        </g>
        <path d="M6 44 Q40 34 74 44 Q70 70 40 72 Q10 70 6 44 Z" fill={`url(#c${id})`} />
        <path d="M6 44 Q40 52 74 44" stroke="#e8a060" strokeWidth="1.5" fill="none" />
        <path d="M16 56 q4 -4 8 0 q4 4 8 0 q4 -4 8 0 q4 4 8 0 q4 -4 8 0" stroke="#f2c46d" strokeWidth="1.2" fill="none" opacity=".8" />
        <path d="M70 44 L78 40 L74 47 Z" fill="#c2622f" />
      </svg>
    </div>
  )
}

// A hanging akash kandil: string of length `len`, lantern scaled by `scale`.
export function Lantern({ len, scale = 1, glow = 22 }) {
  const id = useId().replace(/:/g, '')
  const total = len + 120
  return (
    <svg width={70 * scale} height={total * scale} viewBox={`0 0 70 ${total}`} aria-hidden="true"
      style={{ display: 'block', filter: `drop-shadow(0 0 ${glow}px #f2a03388)` }}>
      <line x1="35" y1="0" x2="35" y2={len} stroke="#7a5a40" strokeWidth="1" />
      <g transform={`translate(0 ${len})`}>
        <defs>
          <radialGradient id={`l${id}`} cx="50%" cy="45%">
            <stop offset="0" stopColor="#fff1c2" />
            <stop offset=".45" stopColor="#f2a033" />
            <stop offset="1" stopColor="#a8320f" />
          </radialGradient>
        </defs>
        <rect x="28" y="0" width="14" height="6" fill="#c99412" />
        <path d="M35 6 L62 34 L35 74 L8 34 Z" fill={`url(#l${id})`} />
        <path d="M35 6 L35 74 M8 34 L62 34" stroke="#7a2a0c" strokeWidth="1" opacity=".6" />
        <path d="M20 20 L35 34 L50 20 M20 48 L35 34 L50 48" stroke="#fff1c2" strokeWidth=".8" fill="none" opacity=".6" />
        <g stroke="#c8402a" strokeWidth="1.4">
          {[0, 1, 2, 3, 4, 5, 6].map((k) => (
            <line key={k} x1={26 + k * 3} y1="74" x2={25 + k * 3.3} y2={104 + (k % 2) * 6} />
          ))}
        </g>
      </g>
    </svg>
  )
}

// Rangoli: three rings of petals, a dotted border and a centre.
export function Mandala({ size, r, colors, className }) {
  const rings = [
    [16, r * 0.95, r * 0.32, colors[0], 0],
    [12, r * 0.68, r * 0.24, colors[1], 15],
    [8, r * 0.42, r * 0.18, colors[2], 0],
  ]
  const vb = r * 1.2
  return (
    <svg className={className} width={size} height={size} viewBox={`${-vb} ${-vb} ${vb * 2} ${vb * 2}`} aria-hidden="true">
      {rings.map(([n, R, w, c, off]) =>
        Array.from({ length: n }, (_, k) => (
          <path key={`${R}-${k}`} d={`M0 0 Q ${w / 2} ${-R / 2} 0 ${-R} Q ${-w / 2} ${-R / 2} 0 0 Z`}
            fill={c} opacity=".9" transform={`rotate(${(360 / n) * k + off})`} />
        )),
      )}
      {Array.from({ length: 24 }, (_, k) => {
        const a = (k / 24) * Math.PI * 2
        return <circle key={k} cx={Math.cos(a) * r * 1.08} cy={Math.sin(a) * r * 1.08} r={r * 0.035} fill={colors[3]} />
      })}
      <circle r={r * 0.12} fill={colors[3]} />
    </svg>
  )
}
