import { useEffect, useState } from 'react'
import Illustration from './Illustration.jsx'
import { getRate } from '../api.js'
import { featured } from '../data.js'

function format(n, digits = 2) {
  return n.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: n < 1 ? 4 : digits })
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' })
}

export default function Hero({ pair, setPair, codes }) {
  const { from, to } = pair
  const [amount, setAmount] = useState('1000')
  const [quote, setQuote] = useState({ status: 'loading', rate: null, date: null })
  const [refresh, setRefresh] = useState(0)

  // Liste yüklenene kadar seçimler boş kalmasın
  const options = codes.length > 1 ? codes : ['TRY', ...featured]

  useEffect(() => {
    const controller = new AbortController()
    setQuote((q) => ({ ...q, status: 'loading' }))
    getRate(from, to, controller.signal)
      .then(({ rate, date }) => setQuote({ status: 'ready', rate, date }))
      .catch((err) => {
        if (err.name !== 'AbortError') setQuote({ status: 'error', rate: null, date: null })
      })
    return () => controller.abort()
  }, [from, to, refresh])

  const value = parseFloat(amount.replace(',', '.')) || 0
  const result = quote.rate == null ? '' : format(value * quote.rate)

  function swap() {
    setPair({ from: to, to: from })
  }

  let note = 'Kur yükleniyor…'
  if (quote.status === 'error') note = 'Kur alınamadı, tekrar deneyin'
  else if (quote.rate != null) note = `1 ${from} = ${format(quote.rate, 4)} ${to}`

  return (
    <section className="hero" id="cevirici">
      <div className="container">
        <div className="hero-content">
          <h1>
            Döviz Kuru
            <br />
            Çevirici
          </h1>

          <div className="converter">
            <div className="converter-side">
              <label>Gönderilen:</label>
              <div className="converter-field">
                <input value={amount} onChange={(e) => setAmount(e.target.value)} inputMode="decimal" />
                <select value={from} onChange={(e) => setPair({ from: e.target.value, to })}>
                  {options.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <p className="converter-note">{note}</p>
            </div>

            <button className="swap" onClick={swap} aria-label="Para birimlerini değiştir">
              <span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 5h8l-2.5-2.5M11 9H3l2.5 2.5" />
                </svg>
              </span>
            </button>

            <div className="converter-side">
              <label>Alınan:</label>
              <div className="converter-field">
                <input value={result} placeholder="…" readOnly />
                <select value={to} onChange={(e) => setPair({ from, to: e.target.value })}>
                  {options.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <p className="converter-note" title="Avrupa Merkez Bankası referans kurları">
                {quote.date ? `ECB kuru · ${formatDate(quote.date)}` : 'Piyasa ortası kurları kullanıyoruz'}
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor">
                  <circle cx="6" cy="6" r="5" />
                  <path d="M6 5.5v3M6 3.6v.1" strokeLinecap="round" />
                </svg>
              </p>
            </div>
          </div>

          <div className="hero-actions">
            <button className="btn btn-primary" onClick={() => setRefresh((n) => n + 1)} disabled={quote.status === 'loading'}>
              {quote.status === 'loading' ? 'Yükleniyor' : 'Çevir'}
            </button>
            <Doodle />
          </div>
        </div>

        <Illustration className="hero-illustration" />
      </div>
    </section>
  )
}

function Doodle() {
  return (
    <svg className="doodle" width="120" height="90" viewBox="0 0 120 90" fill="none" stroke="#3d4ee8" strokeWidth="1.4" strokeLinecap="round">
      <path d="M-6 52c14 10 26 20 22 30-3 7-14 2-8-6 8-10 26-14 38-24" strokeDasharray="0" />
      <circle cx="66" cy="44" r="13" fill="#fff" />
      <path d="M57 39c5 3 13 3 18 0M55 47c6 3 16 3 22-1" />
      <ellipse cx="66" cy="44" rx="23" ry="6" transform="rotate(-18 66 44)" />
      <circle cx="98" cy="18" r="8" fill="#e9ebfd" />
      <text x="98" y="22" fontSize="10" fontWeight="700" fill="#3d4ee8" stroke="none" textAnchor="middle" fontFamily="Outfit">₺</text>
      <path d="M38 14v6M35 17h6M108 52v4M106 54h4M86 74l2 2M88 74l-2 2" />
    </svg>
  )
}
