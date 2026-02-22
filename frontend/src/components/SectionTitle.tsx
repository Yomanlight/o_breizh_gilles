interface SectionTitleProps {
  title: string
  subtitle?: string
  centered?: boolean
  light?: boolean
}

export default function SectionTitle({ title, subtitle, centered = true, light = false }: SectionTitleProps) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
      <h2 className={`font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${light ? 'text-white' : 'text-foreground'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-lg max-w-2xl ${centered ? 'mx-auto' : ''} ${light ? 'text-white/70' : 'text-foreground/60'}`}>
          {subtitle}
        </p>
      )}
      <div className={`mt-6 flex items-center gap-2 ${centered ? 'justify-center' : ''}`}>
        <div className={`h-1 w-12 rounded-full ${light ? 'bg-white/30' : 'bg-primary-200'}`} />
        <div className={`h-2 w-2 rounded-full ${light ? 'bg-primary-300' : 'bg-primary-400'}`} />
        <div className={`h-1 w-24 rounded-full ${light ? 'bg-primary-300' : 'bg-primary-400'}`} />
        <div className={`h-2 w-2 rounded-full ${light ? 'bg-primary-300' : 'bg-primary-400'}`} />
        <div className={`h-1 w-12 rounded-full ${light ? 'bg-white/30' : 'bg-primary-200'}`} />
      </div>
    </div>
  )
}
