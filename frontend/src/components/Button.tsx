import Link from 'next/link'

interface ButtonProps {
  children: React.ReactNode
  href?: string
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'liquid-glass'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onClick?: () => void
  external?: boolean
}

export default function Button({
  children,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  external = false,
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-2xl transition-all duration-300'

  const variants = {
    primary: 'bg-gradient-to-r from-primary-400 to-primary-500 text-white shadow-lg hover:shadow-xl hover:scale-105',
    secondary: 'bg-foreground text-white hover:bg-foreground/90 shadow-lg hover:shadow-xl',
    outline: 'border-2 border-primary-400 text-primary-500 hover:bg-primary-50',
    ghost: 'text-foreground/70 hover:text-foreground hover:bg-primary-50',
    'liquid-glass': 'bg-gradient-to-r from-primary-400 to-primary-500 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300',
  }

  const sizes = {
    sm: 'px-5 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const styles = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={styles}>
          {children}
        </a>
      )
    }
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    )
  }

  return (
    <button onClick={onClick} className={styles}>
      {children}
    </button>
  )
}
