'use client'

import { useState, useEffect } from 'react'
import { Wine } from 'lucide-react'
import CocktailCard from '@/components/CocktailCard'
import SectionTitle from '@/components/SectionTitle'
import { getCocktails, getStrapiImageUrl, type Cocktail } from '@/lib/strapi'

const categories = ['Tous', 'Cocktail', 'Mocktail', 'Biere', 'Vin', 'Soft']

export default function CocktailsPage() {
  const [activeCategory, setActiveCategory] = useState('Tous')
  const [cocktails, setCocktails] = useState<Cocktail[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCocktails = async () => {
      try {
        const response = await getCocktails()
        setCocktails(response.data)
      } catch (error) {
        console.error('Erreur lors du chargement des cocktails:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchCocktails()
  }, [])

  const filteredCocktails = activeCategory === 'Tous'
    ? cocktails
    : cocktails.filter((c) => c.attributes.category === activeCategory)

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg animate-fade-in-up">
            <Wine className="w-8 h-8 text-white" />
          </div>
          <div className="animate-fade-in-up delay-100">
            <SectionTitle
              title="Nos cocktails"
              subtitle="Découvrez notre carte de cocktails artisanaux, préparés avec passion par nos barmen experts"
            />
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 sticky top-[72px] z-40 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-primary-100/50 p-3 animate-fade-in-up delay-200">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category, index) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 animate-scale-in ${
                    activeCategory === category
                      ? 'bg-gradient-to-r from-primary-400 to-primary-500 text-white shadow-md'
                      : 'text-foreground/70 hover:text-foreground hover:bg-primary-50'
                  }`}
                  style={{ animationDelay: `${300 + index * 50}ms` }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cocktails Grid */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Wine className="w-10 h-10 text-primary-300 animate-pulse" />
              </div>
              <p className="text-foreground/60 text-lg">
                Chargement des cocktails...
              </p>
            </div>
          ) : filteredCocktails.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Wine className="w-10 h-10 text-primary-300" />
              </div>
              <p className="text-foreground/60 text-lg">
                Aucun cocktail dans cette catégorie pour le moment.
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCocktails.map((cocktail, index) => (
                <div
                  key={cocktail.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
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
        </div>
      </section>

      {/* Info Banner */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-foreground to-foreground/90 rounded-3xl p-10 text-center shadow-xl">
            <h3 className="font-display text-2xl md:text-3xl font-semibold text-white mb-4">
              Une envie particulière ?
            </h3>
            <p className="text-white/70 text-lg">
              Nos barmen peuvent créer un cocktail sur mesure selon vos goûts.
              N&apos;hésitez pas à leur demander conseil !
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
