export default function CurrencyIcon({ currency, small = false }) {
  return (
    <span className={`cur-icon${small ? ' sm' : ''}`} style={{ background: currency.color }}>
      {currency.symbol}
    </span>
  )
}
