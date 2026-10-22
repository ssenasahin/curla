import { useState } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import PopularBar from './components/PopularBar.jsx'
import RatesTable from './components/RatesTable.jsx'
import Sources from './components/Sources.jsx'
import Footer from './components/Footer.jsx'
import useRates from './useRates.js'

export default function App() {
  const rates = useRates()
  const [pair, setPair] = useState({ from: 'USD', to: 'TRY' })

  // Şerit ve tablodaki "Çevir" butonları çeviriciyi o dövize ayarlar
  function convert(code) {
    setPair({ from: code, to: 'TRY' })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {/* İlk ekran: mavi şerit her zaman pencerenin en altında */}
      <div className="first-screen" id="top">
        <Header />
        <Hero pair={pair} setPair={setPair} codes={['TRY', ...rates.list.map((c) => c.code)]} />
        <PopularBar rates={rates} onConvert={convert} />
      </div>
      <RatesTable rates={rates} onConvert={convert} />
      <Sources />
      <Footer />
    </>
  )
}
