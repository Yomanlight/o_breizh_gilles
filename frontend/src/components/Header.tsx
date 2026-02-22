'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X, Wine } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/cocktails', label: 'Cocktails' },
  { href: '/evenements', label: 'Événements' },
  { href: '/galerie', label: 'Galerie' },
  { href: '/contact', label: 'Contact' },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Vérifier si le lien est actif
  const isActiveLink = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname?.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-50 px-4 pt-3">
      <nav
        className={`max-w-6xl mx-auto rounded-2xl px-6 py-3 transition-all duration-300 bg-white border border-primary-100 ${
          scrolled ? 'shadow-lg' : 'shadow-md'
        }`}
      >
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-300 to-primary-400 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all">
              <Wine className="w-5 h-5 text-white" />
            </div>
            <span className="font-display text-xl md:text-2xl font-bold text-foreground">
              O Breizh Gilles
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = isActiveLink(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 relative
                    ${
                      isActive
                        ? 'text-foreground bg-primary-100 shadow-sm'
                        : 'text-foreground/70 hover:text-foreground hover:bg-primary-50'
                    }
                  `}
                >
                  {link.label}
                </Link>
              )
            })}
            <Link
              href="https://instagram.com/yoyobar"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 px-5 py-2.5 bg-gradient-to-r from-primary-400 to-primary-500 text-white rounded-xl font-medium text-sm shadow-md hover:shadow-lg hover:scale-105 transition-all"
            >
              Réserver
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
              isMenuOpen
                ? 'bg-gradient-to-r from-primary-400 to-primary-500 text-white'
                : 'bg-primary-50 text-foreground hover:bg-primary-100'
            }`}
            aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-primary-100 animate-fade-in">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = isActiveLink(link.href)
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`
                      px-4 py-3 rounded-xl font-medium transition-all duration-300
                      ${
                        isActive
                          ? 'text-foreground bg-primary-100 shadow-sm'
                          : 'text-foreground/70 hover:text-foreground hover:bg-primary-50'
                      }
                    `}
                  >
                    {link.label}
                  </Link>
                )
              })}
              <Link
                href="https://instagram.com/yoyobar"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="mt-2 px-4 py-3 bg-gradient-to-r from-primary-400 to-primary-500 text-white rounded-xl font-medium text-center shadow-md"
              >
                Réserver
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
