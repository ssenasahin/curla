import { useEffect, useState } from 'react'
import CurrencyIcon from './CurrencyIcon.jsx'
import Sparkline from './Sparkline.jsx'
import { featured } from '../data.js'

const INTERVAL_MS = 3000

export default function PopularBar({ rates, onConvert }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const items = rates.list.filter((c) => featured.includes(c.code))
  const c = items[index]
  const move = (d) => setIndex((i) => (i + d + items.length) % items.length)

  // index bağımlılığı sayesinde oklara basılınca sayaç baştan başlar
  useEffect(() => {
    if (paused || items.length < 2) return
    const id = setTimeout(() => move(1), INTERVAL_MS)
    return () => clearTimeout(id)
  }, [index, paused, items.length])

  return (
    <section className="popular" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="container">
        <p className="popular-title">En popüler<br />dövizler</p>
        <div className="popular-arrows">
          <button onClick={() => move(-1)} disabled={!c} aria-label="Önceki">
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 5l4-4 4 4" /></svg>
          </button>
          <button onClick={() => move(1)} disabled={!c} aria-label="Sonraki">
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 1l4 4 4-4" /></svg>
          </button>
        </div>
        {c ? (
          <div className="popular-item" key={c.code}>
            <div className="popular-coin">
              <CurrencyIcon currency={{ ...c, color: '#f04a2c' }} small />
              {c.name} <small>{c.code}</small>
            </div>
            <div className="popular-price">
              {c.rate.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
              <small>TRY</small>
            </div>
            <div className="popular-change">
              {c.change >= 0 ? '↑' : '↓'} {Math.abs(c.change).toFixed(2)}%
            </div>
            <Sparkline data={c.series} width={110} height={30} color="#fff" fill={null} />
            <button className="btn btn-red" onClick={() => onConvert(c.code)}>Çevir</button>
          </div>
        ) : (
          <p className="popular-status">{rates.status === 'error' ? rates.error : 'Kurlar yükleniyor…'}</p>
        )}
      </div>
    </section>
  )
}
