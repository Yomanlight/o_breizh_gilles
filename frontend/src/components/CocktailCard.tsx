import Image from 'next/image'

interface CocktailCardProps {
  name: string
  description?: string
  image: string
  price?: number
  category?: string
}

export default function CocktailCard({ name, description, image, price, category }: CocktailCardProps) {
  return (
    <div className="group relative bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-primary-100/50">
      {/* Image Container */}
      <div className="relative h-72 overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Category Badge */}
        {category && (
          <div className="absolute top-4 left-4">
            <span className="px-4 py-1.5 bg-white/95 backdrop-blur-sm text-primary-500 text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
              {category}
            </span>
          </div>
        )}

        {/* Price Badge */}
        {price && (
          <div className="absolute top-4 right-4">
            <span className="px-4 py-2 bg-gradient-to-r from-primary-400 to-primary-500 text-white font-bold rounded-2xl shadow-lg">
              {price.toFixed(0)} &euro;
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-primary-500 transition-colors">
          {name}
        </h3>
        {description && (
          <p className="text-foreground/60 text-sm leading-relaxed line-clamp-2">
            {description}
          </p>
        )}
      </div>

      {/* Bottom Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-300 via-primary-400 to-primary-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    </div>
  )
}
