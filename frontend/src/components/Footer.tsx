import Link from 'next/link'
import { Wine, Instagram, MapPin, Clock, Phone } from 'lucide-react'
import { getBarInfo } from '@/lib/strapi'

export default async function Footer() {
  let barInfo = null
  try {
    const response = await getBarInfo()
    barInfo = response.data
  } catch {
    // Strapi non disponible, utilisation des valeurs par défaut
  }

  const address = barInfo?.attributes.address || '2A rue du centre\n35590 Saint Gilles'
  const phone = barInfo?.attributes.phone || ''
  const instagramUrl = barInfo?.attributes.instagramUrl || 'https://instagram.com'

  const addressLines = address.split('\n')

  return (
    <footer className="bg-foreground text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-300 to-primary-400 rounded-xl flex items-center justify-center">
                <Wine className="w-5 h-5 text-white" />
              </div>
              <span className="font-display text-2xl font-bold">
                O Breizh Gilles
              </span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed">
              Votre bar convivial pour des cocktails d&apos;exception et des soirées inoubliables.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-6">Navigation</h3>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Accueil' },
                { href: '/cocktails', label: 'Cocktails' },
                { href: '/evenements', label: 'Événements' },
                { href: '/galerie', label: 'Galerie' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-primary-300 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Horaires */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary-300" />
              Horaires
            </h3>
            <ul className="space-y-2 text-sm text-white/60">
              <li>Mar - Jeu : 18h - 1h</li>
              <li>Ven - Sam : 18h - 2h</li>
              <li>Dimanche : 16h - 23h</li>
              <li className="text-primary-300 font-medium">Fermé le lundi</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-6">Contact</h3>
            <ul className="space-y-4 text-sm text-white/60">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-primary-300" />
                </div>
                <span>
                  {addressLines.map((line, i) => (
                    <span key={i}>{line}{i < addressLines.length - 1 && <br />}</span>
                  ))}
                </span>
              </li>
              {phone && (
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-primary-300" />
                  </div>
                  <a href={`tel:${phone.replace(/\s/g, '')}`} className="hover:text-primary-300 transition-colors">
                    {phone}
                  </a>
                </li>
              )}
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Instagram className="w-4 h-4 text-primary-300" />
                </div>
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary-300 transition-colors"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            &copy; {new Date().getFullYear()} O Breizh Gilles. Tous droits réservés.
          </p>
          <p className="text-white/40 text-xs">
            L&apos;abus d&apos;alcool est dangereux pour la santé. À consommer avec modération.
          </p>
        </div>
      </div>
    </footer>
  )
}
