// Kendi çizdiğimiz izometrik sahne: platform üzerinde para kuleleri, banknot
// destesi, ayakta duran ₺ madeni parası ve kur grafiği gösteren ekran.

const COS = Math.cos(Math.PI / 6)

function P(x, y, z = 0) {
  return [(x - y) * COS, (x + y) * 0.5 - z]
}

function pts(list) {
  return list.map((p) => P(...p).map((n) => n.toFixed(1)).join(',')).join(' ')
}

function useTheme(mono) {
  return mono
    ? { stroke: '#fff', top: 'none', left: 'none', right: 'none', accent: 'none', soft: 'none', red: 'none', cyan: 'none' }
    : { stroke: '#3d4ee8', top: '#fff', left: '#eef0ff', right: '#c9cefb', accent: '#3d4ee8', soft: '#e3e6fe', red: '#f04a2c', cyan: '#3fd6e6' }
}

function Box({ x, y, z, w, d, h, t, top, left, right }) {
  return (
    <g>
      <polygon points={pts([[x, y + d, z], [x + w, y + d, z], [x + w, y + d, z + h], [x, y + d, z + h]])} fill={left ?? t.left} />
      <polygon points={pts([[x + w, y, z], [x + w, y + d, z], [x + w, y + d, z + h], [x + w, y, z + h]])} fill={right ?? t.right} />
      <polygon points={pts([[x, y, z + h], [x + w, y, z + h], [x + w, y + d, z + h], [x, y + d, z + h]])} fill={top ?? t.top} />
    </g>
  )
}

// Dikey eksenli silindir; rings > 0 ise madeni para kulesi gibi çizgili
function Cylinder({ x, y, z, r, h, t, rings = 0, top, side }) {
  const rx = r * Math.sqrt(1.5)
  const ry = r * Math.SQRT1_2
  const [cx, by] = P(x, y, z)
  const ty = by - h
  const lower = (yy) => `M${cx - rx},${yy} A${rx},${ry} 0 0 0 ${cx + rx},${yy}`
  const lines = []
  for (let i = 1; i < rings; i++) lines.push(lower(by - (h / rings) * i))
  return (
    <g>
      <path d={`M${cx - rx},${ty} L${cx - rx},${by} A${rx},${ry} 0 0 0 ${cx + rx},${by} L${cx + rx},${ty} Z`} fill={side ?? t.right} />
      {lines.map((d, i) => <path key={i} d={d} fill="none" />)}
      <ellipse cx={cx} cy={ty} rx={rx} ry={ry} fill={top ?? t.top} />
      <ellipse cx={cx} cy={ty} rx={rx * 0.68} ry={ry * 0.68} fill="none" strokeOpacity=".5" />
    </g>
  )
}

// x = sabit düzlemde duran madeni para (+x yönüne bakıyor)
function StandingCoin({ x, y, z, r, thick, t }) {
  const ring = (xx, rr) =>
    Array.from({ length: 48 }, (_, i) => {
      const a = (i / 48) * Math.PI * 2
      return P(xx, y + Math.cos(a) * rr, z + Math.sin(a) * rr)
    })
  const back = ring(x - thick, r)
  const front = ring(x, r)
  const toPath = (list) => 'M' + list.map((p) => p.map((n) => n.toFixed(1)).join(',')).join('L') + 'Z'
  const [cx, cy] = P(x, y, z)
  return (
    <g>
      <path d={toPath(back)} fill={t.right} />
      {/* kenar kalınlığı: arka ve ön halkayı birleştiren şerit */}
      <path d={toPath([...back.slice(12, 37), ...front.slice(12, 37).reverse()])} fill={t.right} />
      <path d={toPath(front)} fill={t.top} />
      <path d={toPath(ring(x, r * 0.78))} fill={t.soft} />
      <text
        transform={`matrix(${COS},-0.5,0,1,${cx},${cy})`}
        x="0"
        y="22"
        fontSize="64"
        fontWeight="700"
        textAnchor="middle"
        fill={t.accent === 'none' ? 'none' : t.accent}
        stroke="none"
        fontFamily="Outfit, sans-serif"
      >
        ₺
      </text>
    </g>
  )
}

function Banknotes({ x, y, z, w, d, h, t, layers = 5 }) {
  const step = h / layers
  return (
    <g>
      <Box x={x} y={y} z={z} w={w} d={d} h={h} t={t} />
      {Array.from({ length: layers - 1 }, (_, i) => {
        const zz = z + step * (i + 1)
        return <polyline key={i} points={pts([[x, y + d, zz], [x + w, y + d, zz], [x + w, y, zz]])} fill="none" />
      })}
      {/* bant */}
      <polygon points={pts([[x + w * 0.4, y, z + h], [x + w * 0.55, y, z + h], [x + w * 0.55, y + d, z + h], [x + w * 0.4, y + d, z + h]])} fill={t.red} />
      <polygon points={pts([[x + w * 0.4, y + d, z], [x + w * 0.55, y + d, z], [x + w * 0.55, y + d, z + h], [x + w * 0.4, y + d, z + h]])} fill={t.red} />
      <polygon points={pts([[x + w * 0.62, y + d * 0.3, z + h], [x + w * 0.9, y + d * 0.3, z + h], [x + w * 0.9, y + d * 0.7, z + h], [x + w * 0.62, y + d * 0.7, z + h]])} fill="none" />
    </g>
  )
}

function Screen({ x, y, z, d, h, t }) {
  const chart = [0.15, 0.3, 0.22, 0.45, 0.38, 0.6, 0.52, 0.78, 0.7, 0.9]
  const line = chart.map((v, i) => [x + 6, y + d - 8 - (i / (chart.length - 1)) * (d - 16), z + 12 + v * (h - 24)])
  return (
    <g>
      <Box x={x - 30} y={y + d / 2 - 12} z={z} w={30} d={24} h={6} t={t} />
      <Box x={x - 6} y={y + d / 2 - 4} z={z + 6} w={6} d={8} h={22} t={t} />
      <Box x={x} y={y} z={z + 20} w={6} d={d} h={h} t={t} right={t.accent} />
      <polygon
        points={pts([[x + 6, y + 5, z + 25], [x + 6, y + d - 5, z + 25], [x + 6, y + d - 5, z + 15 + h], [x + 6, y + 5, z + 15 + h]])}
        fill={t.top}
      />
      <polyline points={pts(line.map(([a, b, c]) => [a, b, c + 20]))} fill="none" stroke={t.cyan === 'none' ? undefined : '#1d9a4b'} strokeWidth="2.2" />
    </g>
  )
}

function Arrow({ x, y, z, t, up = true, color }) {
  const [cx, cy] = P(x, y, z)
  const d = up ? 'M0,-18 L12,-4 L5,-4 L5,14 L-5,14 L-5,-4 L-12,-4 Z' : 'M0,18 L12,4 L5,4 L5,-14 L-5,-14 L-5,4 L-12,4 Z'
  return <path d={d} transform={`translate(${cx},${cy})`} fill={color ?? t.accent} />
}

function Sparkle({ x, y, s = 6 }) {
  return <path d={`M${x - s},${y}H${x + s}M${x},${y - s}V${y + s}`} fill="none" />
}

export default function Illustration({ className, mono = false }) {
  const t = useTheme(mono)
  const vents = [30, 60, 90, 120, 150, 180]

  return (
    <svg className={className} viewBox="-270 -300 560 600" aria-hidden="true">
      <g stroke={t.stroke} strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
        {/* zemin gölgesi */}
        {!mono && <polygon points={pts([[-10, -10, 0], [330, -10, 0], [330, 270, 0], [-10, 270, 0]])} fill="#eef0ff" stroke="none" transform="translate(14 14)" />}

        {/* platform */}
        <Box x={0} y={0} z={0} w={300} d={240} h={30} t={t} />
        {vents.map((v) => (
          <polygon key={v} points={pts([[v, 240, 8], [v + 18, 240, 8], [v + 18, 240, 22], [v, 240, 22]])} fill={t.accent} />
        ))}
        <polygon points={pts([[300, 30, 10], [300, 110, 10], [300, 110, 20], [300, 30, 20]])} fill={t.top} />
        <Box x={16} y={16} z={30} w={268} d={208} h={12} t={t} top={t.soft} />

        {/* arka para kulesi */}
        <Cylinder x={70} y={70} z={42} r={34} h={110} t={t} rings={12} />
        <Cylinder x={70} y={70} z={175} r={18} h={8} t={t} side={t.red} top={t.red} />
        <Cylinder x={60} y={165} z={42} r={26} h={56} t={t} rings={6} />

        <StandingCoin x={150} y={110} z={112} r={64} thick={14} t={t} />

        <Banknotes x={190} y={26} z={42} w={76} d={48} h={44} t={t} />
        <Banknotes x={196} y={34} z={86} w={64} d={40} h={20} t={t} layers={3} />

        <Cylinder x={140} y={196} z={42} r={20} h={30} t={t} rings={4} />
        <Cylinder x={200} y={110} z={42} r={16} h={18} t={t} rings={2} />

        <Screen x={262} y={130} z={42} d={92} h={74} t={t} />

        {/* uçuşan öğeler */}
        <Cylinder x={-10} y={40} z={210} r={14} h={6} t={t} />
        <Cylinder x={230} y={-40} z={190} r={11} h={5} t={t} side={t.red} top={t.red} />
        <Arrow x={120} y={-30} z={230} t={t} />
        <Arrow x={300} y={40} z={150} t={t} up={false} color={t.red} />
        <Sparkle x={-190} y={-170} />
        <Sparkle x={210} y={-250} s={5} />
        <Sparkle x={250} y={-60} s={4} />
        <circle cx={-120} cy={-250} r={4} fill="none" />
      </g>
    </svg>
  )
}
