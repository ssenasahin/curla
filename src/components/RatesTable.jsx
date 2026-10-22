import { useState } from 'react'
import CurrencyIcon from './CurrencyIcon.jsx'
import Sparkline from './Sparkline.jsx'

const INITIAL_ROWS = 5

function money(n) {
  return n.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: n < 1 ? 4 : 2 })
}

export default function RatesTable({ rates, onConvert }) {
  const [active, setActive] = useState('EUR')
  const [showAll, setShowAll] = useState(false)
  const rows = showAll ? rates.list : rates.list.slice(0, INITIAL_ROWS)

  return (
    <section className="rates" id="kurlar">
      <div className="container">
        <h2 className="section-title">
          {rates.list.length || 30} para biriminin
          <br />
          güncel kuru tek tabloda
        </h2>

        <div className="rates-card">
          <table className="rates-table">
            <thead>
              <tr>
                <th>Döviz</th>
                <th>Kur (TRY)</th>
                <th>Grafik (30 gün)</th>
                <th>Değişim</th>
                <th>30 gün en yüksek</th>
                <th>Çevir</th>
              </tr>
            </thead>
            <tbody>
              {rates.status !== 'ready' && (
                <tr>
                  <td colSpan={6} className="rates-status">
                    {rates.status === 'error' ? rates.error : 'Kurlar yükleniyor…'}
                  </td>
                </tr>
              )}
              {rows.map((c) => {
                const isActive = c.code === active
                const up = c.change >= 0
                return (
                  <tr key={c.code} className={isActive ? 'active' : ''} onMouseEnter={() => setActive(c.code)}>
                    <td>
                      <div className="rates-name">
                        <CurrencyIcon currency={c} small />
                        <div>
                          {c.name}
                          <small className="muted">{c.code}</small>
                        </div>
                      </div>
                    </td>
                    <td>₺ {money(c.rate)}</td>
                    <td>
                      <Sparkline
                        data={c.series}
                        color={isActive ? '#fff' : up ? '#1d9a4b' : '#f04a2c'}
                        fill={isActive ? 'rgba(255,255,255,.15)' : up ? '#e3f6e9' : '#fde6e1'}
                      />
                    </td>
                    <td className={`change${up ? '' : ' down'}`}>
                      {up ? '↑' : '↓'} {Math.abs(c.change).toFixed(2)}%
                    </td>
                    <td>₺ {money(c.high)}</td>
                    <td>
                      <button className="btn btn-primary" onClick={() => onConvert(c.code)}>Çevir</button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          {rates.list.length > INITIAL_ROWS && (
            <div className="rates-more">
              <button className="btn btn-outline" onClick={() => setShowAll((s) => !s)}>
                {showAll ? 'Daha az göster' : `Tüm ${rates.list.length} para birimini gör`}
              </button>
            </div>
          )}
          {rates.date && (
            <p className="rates-date">
              Kaynak: Avrupa Merkez Bankası · {new Date(rates.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
