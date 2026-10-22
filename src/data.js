// API'nin vermediği görsel bilgiler: Türkçe adlar, ikon renkleri, sıralama.

export const featured = ['USD', 'EUR', 'GBP', 'CHF', 'JPY']

export const trNames = {
  USD: 'Amerikan Doları',
  EUR: 'Euro',
  GBP: 'İngiliz Sterlini',
  CHF: 'İsviçre Frangı',
  JPY: 'Japon Yeni',
  CAD: 'Kanada Doları',
  AUD: 'Avustralya Doları',
  CNY: 'Çin Yuanı',
  DKK: 'Danimarka Kronu',
  SEK: 'İsveç Kronu',
  NOK: 'Norveç Kronu',
  PLN: 'Polonya Zlotisi',
  CZK: 'Çek Korunası',
  HUF: 'Macar Forinti',
  RON: 'Rumen Leyi',
  BGN: 'Bulgar Levası',
  ISK: 'İzlanda Kronası',
  NZD: 'Yeni Zelanda Doları',
  SGD: 'Singapur Doları',
  HKD: 'Hong Kong Doları',
  KRW: 'Güney Kore Wonu',
  INR: 'Hindistan Rupisi',
  IDR: 'Endonezya Rupisi',
  MYR: 'Malezya Ringgiti',
  PHP: 'Filipin Pesosu',
  THB: 'Tayland Bahtı',
  MXN: 'Meksika Pesosu',
  BRL: 'Brezilya Reali',
  ZAR: 'Güney Afrika Randı',
  ILS: 'İsrail Şekeli',
  TRY: 'Türk Lirası',
}

const fixedColors = { USD: '#2f9e5b', EUR: '#3d4ee8', GBP: '#7b4be0', CHF: '#e2452c', JPY: '#e89a1c' }
const palette = ['#3d4ee8', '#2f9e5b', '#7b4be0', '#e2452c', '#e89a1c', '#1f9bb5', '#d6408a']

export function colorFor(code, index) {
  return fixedColors[code] ?? palette[index % palette.length]
}

const fixedSymbols = { CHF: '₣', TRY: '₺' }

export function symbolFor(code) {
  if (fixedSymbols[code]) return fixedSymbols[code]
  try {
    const part = new Intl.NumberFormat('tr-TR', { style: 'currency', currency: code, currencyDisplay: 'narrowSymbol' })
      .formatToParts(0)
      .find((p) => p.type === 'currency')
    if (part && part.value.length <= 2) return part.value
  } catch {
    // bilinmeyen kod: harfe düş
  }
  return code[0]
}
