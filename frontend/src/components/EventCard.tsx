import Image from 'next/image'
import { Calendar, Clock, Sparkles } from 'lucide-react'

interface EventCardProps {
  title: string
  date: string
  time?: string
  description?: string
  image: string
  featured?: boolean
}

export default function EventCard({ title, date, time, description, image, featured = false }: EventCardProps) {
  const formattedDate = new Date(date).toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })

  return (
    <div className={`group relative bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border ${featured ? 'border-primary-300 ring-2 ring-primary-200' : 'border-primary-100/50'}`}>
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Featured Badge */}
        {featured && (
          <div className="absolute top-4 right-4">
            <span className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-primary-400 to-primary-500 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
              <Sparkles className="w-3.5 h-3.5" />
              A ne pas manquer
            </span>
          </div>
        )}

        {/* Title on Image */}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="font-display text-2xl font-bold text-white drop-shadow-lg">
            {title}
          </h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Date & Time */}
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-xl">
            <Calendar className="w-4 h-4 text-primary-500" />
            <span className="text-sm font-medium text-foreground capitalize">{formattedDate}</span>
          </div>
          {time && (
            <div className="flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-xl">
              <Clock className="w-4 h-4 text-primary-500" />
              <span className="text-sm font-medium text-foreground">{time}</span>
            </div>
          )}
        </div>

        {/* Description */}
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
