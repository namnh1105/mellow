'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Heart, Menu, Search, ShoppingBag, X } from 'lucide-react'

const logoUrl = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-removebg-preview-ZOZI9nhcalkCZpzhRfHzVyYFU4b6ay.png'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className={isScrolled ? 'reference-header is-scrolled' : 'reference-header'}>
      <Link className="nav-logo" href="/" aria-label="Mellow home">
        <img src={logoUrl} alt="Mellow Handmade Soap" />
      </Link>
      <nav className={menuOpen ? 'reference-nav open' : 'reference-nav'}>
        <Link href="/" onClick={closeMenu}>Home</Link>
        <Link href="/#collections" onClick={closeMenu}>Collection</Link>
        <Link href="/#about" onClick={closeMenu}>About Us</Link>
        <Link href="/#contact" onClick={closeMenu}>Contact</Link>
        <Link href="/products" onClick={closeMenu}>Shop</Link>
      </nav>
      <div className="nav-tools">
        <button aria-label="Search"><Search /></button>
        <button aria-label="Account"><Heart /></button>
        <button aria-label="Shopping bag" onClick={() => window.location.href = '/products'}>
          <ShoppingBag />
          <b>{0}</b>
        </button>
        <button
          className="mobile-menu"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  )
}
