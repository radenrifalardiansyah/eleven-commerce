'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const slides = [
  {
    id: 1,
    title: 'Flash Sale Spesial',
    subtitle: 'Diskon hingga 70% untuk ribuan produk pilihan',
    cta: 'Belanja Sekarang',
    href: '/products?sale=true',
    bg: 'from-orange-500 to-red-600',
    accent: 'bg-yellow-400',
    emoji: '⚡',
  },
  {
    id: 2,
    title: 'Program Reseller Gold',
    subtitle: 'Dapatkan harga grosir eksklusif & keuntungan berlipat ganda',
    cta: 'Daftar Reseller',
    href: '/reseller',
    bg: 'from-primary-600 to-orange-500',
    accent: 'bg-white',
    emoji: '🏆',
  },
  {
    id: 3,
    title: 'Produk Elektronik Terbaru',
    subtitle: 'Gadget & aksesoris terkini dengan harga terbaik',
    cta: 'Jelajahi Sekarang',
    href: '/products?category=elektronik',
    bg: 'from-blue-600 to-blue-400',
    accent: 'bg-cyan-300',
    emoji: '💻',
  },
]

export default function HeroBanner() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 4000)
    return () => clearInterval(timer)
  }, [])

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length)
  const next = () => setCurrent((c) => (c + 1) % slides.length)

  return (
    <div className="relative rounded-2xl overflow-hidden h-48 sm:h-60 md:h-72 lg:h-80 select-none">
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          className={cn(
            'absolute inset-0 bg-gradient-to-r transition-opacity duration-700 flex items-center',
            slide.bg,
            i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          )}
        >
          {/* Decorative circles */}
          <div className={cn('absolute right-8 top-4 w-32 h-32 rounded-full opacity-20', slide.accent)} />
          <div className={cn('absolute right-20 bottom-4 w-20 h-20 rounded-full opacity-15', slide.accent)} />
          <div className={cn('absolute right-4 bottom-8 w-12 h-12 rounded-full opacity-25', slide.accent)} />

          <div className="relative z-10 px-8 sm:px-12 max-w-lg">
            <span className="text-4xl mb-2 block">{slide.emoji}</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-2 leading-tight">
              {slide.title}
            </h2>
            <p className="text-white/80 text-sm sm:text-base mb-5 leading-relaxed">{slide.subtitle}</p>
            <Link
              href={slide.href}
              className="inline-flex items-center gap-2 bg-white text-gray-900 font-bold px-5 py-2.5 rounded-xl hover:bg-gray-100 transition-colors text-sm sm:text-base shadow-lg"
            >
              {slide.cta}
            </Link>
          </div>
        </div>
      ))}

      {/* Controls */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={cn(
              'rounded-full transition-all duration-300',
              i === current ? 'bg-white w-5 h-2' : 'bg-white/50 w-2 h-2'
            )}
          />
        ))}
      </div>
    </div>
  )
}
