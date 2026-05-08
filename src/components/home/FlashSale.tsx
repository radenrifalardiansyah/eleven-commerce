'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Zap } from 'lucide-react'
import { flashSaleProducts } from '@/lib/data'
import ProductCard from '@/components/ui/ProductCard'

function useCountdown(endTime: string) {
  const calc = () => {
    const diff = new Date(endTime).getTime() - Date.now()
    if (diff <= 0) return { h: '00', m: '00', s: '00' }
    const h = String(Math.floor(diff / 3600000)).padStart(2, '0')
    const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0')
    const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0')
    return { h, m, s }
  }
  const [time, setTime] = useState(calc)
  useEffect(() => {
    const t = setInterval(() => setTime(calc()), 1000)
    return () => clearInterval(t)
  }, [endTime])
  return time
}

export default function FlashSale() {
  const endTime = flashSaleProducts[0]?.flashSaleEnds ?? new Date(Date.now() + 6 * 3600000).toISOString()
  const { h, m, s } = useCountdown(endTime)

  if (!flashSaleProducts.length) return null

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-red-500 text-white px-3 py-1.5 rounded-lg font-bold text-sm">
            <Zap className="w-4 h-4 fill-white" />
            Flash Sale
          </div>
          <div className="flex items-center gap-1 text-sm font-medium text-gray-600">
            <span>Berakhir dalam</span>
            {[h, m, s].map((unit, i) => (
              <span key={i} className="inline-flex items-center gap-1">
                <span className="bg-gray-900 text-white font-mono font-bold px-2 py-0.5 rounded text-sm">
                  {unit}
                </span>
                {i < 2 && <span className="text-gray-600 font-bold">:</span>}
              </span>
            ))}
          </div>
        </div>
        <Link href="/products?sale=true" className="text-sm font-medium text-primary-500 hover:text-primary-600 transition-colors">
          Lihat Semua
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {flashSaleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
