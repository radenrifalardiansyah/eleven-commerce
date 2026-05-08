'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Minus, Plus, Trash2, ShoppingBag, Tag, ChevronRight, Shield, Truck } from 'lucide-react'
import { products, formatPrice } from '@/lib/data'
import { CartItem } from '@/types'
import { cn } from '@/lib/utils'

const initialCart: CartItem[] = [
  { id: 'ci1', productId: '1', product: products[0], quantity: 1, selectedVariants: { v1: 'black' }, price: products[0].price },
  { id: 'ci2', productId: '3', product: products[2], quantity: 2, selectedVariants: {}, price: products[2].price },
  { id: 'ci3', productId: '8', product: products[7], quantity: 1, selectedVariants: { v8: 'biji' }, price: products[7].price },
]

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>(initialCart)
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set(initialCart.map((i) => i.id)))
  const [voucher, setVoucher] = useState('')
  const [voucherApplied, setVoucherApplied] = useState(false)

  const updateQty = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, Math.min(item.product.stock, item.quantity + delta)) } : item
      )
    )
  }

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
    setCheckedIds((prev) => { const s = new Set(prev); s.delete(id); return s })
  }

  const toggleCheck = (id: string) => {
    setCheckedIds((prev) => {
      const s = new Set(prev)
      s.has(id) ? s.delete(id) : s.add(id)
      return s
    })
  }

  const toggleAll = () => {
    if (checkedIds.size === items.length) setCheckedIds(new Set())
    else setCheckedIds(new Set(items.map((i) => i.id)))
  }

  const checkedItems = items.filter((i) => checkedIds.has(i.id))
  const subtotal = checkedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = checkedItems.length > 0 ? 18000 : 0
  const discount = voucherApplied ? 25000 : 0
  const total = subtotal + shipping - discount

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center gap-2 mb-6">
        <ShoppingBag className="w-6 h-6 text-primary-500" />
        <h1 className="text-xl font-bold text-gray-900">Keranjang Belanja</h1>
        <span className="text-sm text-gray-400">({items.length} item)</span>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-6xl mb-4">🛒</p>
          <p className="text-lg font-semibold text-gray-700 mb-2">Keranjang kamu kosong</p>
          <p className="text-sm text-gray-400 mb-6">Yuk, mulai belanja produk pilihanmu!</p>
          <Link href="/products" className="btn-primary px-8 py-3 rounded-xl">
            Mulai Belanja
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-3">
            {/* Select all */}
            <div className="bg-white rounded-2xl border border-gray-100 px-4 py-3 flex items-center justify-between">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checkedIds.size === items.length && items.length > 0}
                  onChange={toggleAll}
                  className="w-4 h-4 rounded accent-primary-500"
                />
                <span className="text-sm font-semibold text-gray-700">Pilih Semua ({items.length})</span>
              </label>
              <button
                onClick={() => { setItems(items.filter((i) => !checkedIds.has(i.id))); setCheckedIds(new Set()) }}
                className="text-xs text-red-500 hover:text-red-600 font-medium"
              >
                Hapus Dipilih
              </button>
            </div>

            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl border border-gray-100 p-4">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={checkedIds.has(item.id)}
                    onChange={() => toggleCheck(item.id)}
                    className="w-4 h-4 rounded accent-primary-500 mt-1 flex-shrink-0"
                  />
                  <Link href={`/products/${item.productId}`} className="flex-shrink-0">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      width={80}
                      height={80}
                      className="rounded-xl object-cover"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link href={`/products/${item.productId}`}>
                      <p className="text-sm font-medium text-gray-800 line-clamp-2 hover:text-primary-600 transition-colors mb-1">
                        {item.product.name}
                      </p>
                    </Link>
                    {Object.keys(item.selectedVariants).length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {Object.entries(item.selectedVariants).map(([k, v]) => {
                          const variant = item.product.variants.find((vr) => vr.id === k)
                          const option = variant?.options.find((o) => o.id === v)
                          return option ? (
                            <span key={k} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                              {option.value}
                            </span>
                          ) : null
                        })}
                      </div>
                    )}
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="text-base font-bold text-primary-600">{formatPrice(item.price)}</span>
                      <div className="flex items-center gap-2">
                        <button onClick={() => removeItem(item.id)} className="p-1.5 text-gray-400 hover:text-red-500 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                          <button onClick={() => updateQty(item.id, -1)} className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition-colors">
                            <Minus className="w-3.5 h-3.5 text-gray-600" />
                          </button>
                          <span className="w-10 text-center text-sm font-semibold">{item.quantity}</span>
                          <button onClick={() => updateQty(item.id, 1)} className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition-colors">
                            <Plus className="w-3.5 h-3.5 text-gray-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Subtotal: {formatPrice(item.price * item.quantity)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="space-y-4">
            {/* Voucher */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4">
              <h3 className="font-semibold text-sm text-gray-800 mb-3 flex items-center gap-2">
                <Tag className="w-4 h-4 text-primary-500" />
                Kode Voucher
              </h3>
              <div className="flex gap-2">
                <input
                  value={voucher}
                  onChange={(e) => setVoucher(e.target.value.toUpperCase())}
                  placeholder="Masukkan kode voucher"
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary-400"
                />
                <button
                  onClick={() => { if (voucher === 'ELEVEN25') setVoucherApplied(true) }}
                  className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  Pakai
                </button>
              </div>
              {voucherApplied && (
                <p className="text-xs text-emerald-600 mt-2 font-medium">✓ Voucher berhasil! Hemat {formatPrice(25000)}</p>
              )}
              {!voucherApplied && <p className="text-xs text-gray-400 mt-2">Coba: ELEVEN25</p>}
            </div>

            {/* Order summary */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h3 className="font-bold text-gray-900 mb-4">Ringkasan Belanja</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({checkedItems.length} produk)</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Ongkos Kirim</span>
                  <span className="font-medium">{checkedItems.length > 0 ? formatPrice(shipping) : '-'}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Diskon Voucher</span>
                    <span className="font-medium">-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="border-t border-gray-100 pt-3 flex justify-between">
                  <span className="font-bold text-gray-900">Total Pembayaran</span>
                  <span className="font-black text-xl text-primary-600">{formatPrice(Math.max(0, total))}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className={cn(
                  'w-full mt-4 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-colors',
                  checkedItems.length > 0
                    ? 'bg-primary-500 hover:bg-primary-600 text-white shadow-md shadow-primary-200'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none'
                )}
              >
                Lanjut ke Checkout
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Guarantees */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4 space-y-3">
              {[
                { icon: Shield, text: 'Belanja dijamin aman dengan sistem escrow' },
                { icon: Truck, text: 'Lacak pesanan real-time' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-xs text-gray-500">
                  <Icon className="w-4 h-4 text-primary-400 flex-shrink-0" />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
