import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface RatingProps {
  value: number
  max?: number
  size?: 'sm' | 'md' | 'lg'
  showValue?: boolean
  count?: number
}

const sizeMap = { sm: 'w-3.5 h-3.5', md: 'w-4 h-4', lg: 'w-5 h-5' }

export default function Rating({ value, max = 5, size = 'md', showValue = false, count }: RatingProps) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: max }).map((_, i) => {
          const filled = i < Math.floor(value)
          const partial = !filled && i < value
          return (
            <div key={i} className="relative">
              <Star className={cn(sizeMap[size], 'text-gray-200')} fill="currentColor" />
              {(filled || partial) && (
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: filled ? '100%' : `${(value % 1) * 100}%` }}
                >
                  <Star className={cn(sizeMap[size], 'text-yellow-400')} fill="currentColor" />
                </div>
              )}
            </div>
          )
        })}
      </div>
      {showValue && (
        <span className="text-sm font-semibold text-gray-700">{value.toFixed(1)}</span>
      )}
      {count !== undefined && (
        <span className="text-sm text-gray-500">({count.toLocaleString()})</span>
      )}
    </div>
  )
}
