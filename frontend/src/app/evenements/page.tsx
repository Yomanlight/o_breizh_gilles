'use client'

import { useState, useEffect } from 'react'
import { Calendar, Mail } from 'lucide-react'
import EventCard from '@/components/EventCard'
import SectionTitle from '@/components/SectionTitle'
import Button from '@/components/Button'
import { getEvents, getStrapiImageUrl, type Event } from '@/lib/strapi'

type FilterType = 'all' | 'upcoming' | 'past'

export default function EvenementsPage() {
  const [filter, setFilter] = useState<FilterType>('upcoming')
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getEvents()
        setEvents(response.data)
      } catch (error) {
        console.error('Erreur lors du chargement des événements:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [])

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.attributes.date)
    if (filter === 'upcoming') return eventDate >= today
    if (filter === 'past') return eventDate < today
    return true
  })

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg animate-fade-in-up">
            <Calendar className="w-8 h-8 text-white" />
          </div>
          <div className="animate-fade-in-up delay-100">
            <SectionTitle
              title="Événements"
              subtitle="Soirées DJ, concerts live, after-works... Découvrez notre programmation et rejoignez-nous !"
            />
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 sticky top-[72px] z-40 px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-primary-100/50 p-2 animate-fade-in-up delay-200">
            <div className="flex justify-center gap-1">
              <button
                onClick={() => setFilter('upcoming')}
                className={`flex-1 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 animate-scale-in delay-300 ${
                  filter === 'upcoming'
                    ? 'bg-gradient-to-r from-primary-400 to-primary-500 text-white shadow-md'
                    : 'text-foreground/70 hover:text-foreground hover:bg-primary-50'
                }`}
              >
                A venir
              </button>
              <button
                onClick={() => setFilter('past')}
                className={`flex-1 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 animate-scale-in delay-400 ${
                  filter === 'past'
                    ? 'bg-gradient-to-r from-primary-400 to-primary-500 text-white shadow-md'
                    : 'text-foreground/70 hover:text-foreground hover:bg-primary-50'
                }`}
              >
                Passés
              </button>
              <button
                onClick={() => setFilter('all')}
                className={`flex-1 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 animate-scale-in delay-500 ${
                  filter === 'all'
                    ? 'bg-gradient-to-r from-primary-400 to-primary-500 text-white shadow-md'
                    : 'text-foreground/70 hover:text-foreground hover:bg-primary-50'
                }`}
              >
                Tous
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-10 h-10 text-primary-300 animate-pulse" />
              </div>
              <p className="text-foreground/60 text-lg">
                Chargement des événements...
              </p>
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-10 h-10 text-primary-300" />
              </div>
              <p className="text-foreground/60 text-lg mb-2">
                {filter === 'upcoming'
                  ? 'Pas d\'événements à venir pour le moment.'
                  : filter === 'past'
                  ? 'Aucun événement passé.'
                  : 'Aucun événement.'}
              </p>
              <p className="text-foreground/50">
                Suivez-nous sur Instagram pour ne rien manquer !
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event, index) => {
                const eventDate = new Date(event.attributes.date)
                const time = eventDate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
                
                return (
                  <div
                    key={event.id}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
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
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-primary-100 via-primary-50 to-white rounded-3xl p-10 text-center shadow-xl border border-primary-100">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              Vous souhaitez privatiser le bar ?
            </h3>
            <p className="text-foreground/70 mb-8 text-lg max-w-lg mx-auto">
              O Breizh Gilles est disponible pour vos événements privés :
              anniversaires, afterworks, soirées d&apos;entreprise...
            </p>
            <Button href="mailto:contact@yoyobar.fr" size="lg">
              <Mail className="mr-2 w-5 h-5" />
              Contactez-nous
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
