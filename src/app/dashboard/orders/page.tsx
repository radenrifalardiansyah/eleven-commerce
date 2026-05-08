'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Package, Truck, ChevronLeft, ExternalLink, RotateCcw, MessageCircle } from 'lucide-react'
import { mockOrders, formatPrice } from '@/lib/data'
import { cn } from '@/lib/utils'
import { Order } from '@/types'

const statusConfig: Record<Order['status'], { label: string; color: string; icon: React.ComponentType<{ className?: string }> }> = {
  pending: { label: 'Menunggu Pembayaran', color: 'text-yellow-700 bg-yellow-50 border-yellow-200', icon: Package },
  processing: { label: 'Sedang Diproses', color: 'text-blue-700 bg-blue-50 border-blue-200', icon: Package },
  shipped: { label: 'Dalam Pengiriman', color: 'text-indigo-700 bg-indigo-50 border-indigo-200', icon: Truck },
  delivered: { label: 'Pesanan Selesai', color: 'text-emerald-700 bg-emerald-50 border-emerald-200', icon: Package },
  cancelled: { label: 'Dibatalkan', color: 'text-red-700 bg-red-50 border-red-200', icon: Package },
  returned: { label: 'Diretur', color: 'text-orange-700 bg-orange-50 border-orange-200', icon: RotateCcw },
}

const tabs: { key: string; label: string }[] = [
  { key: 'all', label: 'Semua' },
  { key: 'pending', label: 'Belum Bayar' },
  { key: 'processing', label: 'Diproses' },
  { key: 'shipped', label: 'Dikirim' },
  { key: 'delivered', label: 'Selesai' },
]

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState('all')

  const filtered = mockOrders.filter((o) => activeTab === 'all' || o.status === activeTab)

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link href="/dashboard" className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <h1 className="text-xl font-bold text-gray-900">Pesanan Saya</h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto pb-1 mb-5 scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              'flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-colors',
              activeTab === tab.key
                ? 'bg-primary-500 text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Orders */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 font-medium">Belum ada pesanan di kategori ini</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((order) => {
            const status = statusConfig[order.status]
            const StatusIcon = status.icon
            return (
              <div key={order.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                {/* Order header */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-gray-50">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-700">{order.orderNumber}</span>
                    <span className="text-xs text-gray-400">·</span>
                    <span className="text-xs text-gray-400">
                      {new Date(order.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                  <span className={cn('text-xs font-semibold px-2.5 py-1 rounded-full border', status.color)}>
                    {status.label}
                  </span>
                </div>

                {/* Items */}
                <div className="px-5 py-4 space-y-3">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        width={56}
                        height={56}
                        className="rounded-xl object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 line-clamp-1">{item.product.name}</p>
                        {Object.keys(item.selectedVariants).length > 0 && (
                          <p className="text-xs text-gray-400">
                            {Object.values(item.selectedVariants).join(', ')}
                          </p>
                        )}
                        <p className="text-xs text-gray-500">x{item.quantity} · {formatPrice(item.price)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Shipping & tracking */}
                {order.trackingNumber && (
                  <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-gray-400" />
                      <span className="text-xs text-gray-600">{order.courier} · {order.trackingNumber}</span>
                    </div>
                    <button className="text-xs text-primary-500 font-medium flex items-center gap-1 hover:text-primary-600">
                      Lacak
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                )}

                {/* Footer */}
                <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-400">Total Pembayaran</p>
                    <p className="text-base font-bold text-gray-900">{formatPrice(order.total)}</p>
                  </div>
                  <div className="flex gap-2">
                    {order.status === 'shipped' && (
                      <button className="text-xs border border-emerald-300 text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg font-medium hover:bg-emerald-100 transition-colors">
                        ✓ Terima Barang
                      </button>
                    )}
                    {order.status === 'delivered' && (
                      <button className="text-xs border border-primary-300 text-primary-700 bg-primary-50 px-3 py-1.5 rounded-lg font-medium hover:bg-primary-100 transition-colors">
                        ★ Beri Ulasan
                      </button>
                    )}
                    {order.status === 'pending' && (
                      <button className="text-xs bg-primary-500 text-white px-3 py-1.5 rounded-lg font-medium hover:bg-primary-600 transition-colors">
                        Bayar Sekarang
                      </button>
                    )}
                    <button className="text-xs border border-gray-200 text-gray-600 px-3 py-1.5 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center gap-1">
                      <MessageCircle className="w-3.5 h-3.5" />
                      Chat
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </main>
  )
}
