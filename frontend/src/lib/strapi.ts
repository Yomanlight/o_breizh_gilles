const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN

interface StrapiResponse<T> {
  data: T
  meta?: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

interface StrapiImage {
  data: {
    attributes: {
      url: string
      alternativeText?: string
      width: number
      height: number
    }
  } | null
}

export interface Cocktail {
  id: number
  attributes: {
    name: string
    description?: string
    price?: number
    category?: string
    image: StrapiImage
    createdAt: string
    updatedAt: string
  }
}

export interface Event {
  id: number
  attributes: {
    title: string
    date: string
    description?: string
    image: StrapiImage
    featured?: boolean
    createdAt: string
    updatedAt: string
  }
}

export interface GalleryImage {
  id: number
  attributes: {
    caption?: string
    date?: string
    image: StrapiImage
    createdAt: string
    updatedAt: string
  }
}

export interface BarInfo {
  id: number
  attributes: {
    address?: string
    phone?: string
    email?: string
    instagramUrl?: string
    googleMapsUrl?: string
    aboutText?: string
    heroImage: StrapiImage
  }
}

async function fetchAPI<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  }

  if (STRAPI_API_TOKEN) {
    headers['Authorization'] = `Bearer ${STRAPI_API_TOKEN}`
  }

  const res = await fetch(`${STRAPI_URL}/api${endpoint}`, {
    ...options,
    cache: 'no-store',
    headers: {
      ...headers,
      ...options.headers,
    },
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch ${endpoint}: ${res.statusText}`)
  }

  return res.json()
}

export async function getCocktails(): Promise<StrapiResponse<Cocktail[]>> {
  return fetchAPI('/cocktails?populate=image&sort=name:asc')
}

export async function getCocktail(id: number): Promise<StrapiResponse<Cocktail>> {
  return fetchAPI(`/cocktails/${id}?populate=image`)
}

export async function getEvents(): Promise<StrapiResponse<Event[]>> {
  return fetchAPI('/events?populate=image&sort=date:asc')
}

export async function getUpcomingEvents(): Promise<StrapiResponse<Event[]>> {
  const today = new Date().toISOString().split('T')[0]
  return fetchAPI(`/events?populate=image&filters[date][$gte]=${today}&sort=date:asc`)
}

export async function getEvent(id: number): Promise<StrapiResponse<Event>> {
  return fetchAPI(`/events/${id}?populate=image`)
}

export async function getGalleryImages(): Promise<StrapiResponse<GalleryImage[]>> {
  return fetchAPI('/gallery-images?populate=image&sort=date:desc')
}

export async function getBarInfo(): Promise<StrapiResponse<BarInfo>> {
  return fetchAPI('/bar-info?populate=heroImage')
}

export function getStrapiImageUrl(image: StrapiImage): string {
  if (!image.data) {
    return '/placeholder-image.jpg'
  }
  const url = image.data.attributes.url
  if (url.startsWith('http')) {
    return url
  }
  return `${STRAPI_URL}${url}`
}

// Données de démonstration pour le développement sans Strapi
export const mockCocktails = [
  {
    id: 1,
    name: 'Mojito Royal',
    description: 'Notre signature : rhum blanc, menthe fraîche, citron vert, champagne',
    price: 12,
    category: 'Cocktail',
    image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&h=500&fit=crop',
  },
  {
    id: 2,
    name: 'Passion Sunset',
    description: 'Vodka, fruit de la passion, jus d\'orange, grenadine',
    price: 11,
    category: 'Cocktail',
    image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?w=400&h=500&fit=crop',
  },
  {
    id: 3,
    name: 'Rose Garden',
    description: 'Gin, sirop de rose, citron, tonic premium',
    price: 13,
    category: 'Cocktail',
    image: 'https://images.unsplash.com/photo-1587223962930-cb7f31384c19?w=400&h=500&fit=crop',
  },
  {
    id: 4,
    name: 'Virgin Colada',
    description: 'Ananas, coco, crème, sans alcool',
    price: 8,
    category: 'Mocktail',
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=500&fit=crop',
  },
  {
    id: 5,
    name: 'Espresso Martini',
    description: 'Vodka, liqueur de café, espresso frais',
    price: 12,
    category: 'Cocktail',
    image: 'https://images.unsplash.com/photo-1545438102-799c3991ffb2?w=400&h=500&fit=crop',
  },
  {
    id: 6,
    name: 'Berry Bliss',
    description: 'Fruits rouges, citron, soda, sans alcool',
    price: 7,
    category: 'Mocktail',
    image: 'https://images.unsplash.com/photo-1497534446932-c925b458314e?w=400&h=500&fit=crop',
  },
]

export const mockEvents = [
  {
    id: 1,
    title: 'Soirée DJ Latino',
    date: '2025-01-15',
    time: '21h00',
    description: 'Une soirée aux rythmes endiablés avec DJ Carlos ! Salsa, reggaeton et bonne ambiance garantie.',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=400&fit=crop',
    featured: true,
  },
  {
    id: 2,
    title: 'After Work Cocktails',
    date: '2025-01-18',
    time: '18h00',
    description: 'Tous les jeudis, profitez de -20% sur tous nos cocktails de 18h à 20h.',
    image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600&h=400&fit=crop',
    featured: false,
  },
  {
    id: 3,
    title: 'Soirée Jazz',
    date: '2025-01-25',
    time: '20h00',
    description: 'Concert live avec le quartet de Sophie Martin. Une soirée élégante et décontractée.',
    image: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=600&h=400&fit=crop',
    featured: true,
  },
]

export const mockGalleryImages = [
  { id: 1, image: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=600&h=400&fit=crop', caption: 'Notre bar' },
  { id: 2, image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&h=400&fit=crop', caption: 'Ambiance soirée' },
  { id: 3, image: 'https://images.unsplash.com/photo-1560512823-829485b8bf24?w=600&h=400&fit=crop', caption: 'Nos cocktails' },
  { id: 4, image: 'https://images.unsplash.com/photo-1575444758702-4a6b9222336e?w=600&h=400&fit=crop', caption: 'Soirée DJ' },
  { id: 5, image: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=600&h=400&fit=crop', caption: 'Happy hour' },
  { id: 6, image: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=600&h=400&fit=crop', caption: 'Terrasse' },
]
