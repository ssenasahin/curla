import { useEffect, useState } from 'react'
import { getCurrencies, getTryHistory } from './api.js'
import { featured, trNames, colorFor, symbolFor } from './data.js'

const HISTORY_DAYS = 30

// Tablo ve şerit için tüm dövizlerin TRY karşılığı, günlük değişimi ve 30 günlük seyri.
export default function useRates() {
  const [state, setState] = useState({ status: 'loading', list: [], names: {}, date: null, error: null })

  useEffect(() => {
    const controller = new AbortController()

    Promise.all([getCurrencies(controller.signal), getTryHistory(HISTORY_DAYS, controller.signal)])
      .then(([names, history]) => {
        const days = Object.keys(history).sort()
        const codes = Object.keys(history[days.at(-1)])
        codes.sort((a, b) => {
          const fa = featured.indexOf(a)
          const fb = featured.indexOf(b)
          if (fa !== -1 || fb !== -1) return (fa === -1 ? 99 : fa) - (fb === -1 ? 99 : fb)
          return a.localeCompare(b)
        })

        const list = codes.map((code, i) => {
          // API 1 TRY = x döviz veriyor; tersini alıp 1 döviz = y TRY yapıyoruz
          const series = days.map((d) => history[d][code]).filter(Boolean).map((v) => 1 / v)
          const rate = series.at(-1)
          const prev = series.at(-2) ?? rate
          return {
            code,
            name: trNames[code] ?? names[code] ?? code,
            symbol: symbolFor(code),
            color: colorFor(code, i),
            rate,
            change: ((rate - prev) / prev) * 100,
            high: Math.max(...series),
            series,
          }
        })

        setState({ status: 'ready', list, names, date: days.at(-1), error: null })
      })
      .catch((err) => {
        if (err.name === 'AbortError') return
        setState((s) => ({ ...s, status: 'error', error: err.message }))
      })

    return () => controller.abort()
  }, [])

  return state
}
