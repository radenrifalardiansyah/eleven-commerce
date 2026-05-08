import Link from 'next/link'
import { categories } from '@/lib/data'
import { cn } from '@/lib/utils'

export default function CategoryNav() {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">Kategori Pilihan</h2>
        <Link href="/products" className="text-sm font-medium text-primary-500 hover:text-primary-600 transition-colors">
          Lihat Semua
        </Link>
      </div>
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/products?category=${cat.slug}`}
            className="flex flex-col items-center gap-2 group"
          >
            <div
              className={cn(
                'w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-2xl transition-transform group-hover:scale-110',
                cat.color
              )}
            >
              {cat.icon}
            </div>
            <span className="text-xs font-medium text-gray-600 group-hover:text-primary-600 transition-colors text-center leading-tight">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
