'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, ShoppingCart, User, Menu, X, Bell, ChevronDown, Heart, Package } from 'lucide-react'
import { categories } from '@/lib/data'
import { cn } from '@/lib/utils'

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cartCount] = useState(3)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top notification bar */}
      <div className="bg-primary-500 text-white text-center py-1.5 text-xs font-medium">
        Gratis Ongkir Min. Pembelian Rp 150.000! &nbsp;|&nbsp; Download App Eleven-Commerce &amp; Dapatkan Voucher Rp 50.000
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 py-3">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <span className="text-2xl font-black text-gray-900">
              Eleven<span className="text-primary-500">Commerce</span>
            </span>
          </Link>

          {/* Search bar - desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl">
            <div className="flex w-full rounded-xl border-2 border-primary-500 overflow-hidden">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari produk, toko, atau kategori..."
                className="flex-1 px-4 py-2.5 text-sm outline-none text-gray-700 placeholder-gray-400"
              />
              <button
                type="submit"
                className="bg-primary-500 hover:bg-primary-600 text-white px-5 py-2.5 flex items-center gap-2 font-medium text-sm transition-colors"
              >
                <Search className="w-4 h-4" />
                <span className="hidden lg:inline">Cari</span>
              </button>
            </div>
          </form>

          {/* Right actions */}
          <div className="flex items-center gap-2 ml-auto md:ml-0">
            <Link
              href="/dashboard/wishlist"
              className="hidden sm:flex items-center gap-1.5 text-gray-600 hover:text-primary-500 transition-colors px-2 py-2 rounded-lg hover:bg-gray-50"
            >
              <Heart className="w-5 h-5" />
              <span className="text-xs font-medium hidden lg:inline">Wishlist</span>
            </Link>

            <Link
              href="/cart"
              className="relative flex items-center gap-1.5 text-gray-600 hover:text-primary-500 transition-colors px-2 py-2 rounded-lg hover:bg-gray-50"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="text-xs font-medium hidden lg:inline">Keranjang</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link
              href="/dashboard/orders"
              className="hidden sm:flex items-center gap-1.5 text-gray-600 hover:text-primary-500 transition-colors px-2 py-2 rounded-lg hover:bg-gray-50"
            >
              <Package className="w-5 h-5" />
              <span className="text-xs font-medium hidden lg:inline">Pesanan</span>
            </Link>

            <Link
              href="/dashboard"
              className="hidden sm:flex items-center gap-1.5 text-gray-600 hover:text-primary-500 transition-colors px-2 py-2 rounded-lg hover:bg-gray-50"
            >
              <User className="w-5 h-5" />
              <span className="text-xs font-medium hidden lg:inline">Akun</span>
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex items-center justify-center p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <form onSubmit={handleSearch} className="md:hidden pb-3">
          <div className="flex rounded-xl border-2 border-primary-500 overflow-hidden">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari produk, toko, atau kategori..."
              className="flex-1 px-4 py-2.5 text-sm outline-none text-gray-700 placeholder-gray-400"
            />
            <button
              type="submit"
              className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2.5 flex items-center gap-1.5 transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Category nav - desktop */}
        <nav className="hidden md:flex items-center gap-1 pb-2 overflow-x-auto scrollbar-hide">
          {categories.slice(0, 8).map((cat) => (
            <Link
              key={cat.id}
              href={`/products?category=${cat.slug}`}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-gray-600 hover:text-primary-600 hover:bg-primary-50 whitespace-nowrap transition-colors font-medium"
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </Link>
          ))}
          <Link
            href="/products"
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm text-gray-500 hover:text-primary-600 hover:bg-primary-50 whitespace-nowrap transition-colors"
          >
            <span>Semua Kategori</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </Link>
        </nav>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="max-w-7xl mx-auto px-4 py-3 space-y-1">
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <User className="w-5 h-5 text-gray-400" />
              <span className="font-medium">Akun Saya</span>
            </Link>
            <Link
              href="/dashboard/orders"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Package className="w-5 h-5 text-gray-400" />
              <span className="font-medium">Pesanan Saya</span>
            </Link>
            <Link
              href="/dashboard/wishlist"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Heart className="w-5 h-5 text-gray-400" />
              <span className="font-medium">Wishlist</span>
            </Link>
            <Link
              href="/reseller"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-3 rounded-lg text-primary-600 hover:bg-primary-50 transition-colors"
            >
              <Bell className="w-5 h-5 text-primary-400" />
              <span className="font-medium">Reseller Center</span>
            </Link>
            <div className="border-t border-gray-100 pt-2 mt-2">
              <p className="px-3 py-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Kategori</p>
              <div className="grid grid-cols-2 gap-1">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/products?category=${cat.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors text-sm"
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
