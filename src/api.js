// Frankfurter: Avrupa Merkez Bankası kurları, anahtar gerektirmez.
// Kurlar iş günlerinde güncellenir; hafta sonu son iş gününün kuru döner.
const BASE_URL = 'https://api.frankfurter.dev/v1'

async function get(path, signal) {
  const res = await fetch(`${BASE_URL}${path}`, { signal })
  if (!res.ok) throw new Error(`Kur servisine ulaşılamadı (${res.status})`)
  return res.json()
}

export function getCurrencies(signal) {
  return get('/currencies', signal)
}

export async function getRate(from, to, signal) {
  if (from === to) return { rate: 1, date: null }
  const data = await get(`/latest?base=${from}&symbols=${to}`, signal)
  return { rate: data.rates[to], date: data.date }
}

function isoDaysAgo(days) {
  const d = new Date()
  d.setDate(d.getDate() - days)
  return d.toISOString().slice(0, 10)
}

// Son `days` günün TRY bazlı kurları: { 'YYYY-MM-DD': { USD: 0.0238, ... } }
export async function getTryHistory(days, signal) {
  const data = await get(`/${isoDaysAgo(days)}..?base=TRY`, signal)
  return data.rates
}
