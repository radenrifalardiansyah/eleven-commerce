'use client'

import { useState } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import {
  ShoppingCart, Zap, Heart, Share2, Shield, Truck, RotateCcw,
  Store, Star, MessageCircle, ChevronRight, Minus, Plus, Package
} from 'lucide-react'
import { products, reviews, formatPrice, getDiscount } from '@/lib/data'
import ProductGallery from '@/components/product/ProductGallery'
import ProductVariants from '@/components/product/ProductVariants'
import ProductReviews from '@/components/product/ProductReviews'
import ProductCard from '@/components/ui/ProductCard'
import Rating from '@/components/ui/Rating'
import { cn } from '@/lib/utils'

interface Props { params: { id: string } }

export default function ProductDetailPage({ params }: Props) {
  const product = products.find((p) => p.id === params.id)
  if (!product) notFound()

  const [selected, setSelected] = useState<Record<string, string>>({})
  const [qty, setQty] = useState(1)
  const [wishlisted, setWishlisted] = useState(false)
  const [activeTab, setActiveTab] = useState<'desc' | 'reviews'>('desc')
  const [isReseller] = useState(false)

  const displayPrice =
    product.isFlashSale && product.flashSalePrice
      ? product.flashSalePrice
      : isReseller
      ? product.resellerPrice
      : product.price
  const originalPrice = product.originalPrice ?? null
  const discount = originalPrice ? getDiscount(originalPrice, displayPrice) : null

  const handleVariant = (variantId: string, optionId: string) => {
    setSelected((prev) => ({ ...prev, [variantId]: optionId }))
  }

  const allVariantsSelected = product.variants.every((v) => selected[v.id])
  const canBuy = product.variants.length === 0 || allVariantsSelected

  const related = products.filter((p) => p.categoryId === product.categoryId && p.id !== product.id).slice(0, 6)

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-5">
        <Link href="/" className="hover:text-primary-500 transition-colors">Beranda</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/products" className="hover:text-primary-500 transition-colors">Produk</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href={`/products?category=${product.category.toLowerCase()}`} className="hover:text-primary-500 transition-colors">
          {product.category}
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-gray-600 truncate max-w-[150px]">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-8 mb-10">
        {/* Gallery */}
        <ProductGallery images={product.images} name={product.name} />

        {/* Info */}
        <div className="space-y-5">
          {/* Badges */}
          <div className="flex items-center gap-2 flex-wrap">
            {product.badge && (
              <span className={cn(
                'text-xs font-bold px-2.5 py-1 rounded-lg',
                product.badge === 'new' && 'bg-blue-100 text-blue-700',
                product.badge === 'bestseller' && 'bg-orange-100 text-orange-700',
                product.badge === 'sale' && 'bg-red-100 text-red-700'
              )}>
                {product.badge === 'new' ? '🆕 Produk Baru' : product.badge === 'bestseller' ? '🔥 Terlaris' : '🏷️ Sale'}
              </span>
            )}
            {product.isFlashSale && (
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-red-100 text-red-700 flex items-center gap-1">
                <Zap className="w-3 h-3" /> Flash Sale
              </span>
            )}
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug">{product.name}</h1>

          {/* Rating & stats */}
          <div className="flex items-center gap-4 flex-wrap">
            <Rating value={product.rating} size="sm" showValue count={product.reviewCount} />
            <span className="text-sm text-gray-400">|</span>
            <span className="text-sm text-gray-500">{product.sold.toLocaleString()} terjual</span>
            <span className="text-sm text-gray-400">|</span>
            <span className={cn('text-sm', product.stock < 20 ? 'text-red-500 font-medium' : 'text-gray-500')}>
              Stok: {product.stock}
            </span>
          </div>

          {/* Price */}
          <div className="bg-orange-50 rounded-2xl p-4 space-y-1">
            <div className="flex items-end gap-3 flex-wrap">
              <span className="text-3xl font-black text-primary-600">{formatPrice(displayPrice)}</span>
              {discount && discount > 0 && (
                <span className="text-sm font-bold text-red-500 bg-red-100 px-2 py-0.5 rounded-lg">
                  -{discount}%
                </span>
              )}
            </div>
            {originalPrice && originalPrice !== displayPrice && (
              <p className="text-sm text-gray-400 line-through">{formatPrice(originalPrice)}</p>
            )}
            {isReseller && (
              <p className="text-xs text-emerald-600 font-semibold bg-emerald-50 inline-block px-2.5 py-1 rounded-lg mt-1">
                🏷️ Harga Reseller
              </p>
            )}
          </div>

          {/* Variants */}
          {product.variants.length > 0 && (
            <ProductVariants variants={product.variants} selected={selected} onChange={handleVariant} />
          )}

          {/* Quantity */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-gray-700">Jumlah</span>
            <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-12 text-center text-sm font-semibold text-gray-800">{qty}</span>
              <button
                onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <span className="text-sm text-gray-400">Stok: {product.stock}</span>
          </div>

          {/* CTA buttons */}
          <div className="flex gap-3">
            <button
              disabled={!canBuy}
              className={cn(
                'flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-colors',
                canBuy
                  ? 'bg-orange-100 text-primary-600 hover:bg-orange-200 border border-primary-300'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              )}
            >
              <ShoppingCart className="w-5 h-5" />
              Keranjang
            </button>
            <button
              disabled={!canBuy}
              className={cn(
                'flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-colors',
                canBuy
                  ? 'bg-primary-500 hover:bg-primary-600 text-white shadow-md shadow-primary-200'
                  : 'bg-gray-300 text-gray-400 cursor-not-allowed'
              )}
            >
              <Zap className="w-5 h-5" />
              Beli Sekarang
            </button>
          </div>
          {!canBuy && product.variants.length > 0 && (
            <p className="text-xs text-red-500">Pilih semua varian terlebih dahulu</p>
          )}

          <div className="flex items-center gap-3">
            <button
              onClick={() => setWishlisted((w) => !w)}
              className={cn('flex items-center gap-1.5 text-sm px-3 py-2 rounded-lg border transition-colors', wishlisted ? 'border-red-300 bg-red-50 text-red-600' : 'border-gray-200 text-gray-500 hover:border-gray-300')}
            >
              <Heart className={cn('w-4 h-4', wishlisted && 'fill-red-500')} />
              {wishlisted ? 'Tersimpan' : 'Wishlist'}
            </button>
            <button className="flex items-center gap-1.5 text-sm px-3 py-2 rounded-lg border border-gray-200 text-gray-500 hover:border-gray-300 transition-colors">
              <Share2 className="w-4 h-4" />
              Bagikan
            </button>
          </div>

          {/* Guarantees */}
          <div className="grid grid-cols-3 gap-3 pt-2 border-t border-gray-100">
            {[
              { icon: Shield, label: 'Belanja Aman', desc: 'Escrow terpercaya' },
              { icon: Truck, label: 'Pengiriman', desc: 'JNE, J&T, SiCepat' },
              { icon: RotateCcw, label: 'Retur', desc: 'Garansi 7 hari' },
            ].map(({ icon: Icon, label, desc }) => (
              <div key={label} className="flex flex-col items-center text-center gap-1 p-2">
                <Icon className="w-5 h-5 text-primary-500" />
                <span className="text-xs font-semibold text-gray-700">{label}</span>
                <span className="text-xs text-gray-400">{desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Seller card + shipping */}
      <div className="grid md:grid-cols-2 gap-4 mb-10">
        <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src={product.seller.avatar}
              alt={product.seller.name}
              width={48}
              height={48}
              className="rounded-full"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-sm text-gray-800">{product.seller.name}</span>
                {product.seller.isVerified && (
                  <span className="text-xs bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded font-medium">✓ Verified</span>
                )}
              </div>
              <div className="flex items-center gap-1 mt-0.5">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs text-gray-500">{product.seller.rating} · {product.seller.totalSales.toLocaleString()} penjualan</span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">{product.seller.location}</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <button className="flex items-center gap-1.5 text-xs border border-gray-200 text-gray-600 px-3 py-1.5 rounded-lg hover:border-gray-300 transition-colors">
              <MessageCircle className="w-3.5 h-3.5" />
              Chat
            </button>
            <Link href="/products" className="flex items-center gap-1.5 text-xs border border-gray-200 text-gray-600 px-3 py-1.5 rounded-lg hover:border-gray-300 transition-colors">
              <Store className="w-3.5 h-3.5" />
              Toko
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h3 className="font-semibold text-sm text-gray-800 mb-3 flex items-center gap-2">
            <Package className="w-4 h-4 text-primary-500" />
            Info Pengiriman
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Dikirim dari</span>
              <span className="font-medium text-gray-800">{product.location}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Berat produk</span>
              <span className="font-medium text-gray-800">{product.weight}g</span>
            </div>
            {[
              { courier: 'JNE REG', price: 'Rp 18.000', eta: '2-3 hari' },
              { courier: 'J&T Express', price: 'Rp 16.000', eta: '2-4 hari' },
              { courier: 'SiCepat REG', price: 'Rp 15.000', eta: '1-2 hari' },
            ].map((s) => (
              <div key={s.courier} className="flex items-center justify-between py-2 border-t border-gray-50">
                <span className="font-medium text-gray-700">{s.courier}</span>
                <div className="text-right">
                  <span className="text-primary-600 font-semibold">{s.price}</span>
                  <span className="text-gray-400 text-xs ml-2">{s.eta}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs: Description + Reviews */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-10">
        <div className="flex border-b border-gray-100">
          {[
            { key: 'desc', label: 'Deskripsi Produk' },
            { key: 'reviews', label: `Ulasan (${product.reviewCount.toLocaleString()})` },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as 'desc' | 'reviews')}
              className={cn(
                'flex-1 sm:flex-none px-6 py-4 text-sm font-semibold transition-colors border-b-2',
                activeTab === tab.key
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="p-6">
          {activeTab === 'desc' ? (
            <div>
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line mb-4">{product.description}</p>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-3 py-1 rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <ProductReviews reviews={reviews} rating={product.rating} reviewCount={product.reviewCount} />
          )}
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Produk Serupa</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
