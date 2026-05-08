'use client'

import { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { SlidersHorizontal, Search, X, ChevronDown } from 'lucide-react'
import { products, categories, formatPrice } from '@/lib/data'
import ProductCard from '@/components/ui/ProductCard'
import { cn } from '@/lib/utils'
import { Suspense } from 'react'

type SortOption = 'relevant' | 'price-asc' | 'price-desc' | 'rating' | 'newest' | 'popular'

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'relevant', label: 'Relevan' },
  { value: 'popular', label: 'Terpopuler' },
  { value: 'rating', label: 'Rating Tertinggi' },
  { value: 'price-asc', label: 'Harga: Termurah' },
  { value: 'price-desc', label: 'Harga: Termahal' },
  { value: 'newest', label: 'Terbaru' },
]

const priceRanges = [
  { label: 'Semua Harga', min: 0, max: Infinity },
  { label: 'Di bawah Rp 100rb', min: 0, max: 100000 },
  { label: 'Rp 100rb - 300rb', min: 100000, max: 300000 },
  { label: 'Rp 300rb - 500rb', min: 300000, max: 500000 },
  { label: 'Di atas Rp 500rb', min: 500000, max: Infinity },
]

function ProductsContent() {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('search') ?? ''
  const categoryParam = searchParams.get('category') ?? ''
  const saleParam = searchParams.get('sale') === 'true'

  const [query, setQuery] = useState(searchQuery)
  const [sort, setSort] = useState<SortOption>('relevant')
  const [selectedCategory, setSelectedCategory] = useState(categoryParam)
  const [priceRange, setPriceRange] = useState(0)
  const [minRating, setMinRating] = useState(0)
  const [showFilter, setShowFilter] = useState(false)

  const filtered = useMemo(() => {
    let list = [...products]

    if (saleParam) list = list.filter((p) => p.isFlashSale || p.badge === 'sale')
    if (query) {
      const q = query.toLowerCase()
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((t) => t.includes(q)) ||
          p.description.toLowerCase().includes(q)
      )
    }
    if (selectedCategory) {
      const cat = categories.find((c) => c.slug === selectedCategory)
      if (cat) list = list.filter((p) => p.categoryId === cat.id)
    }
    const range = priceRanges[priceRange]
    list = list.filter((p) => p.price >= range.min && p.price <= range.max)
    if (minRating > 0) list = list.filter((p) => p.rating >= minRating)

    switch (sort) {
      case 'price-asc': list.sort((a, b) => a.price - b.price); break
      case 'price-desc': list.sort((a, b) => b.price - a.price); break
      case 'rating': list.sort((a, b) => b.rating - a.rating); break
      case 'popular': list.sort((a, b) => b.sold - a.sold); break
    }

    return list
  }, [query, sort, selectedCategory, priceRange, minRating, saleParam])

  const activeFilters = [
    selectedCategory && categories.find((c) => c.slug === selectedCategory)?.name,
    priceRange > 0 && priceRanges[priceRange].label,
    minRating > 0 && `Min. ${minRating}★`,
  ].filter(Boolean) as string[]

  const FilterPanel = () => (
    <div className="space-y-6">
      {/* Category */}
      <div>
        <h3 className="font-semibold text-gray-800 mb-3">Kategori</h3>
        <div className="space-y-1.5">
          <button
            onClick={() => setSelectedCategory('')}
            className={cn('w-full text-left text-sm px-3 py-2 rounded-lg transition-colors', !selectedCategory ? 'bg-primary-50 text-primary-700 font-medium' : 'text-gray-600 hover:bg-gray-50')}
          >
            Semua Kategori
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.slug)}
              className={cn('w-full text-left text-sm px-3 py-2 rounded-lg transition-colors flex items-center gap-2', selectedCategory === cat.slug ? 'bg-primary-50 text-primary-700 font-medium' : 'text-gray-600 hover:bg-gray-50')}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
              <span className="ml-auto text-xs text-gray-400">{cat.productCount.toLocaleString()}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Price range */}
      <div>
        <h3 className="font-semibold text-gray-800 mb-3">Rentang Harga</h3>
        <div className="space-y-1.5">
          {priceRanges.map((range, i) => (
            <button
              key={i}
              onClick={() => setPriceRange(i)}
              className={cn('w-full text-left text-sm px-3 py-2 rounded-lg transition-colors', priceRange === i ? 'bg-primary-50 text-primary-700 font-medium' : 'text-gray-600 hover:bg-gray-50')}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div>
        <h3 className="font-semibold text-gray-800 mb-3">Rating Minimum</h3>
        <div className="space-y-1.5">
          {[0, 4, 4.5, 3].map((r) => (
            <button
              key={r}
              onClick={() => setMinRating(r)}
              className={cn('w-full text-left text-sm px-3 py-2 rounded-lg transition-colors', minRating === r ? 'bg-primary-50 text-primary-700 font-medium' : 'text-gray-600 hover:bg-gray-50')}
            >
              {r === 0 ? 'Semua Rating' : `${r}★ ke atas`}
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Search bar */}
      <div className="flex gap-3 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari produk..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-500 bg-white"
          />
          {query && (
            <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2">
              <X className="w-4 h-4 text-gray-400" />
            </button>
          )}
        </div>
        <button
          onClick={() => setShowFilter(!showFilter)}
          className={cn('flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors lg:hidden', showFilter ? 'bg-primary-50 border-primary-300 text-primary-700' : 'border-gray-200 text-gray-600 bg-white')}
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filter
          {activeFilters.length > 0 && (
            <span className="bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {activeFilters.length}
            </span>
          )}
        </button>
      </div>

      <div className="flex gap-6">
        {/* Sidebar filter - desktop */}
        <aside className="hidden lg:block w-56 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-24">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-gray-900">Filter</h2>
              {activeFilters.length > 0 && (
                <button
                  onClick={() => { setSelectedCategory(''); setPriceRange(0); setMinRating(0) }}
                  className="text-xs text-primary-500 hover:text-primary-600"
                >
                  Reset
                </button>
              )}
            </div>
            <FilterPanel />
          </div>
        </aside>

        {/* Mobile filter panel */}
        {showFilter && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black/50 flex items-end" onClick={() => setShowFilter(false)}>
            <div className="bg-white w-full max-h-[80vh] rounded-t-2xl p-6 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-bold text-lg">Filter</h2>
                <button onClick={() => setShowFilter(false)}><X className="w-5 h-5" /></button>
              </div>
              <FilterPanel />
              <button
                onClick={() => setShowFilter(false)}
                className="w-full mt-6 btn-primary py-3 rounded-xl"
              >
                Terapkan Filter ({filtered.length} produk)
              </button>
            </div>
          </div>
        )}

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Sort bar */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-gray-500">
                {filtered.length} produk{query && ` untuk "${query}"`}
              </span>
              {activeFilters.map((f) => (
                <span key={f} className="text-xs bg-primary-50 text-primary-700 px-2.5 py-1 rounded-full font-medium">
                  {f}
                </span>
              ))}
            </div>
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="appearance-none pl-3 pr-8 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary-400 bg-white text-gray-700 cursor-pointer"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Products grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-5xl mb-4">🔍</p>
              <p className="text-lg font-semibold text-gray-700 mb-2">Produk tidak ditemukan</p>
              <p className="text-sm text-gray-400">Coba kata kunci atau filter yang berbeda</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-96"><div className="animate-spin w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full" /></div>}>
      <ProductsContent />
    </Suspense>
  )
}
