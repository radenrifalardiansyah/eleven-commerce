'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronLeft, Trash2, ShoppingCart } from 'lucide-react'
import { products, formatPrice } from '@/lib/data'
import ProductCard from '@/components/ui/ProductCard'
import Image from 'next/image'
import { cn } from '@/lib/utils'

const initialWishlist = [products[0], products[2], products[6], products[10]]

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState(initialWishlist)

  const remove = (id: string) => setWishlist((w) => w.filter((p) => p.id !== id))

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/dashboard" className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <h1 className="text-xl font-bold text-gray-900">Wishlist</h1>
        <span className="text-sm text-gray-400">({wishlist.length} produk)</span>
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">💝</p>
          <p className="text-lg font-semibold text-gray-700 mb-2">Wishlist kamu masih kosong</p>
          <p className="text-sm text-gray-400 mb-6">Simpan produk favoritmu agar mudah ditemukan nanti</p>
          <Link href="/products" className="btn-primary px-8 py-3 rounded-xl">
            Jelajahi Produk
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
            {wishlist.map((product) => (
              <div key={product.id} className="relative group">
                <ProductCard product={product} />
                <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => remove(product.id)}
                    className="w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-md flex items-center justify-center transition-colors"
                    title="Hapus dari wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Move all to cart */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-800">Pindahkan ke Keranjang</p>
              <p className="text-sm text-gray-400">Tambahkan semua produk wishlist ke keranjang belanja</p>
            </div>
            <Link
              href="/cart"
              className="flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm"
            >
              <ShoppingCart className="w-4 h-4" />
              Pindahkan Semua
            </Link>
          </div>
        </>
      )}
    </main>
  )
}
