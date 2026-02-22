'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ArrowRight, Instagram, MapPin, Calendar, Sparkles } from 'lucide-react'
import Button from '@/components/Button'
import SectionTitle from '@/components/SectionTitle'
import CocktailCard from '@/components/CocktailCard'
import EventCard from '@/components/EventCard'
import { getCocktails, getUpcomingEvents, getStrapiImageUrl, type Cocktail, type Event } from '@/lib/strapi'

export default function Home() {
  const [featuredCocktails, setFeaturedCocktails] = useState<Cocktail[]>([])
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cocktailsRes, eventsRes] = await Promise.all([
          getCocktails(),
          getUpcomingEvents()
        ])
        setFeaturedCocktails(cocktailsRes.data.slice(0, 3))
        setUpcomingEvents(eventsRes.data.slice(0, 3))
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <>
      {/* Hero Section - pulls up behind navbar */}
      <section className="relative min-h-screen flex items-center -mt-[80px]">
        {/* Background image - extends behind navbar */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/bg_bar.png"
            alt="O Breizh Gilles ambiance"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 mt-[80px]">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm mb-6 animate-fade-in">
              <Sparkles className="w-4 h-4 text-primary-300" />
              Bienvenue dans votre nouveau spot préféré
            </div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in">
              <span className="text-primary-300">O Breizh Gilles</span>
            </h1>
            <p className="text-xl text-white/80 mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Cocktails artisanaux, ambiance festive et soirées inoubliables.
              Rejoignez-nous pour vivre des moments uniques.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Button href="/cocktails" variant="liquid-glass" size="lg">
                Découvrir la carte
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button href="/contact" variant="outline" size="lg" className="border-white/50 text-white hover:bg-white/10">
                <MapPin className="mr-2 w-5 h-5" />
                Nous trouver
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-white/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 animate-fade-in-left">
              <SectionTitle
                title="Notre histoire"
                subtitle="Un lieu unique où se mêlent convivialité et créativité"
                centered={false}
              />
              <p className="text-foreground/70 mb-6 leading-relaxed">
                O Breizh Gilles est né d&apos;une passion pour les cocktails artisanaux et les belles rencontres.
                Depuis notre ouverture, nous nous efforçons de créer une atmosphère chaleureuse où chacun
                se sent comme chez soi.
              </p>
              <p className="text-foreground/70 mb-8 leading-relaxed">
                Nos barmen passionnés créent chaque jour des cocktails uniques avec des produits frais
                et de qualité. Que vous veniez pour un after-work entre collègues ou une soirée entre amis,
                O Breizh Gilles est l&apos;endroit idéal.
              </p>
              <Button href="/contact">
                En savoir plus
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
            <div className="order-1 md:order-2 relative animate-fade-in-right">
              <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&h=500&fit=crop"
                  alt="Intérieur du O Breizh Gilles"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary-200 rounded-3xl -z-10" />
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary-100 rounded-3xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Cocktails Section */}
      <section className="py-24 bg-gradient-to-b from-primary-50/50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-in-up">
            <SectionTitle
              title="Nos cocktails"
              subtitle="Des créations originales préparées avec passion"
            />
          </div>
          {loading ? (
            <div className="text-center py-12">
              <p className="text-foreground/60">Chargement des cocktails...</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCocktails.map((cocktail, index) => (
                <div key={cocktail.id} className={`animate-fade-in-up delay-${(index + 1) * 200}`}>
                  <CocktailCard
                    name={cocktail.attributes.name}
                    description={cocktail.attributes.description}
                    image={getStrapiImageUrl(cocktail.attributes.image)}
                    price={cocktail.attributes.price}
                    category={cocktail.attributes.category}
                  />
                </div>
              ))}
            </div>
          )}
          <div className="text-center mt-12 animate-scale-in delay-600">
            <Button href="/cocktails" variant="outline">
              Voir toute la carte
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-24 bg-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-in-up">
            <SectionTitle
              title="Événements"
              subtitle="Découvrez notre programmation et ne manquez aucune soirée"
              light
            />
          </div>
          {loading ? (
            <div className="text-center py-12">
              <p className="text-white/60">Chargement des événements...</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((event, index) => {
                const eventDate = new Date(event.attributes.date)
                const time = eventDate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
                
                return (
                  <div key={event.id} className={`animate-fade-in-up delay-${(index + 1) * 200}`}>
                    <EventCard
                      title={event.attributes.title}
                      date={event.attributes.date}
                      time={time}
                      description={event.attributes.description}
                      image={getStrapiImageUrl(event.attributes.image)}
                      featured={event.attributes.featured}
                    />
                  </div>
                )
              })}
            </div>
          )}
          <div className="text-center mt-12 animate-scale-in delay-600">
            <Button href="/evenements" variant="outline" className="border-white/50 text-white hover:bg-white/10">
              <Calendar className="mr-2 w-5 h-5" />
              Tous les événements
            </Button>
          </div>
        </div>
      </section>

      {/* Instagram CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-primary-100 via-primary-50 to-white rounded-3xl p-12 text-center shadow-xl border border-primary-100 animate-scale-in">
            <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg animate-float">
              <Instagram className="w-10 h-10 text-white" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 animate-fade-in-up delay-200">
              Suivez-nous sur Instagram
            </h2>
            <p className="text-foreground/70 mb-8 text-lg max-w-lg mx-auto animate-fade-in-up delay-300">
              Restez connectés pour découvrir nos dernières créations,
              nos coulisses et nos événements en avant-première.
            </p>
            <div className="animate-fade-in-up delay-400">
              <Button
                href="https://instagram.com/yoyobar"
                external
                size="lg"
              >
                <Instagram className="mr-2 w-5 h-5" />
                @yoyobar
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
