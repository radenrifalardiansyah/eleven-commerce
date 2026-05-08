'use client'

import { ProductVariant } from '@/types'
import { cn } from '@/lib/utils'

interface ProductVariantsProps {
  variants: ProductVariant[]
  selected: Record<string, string>
  onChange: (variantId: string, optionId: string) => void
}

const colorMap: Record<string, string> = {
  Hitam: 'bg-gray-900 border-gray-900',
  Putih: 'bg-white border-gray-300',
  Biru: 'bg-blue-500 border-blue-500',
  'Navy': 'bg-navy-800 border-navy-800',
  'Rose Gold': 'bg-rose-300 border-rose-300',
  Silver: 'bg-gray-300 border-gray-300',
  'Abu-abu': 'bg-gray-400 border-gray-400',
  Ungu: 'bg-purple-500 border-purple-500',
  Hijau: 'bg-green-500 border-green-500',
  Pink: 'bg-pink-400 border-pink-400',
}

export default function ProductVariants({ variants, selected, onChange }: ProductVariantsProps) {
  return (
    <div className="space-y-4">
      {variants.map((variant) => (
        <div key={variant.id}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-semibold text-gray-700">{variant.label}</span>
            {selected[variant.id] && (
              <span className="text-sm text-gray-500">
                : {variant.options.find((o) => o.id === selected[variant.id])?.value}
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {variant.options.map((option) => {
              const isSelected = selected[variant.id] === option.id
              const outOfStock = option.stock === 0
              const isColor = variant.type === 'color' && colorMap[option.value]

              if (isColor) {
                return (
                  <button
                    key={option.id}
                    disabled={outOfStock}
                    onClick={() => onChange(variant.id, option.id)}
                    title={option.value}
                    className={cn(
                      'w-8 h-8 rounded-full border-2 transition-all relative',
                      colorMap[option.value] || 'bg-gray-300 border-gray-300',
                      isSelected ? 'ring-2 ring-primary-500 ring-offset-1' : '',
                      outOfStock ? 'opacity-40 cursor-not-allowed' : 'hover:scale-110 cursor-pointer'
                    )}
                  >
                    {isSelected && (
                      <span className="absolute inset-0 flex items-center justify-center text-xs">
                        {option.value === 'Putih' ? '✓' : <span className="text-white">✓</span>}
                      </span>
                    )}
                  </button>
                )
              }

              return (
                <button
                  key={option.id}
                  disabled={outOfStock}
                  onClick={() => onChange(variant.id, option.id)}
                  className={cn(
                    'px-3 py-1.5 rounded-lg border text-sm font-medium transition-all',
                    isSelected
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 text-gray-700 hover:border-gray-300 bg-white',
                    outOfStock
                      ? 'opacity-40 cursor-not-allowed line-through'
                      : 'cursor-pointer'
                  )}
                >
                  {option.value}
                  {outOfStock && <span className="text-xs ml-1">(Habis)</span>}
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
