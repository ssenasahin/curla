import Logo from './Logo.jsx'
import Illustration from './Illustration.jsx'

export default function Footer() {
  return (
    <footer className="footer">
      <Illustration className="footer-art" mono />
      <div className="container">
        <div>
          <Logo light />
          <p className="footer-copy">© {new Date().getFullYear()} Kurla.<br />Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  )
}
