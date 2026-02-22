import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: "O Breizh Gilles - Bar & Cocktails",
  description: "Bienvenue à O Breizh Gilles, votre bar convivial pour des cocktails d'exception et des soirées inoubliables.",
  keywords: ['bar', 'cocktails', 'soirées', 'événements', 'O Breizh Gilles'],
  openGraph: {
    title: "O Breizh Gilles - Bar & Cocktails",
    description: "Bienvenue à O Breizh Gilles, votre bar convivial pour des cocktails d'exception et des soirées inoubliables.",
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
