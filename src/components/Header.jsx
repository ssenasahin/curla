import Logo from './Logo.jsx'

const links = [
  // Çevirici ilk ekranda; hero'ya değil sayfa başına gidiyoruz ki şerit pencerenin altında kalsın
  { label: 'Çevirici', href: '#top' },
  { label: 'Kurlar', href: '#kurlar' },
  { label: 'Hakkımızda', href: '#hakkimizda' },
]

export default function Header() {
  return (
    <header className="header">
      <div className="container">
        <Logo />
        <nav className="nav">
          {links.map((l) => (
            <a key={l.href} href={l.href}>{l.label}</a>
          ))}
        </nav>
      </div>
    </header>
  )
}
