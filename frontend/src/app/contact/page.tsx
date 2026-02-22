import { MapPin, Phone, Mail, Clock, Instagram, ExternalLink, Info } from 'lucide-react'
import SectionTitle from '@/components/SectionTitle'
import Button from '@/components/Button'
import { getBarInfo } from '@/lib/strapi'

const defaultHours = [
  { day: 'Lundi', hours: 'Fermé' },
  { day: 'Mardi', hours: '18h00 - 01h00' },
  { day: 'Mercredi', hours: '18h00 - 01h00' },
  { day: 'Jeudi', hours: '18h00 - 01h00' },
  { day: 'Vendredi', hours: '18h00 - 02h00' },
  { day: 'Samedi', hours: '18h00 - 02h00' },
  { day: 'Dimanche', hours: '16h00 - 23h00' },
]

export default async function ContactPage() {
  let barInfo = null
  try {
    const response = await getBarInfo()
    barInfo = response.data
  } catch {
    // Strapi non disponible, utilisation des valeurs par défaut
  }

  const address = barInfo?.attributes.address || '2A rue du centre\n35590 Saint Gilles'
  const phone = barInfo?.attributes.phone || ''
  const email = barInfo?.attributes.email || ''
  const instagramUrl = barInfo?.attributes.instagramUrl || 'https://instagram.com'
  const googleMapsUrl = barInfo?.attributes.googleMapsUrl || '#'
  const hours = defaultHours

  const phoneHref = phone ? `tel:${phone.replace(/\s/g, '')}` : '#'
  const addressLines = address.split('\n')

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg animate-fade-in-up">
            <Info className="w-8 h-8 text-white" />
          </div>
          <div className="animate-fade-in-up delay-100">
            <SectionTitle
              title="Contact & Infos"
              subtitle="Retrouvez-nous pour passer un moment inoubliable"
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Info Cards */}
            <div className="space-y-6">
              {/* Address */}
              <div className="bg-white rounded-3xl shadow-lg border border-primary-100/50 p-8 hover:shadow-xl transition-shadow animate-fade-in-left delay-200">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary-100 to-primary-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-7 h-7 text-primary-500" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold mb-3">Adresse</h3>
                    <p className="text-foreground/70 mb-4 leading-relaxed">
                      {addressLines.map((line, i) => (
                        <span key={i}>{line}{i < addressLines.length - 1 && <br />}</span>
                      ))}
                    </p>
                    {googleMapsUrl !== '#' && (
                      <a
                        href={googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-500 hover:bg-primary-100 rounded-xl font-medium text-sm transition-colors"
                      >
                        Voir sur Google Maps
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Phone & Email */}
              <div className="bg-white rounded-3xl shadow-lg border border-primary-100/50 p-8 hover:shadow-xl transition-shadow animate-fade-in-left delay-300">
                <div className="space-y-6">
                  {phone && (
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-primary-100 to-primary-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <Phone className="w-7 h-7 text-primary-500" />
                      </div>
                      <div>
                        <h3 className="font-display text-xl font-semibold mb-2">Téléphone</h3>
                        <a
                          href={phoneHref}
                          className="text-foreground/70 hover:text-primary-500 transition-colors text-lg"
                        >
                          {phone}
                        </a>
                      </div>
                    </div>
                  )}
                  {phone && email && <div className="h-px bg-primary-100" />}
                  {email && (
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-primary-100 to-primary-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <Mail className="w-7 h-7 text-primary-500" />
                      </div>
                      <div>
                        <h3 className="font-display text-xl font-semibold mb-2">Email</h3>
                        <a
                          href={`mailto:${email}`}
                          className="text-foreground/70 hover:text-primary-500 transition-colors text-lg"
                        >
                          {email}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white rounded-3xl shadow-lg border border-primary-100/50 p-8 hover:shadow-xl transition-shadow animate-fade-in-left delay-400">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary-100 to-primary-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Instagram className="w-7 h-7 text-primary-500" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold mb-3">Réseaux sociaux</h3>
                    <a
                      href={instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-500 hover:bg-primary-100 rounded-xl font-medium text-sm transition-colors"
                    >
                      Instagram
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Opening Hours */}
            <div>
              <div className="bg-white rounded-3xl shadow-lg border border-primary-100/50 p-8 sticky top-24 hover:shadow-xl transition-shadow animate-fade-in-right delay-200">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary-100 to-primary-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-7 h-7 text-primary-500" />
                  </div>
                  <h3 className="font-display text-2xl font-semibold">Horaires d&apos;ouverture</h3>
                </div>
                <div className="space-y-3">
                  {hours.map((item) => {
                    const closed = item.hours.toLowerCase() === 'fermé'
                    return (
                      <div
                        key={item.day}
                        className={`flex justify-between items-center py-4 px-4 rounded-2xl transition-colors ${
                          closed
                            ? 'bg-foreground/5 text-foreground/40'
                            : 'bg-primary-50/50 hover:bg-primary-50'
                        }`}
                      >
                        <span className="font-medium">{item.day}</span>
                        <span className={`${closed ? '' : 'text-primary-500 font-semibold'}`}>
                          {item.hours}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      {googleMapsUrl && googleMapsUrl !== '#' && (
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="rounded-3xl overflow-hidden shadow-xl h-[400px]">
              <iframe
                src={googleMapsUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localisation du O Breizh Gilles"
              />
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      {(phone || email) && (
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-foreground to-foreground/90 rounded-3xl p-10 text-center shadow-xl">
              <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
                Une question ? Une réservation ?
              </h3>
              <p className="text-white/70 mb-8 text-lg max-w-lg mx-auto">
                N&apos;hésitez pas à nous contacter, notre équipe vous répondra dans les plus brefs délais.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {phone && (
                  <Button href={phoneHref} size="lg">
                    <Phone className="mr-2 w-5 h-5" />
                    Appeler
                  </Button>
                )}
                {email && (
                  <Button href={`mailto:${email}`} variant="outline" size="lg" className="border-white/50 text-white hover:bg-white/10">
                    <Mail className="mr-2 w-5 h-5" />
                    Envoyer un email
                  </Button>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
