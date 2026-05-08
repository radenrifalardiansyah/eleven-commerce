import Image from 'next/image'
import { Star } from 'lucide-react'
import { Review } from '@/types'
import Rating from '@/components/ui/Rating'
import { cn } from '@/lib/utils'

interface ProductReviewsProps {
  reviews: Review[]
  rating: number
  reviewCount: number
}

const ratingBars = [5, 4, 3, 2, 1]

export default function ProductReviews({ reviews, rating, reviewCount }: ProductReviewsProps) {
  const countByRating = ratingBars.map((r) => ({
    stars: r,
    count: reviews.filter((rv) => Math.round(rv.rating) === r).length,
  }))
  const maxCount = Math.max(...countByRating.map((r) => r.count), 1)

  return (
    <div>
      <h3 className="text-lg font-bold text-gray-900 mb-4">Ulasan Pembeli</h3>

      {/* Summary */}
      <div className="flex flex-col sm:flex-row gap-6 p-5 bg-orange-50 rounded-2xl mb-6">
        <div className="flex flex-col items-center justify-center min-w-[100px]">
          <span className="text-5xl font-black text-primary-600">{rating.toFixed(1)}</span>
          <Rating value={rating} size="sm" />
          <span className="text-xs text-gray-500 mt-1">{reviewCount.toLocaleString()} ulasan</span>
        </div>
        <div className="flex-1 space-y-1.5">
          {countByRating.map(({ stars, count }) => (
            <div key={stars} className="flex items-center gap-2">
              <div className="flex items-center gap-0.5 w-16">
                {Array.from({ length: stars }).map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-400 rounded-full transition-all"
                  style={{ width: `${(count / maxCount) * 100}%` }}
                />
              </div>
              <span className="text-xs text-gray-500 w-8 text-right">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Review list */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-gray-100 pb-4 last:border-0">
            <div className="flex items-start gap-3">
              <Image
                src={review.userAvatar}
                alt={review.userName}
                width={36}
                height={36}
                className="rounded-full flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center flex-wrap gap-x-2 gap-y-0.5 mb-1">
                  <span className="font-semibold text-sm text-gray-800">{review.userName}</span>
                  {review.variant && (
                    <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                      {review.variant}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Rating value={review.rating} size="sm" />
                  <span className="text-xs text-gray-400">
                    {new Date(review.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{review.comment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
