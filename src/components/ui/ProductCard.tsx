'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heart, Star } from 'lucide-react'
import { Product } from '@/types'
import { formatPrice, getDiscount } from '@/lib/data'
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface ProductCardProps {
  product: Product
  isReseller?: boolean
}

export default function ProductCard({ product, isReseller = false }: ProductCardProps) {
  const [wishlisted, setWishlisted] = useState(false)

  const displayPrice =
    product.isFlashSale && product.flashSalePrice
      ? product.flashSalePrice
      : isReseller
      ? product.resellerPrice
      : product.price

  const originalPrice = product.originalPrice ?? (isReseller ? product.price : null)
  const discount = originalPrice ? getDiscount(originalPrice, displayPrice) : null

  return (
    <Link href={`/products/${product.id}`} className="group card hover:shadow-md transition-shadow duration-200 flex flex-col">
      <div className="relative overflow-hidden aspect-square bg-gray-100">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        {product.badge && (
          <span
            className={cn(
              'absolute top-2 left-2 text-xs font-bold px-2 py-0.5 rounded',
              product.badge === 'new' && 'bg-blue-500 text-white',
              product.badge === 'bestseller' && 'bg-orange-500 text-white',
              product.badge === 'sale' && 'bg-red-500 text-white'
            )}
          >
            {product.badge === 'new' ? 'Baru' : product.badge === 'bestseller' ? 'Terlaris' : 'Sale'}
          </span>
        )}
        {product.isFlashSale && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">
            ⚡ Flash
          </span>
        )}
        <button
          onClick={(e) => {
            e.preventDefault()
            setWishlisted((w) => !w)
          }}
          className="absolute bottom-2 right-2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Heart
            className={cn('w-4 h-4 transition-colors', wishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400')}
          />
        </button>
      </div>

      <div className="p-3 flex flex-col flex-1">
        <p className="text-xs text-gray-400 mb-0.5">{product.category}</p>
        <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-2 group-hover:text-primary-600 transition-colors flex-1">
          {product.name}
        </h3>
        <div className="space-y-0.5">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-base font-bold text-primary-600">{formatPrice(displayPrice)}</span>
            {discount && discount > 0 && (
              <span className="text-xs font-semibold text-red-500 bg-red-50 px-1.5 py-0.5 rounded">
                -{discount}%
              </span>
            )}
          </div>
          {originalPrice && originalPrice !== displayPrice && (
            <p className="text-xs text-gray-400 line-through">{formatPrice(originalPrice)}</p>
          )}
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-0.5">
            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
            <span className="text-xs text-gray-600 font-medium">{product.rating}</span>
            <span className="text-xs text-gray-400 ml-0.5">({product.reviewCount.toLocaleString()})</span>
          </div>
          <span className="text-xs text-gray-400">{product.sold.toLocaleString()} terjual</span>
        </div>
        <p className="text-xs text-gray-400 mt-0.5 truncate">{product.location}</p>
      </div>
    </Link>
  )
}
