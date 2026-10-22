export default function Logo({ light = false }) {
  const ring = light ? '#fff' : '#3d4ee8'
  return (
    <a href="#top" className={`logo${light ? ' logo-light' : ''}`}>
      <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true">
        <path
          d="M28 9.5A13 13 0 1 0 28 24.5"
          fill="none"
          stroke={ring}
          strokeWidth="7"
          strokeLinecap="round"
        />
        <path
          d="M17 13.2c1.4-2 4.6-1.6 4.6 1 0 2.2-2.6 3.8-4.6 5.4-2-1.6-4.6-3.2-4.6-5.4 0-2.6 3.2-3 4.6-1z"
          fill="#f04a2c"
        />
      </svg>
      KURLA
    </a>
  )
}
