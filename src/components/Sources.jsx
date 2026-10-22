export default function Sources() {
  return (
    <section className="sources" id="hakkimizda">
      <div className="container">
        <h2 className="section-title">Hakkımızda</h2>
        <p className="about-text">
          Kurla, Avrupa Merkez Bankası'nın günlük referans kurlarını Frankfurter API üzerinden alıp
          Türk lirası karşılıklarını gösteren sade bir döviz çeviricidir. Kurlar iş günlerinde güncellenir,
          yalnızca bilgi amaçlıdır.
        </p>
      </div>
      <div className="sources-wrap">
        <div className="sources-bg">Veri kaynaklarımız</div>
        <div className="sources-list">
          <span>ECB</span>
          <span>Frankfurter</span>
          <span>Avrupa<br />Merkez Bankası</span>
          <span>Open Data</span>
        </div>
      </div>
    </section>
  )
}
