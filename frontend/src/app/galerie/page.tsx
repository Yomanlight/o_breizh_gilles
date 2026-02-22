'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, Camera, Instagram } from 'lucide-react'
import SectionTitle from '@/components/SectionTitle'
import Button from '@/components/Button'
import { getGalleryImages, getStrapiImageUrl, type GalleryImage } from '@/lib/strapi'

export default function GaleriePage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await getGalleryImages()
        setGalleryImages(response.data)
      } catch (error) {
        console.error('Erreur lors du chargement de la galerie:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchImages()
  }, [])

  const openLightbox = (index: number) => setSelectedImage(index)
  const closeLightbox = () => setSelectedImage(null)

  const goToPrevious = () => {
    if (selectedImage === null) return
    setSelectedImage(selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1)
  }

  const goToNext = () => {
    if (selectedImage === null) return
    setSelectedImage(selectedImage === galleryImages.length - 1 ? 0 : selectedImage + 1)
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg animate-fade-in-up">
            <Camera className="w-8 h-8 text-white" />
          </div>
          <div className="animate-fade-in-up delay-100">
            <SectionTitle
              title="Galerie"
              subtitle="Revivez les meilleurs moments du O Breizh Gilles en images"
            />
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Camera className="w-10 h-10 text-primary-300 animate-pulse" />
              </div>
              <p className="text-foreground/60 text-lg">
                Chargement de la galerie...
              </p>
            </div>
          ) : galleryImages.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Camera className="w-10 h-10 text-primary-300" />
              </div>
              <p className="text-foreground/60 text-lg">
                Aucune image dans la galerie pour le moment.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {galleryImages.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => openLightbox(index)}
                  className="group relative aspect-square overflow-hidden rounded-2xl cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 animate-scale-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Image
                    src={getStrapiImageUrl(item.attributes.image)}
                    alt={item.attributes.caption || 'Photo du O Breizh Gilles'}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-white font-medium text-sm">
                      {item.attributes.caption}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            aria-label="Fermer"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              goToPrevious()
            }}
            className="absolute left-6 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            aria-label="Image précédente"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              goToNext()
            }}
            className="absolute right-6 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            aria-label="Image suivante"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image */}
          <div
            className="relative max-w-5xl max-h-[80vh] w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={getStrapiImageUrl(galleryImages[selectedImage].attributes.image)}
              alt={galleryImages[selectedImage].attributes.caption || 'Photo du O Breizh Gilles'}
              fill
              className="object-contain"
            />
          </div>

          {/* Caption & Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-3 text-center">
            {galleryImages[selectedImage].attributes.caption && (
              <p className="text-white font-medium mb-1">
                {galleryImages[selectedImage].attributes.caption}
              </p>
            )}
            <p className="text-white/60 text-sm">
              {selectedImage + 1} / {galleryImages.length}
            </p>
          </div>
        </div>
      )}

      {/* Instagram CTA */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-primary-100 via-primary-50 to-white rounded-3xl p-10 text-center shadow-xl border border-primary-100">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              Plus de photos sur Instagram
            </h3>
            <p className="text-foreground/70 mb-8 text-lg max-w-lg mx-auto">
              Suivez-nous pour découvrir nos dernières soirées et créations en temps réel !
            </p>
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
      </section>
    </div>
  )
}
