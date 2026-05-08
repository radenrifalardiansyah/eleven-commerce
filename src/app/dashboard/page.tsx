'use client'

import Link from 'next/link'
import Image from 'next/image'
import {
  User, Package, Heart, MapPin, Shield, Star, ChevronRight,
  TrendingUp, ShoppingBag, Award, MessageCircle
} from 'lucide-react'
import { mockUser, mockOrders, formatPrice } from '@/lib/data'
import { cn } from '@/lib/utils'

const orderStatusLabel: Record<string, { label: string; color: string }> = {
  pending: { label: 'Menunggu Pembayaran', color: 'text-yellow-600 bg-yellow-50' },
  processing: { label: 'Diproses', color: 'text-blue-600 bg-blue-50' },
  shipped: { label: 'Dikirim', color: 'text-indigo-600 bg-indigo-50' },
  delivered: { label: 'Selesai', color: 'text-emerald-600 bg-emerald-50' },
  cancelled: { label: 'Dibatalkan', color: 'text-red-600 bg-red-50' },
  returned: { label: 'Diretur', color: 'text-orange-600 bg-orange-50' },
}

const tierColor: Record<string, string> = {
  bronze: 'from-amber-700 to-amber-500',
  silver: 'from-gray-500 to-gray-400',
  gold: 'from-yellow-500 to-orange-400',
}

const menuItems = [
  { icon: Package, label: 'Pesanan Saya', desc: 'Lacak & kelola pesanan', href: '/dashboard/orders', count: mockOrders.filter(o => o.status !== 'delivered' && o.status !== 'cancelled').length },
  { icon: Heart, label: 'Wishlist', desc: 'Produk yang kamu simpan', href: '/dashboard/wishlist', count: 4 },
  { icon: MapPin, label: 'Buku Alamat', desc: 'Kelola alamat pengiriman', href: '/dashboard/addresses', count: 2 },
  { icon: User, label: 'Profil Saya', desc: 'Edit data & foto profil', href: '/dashboard/profile', count: null },
  { icon: Shield, label: 'Pusat Resolusi', desc: 'Komplain & retur barang', href: '/resolution', count: null },
  { icon: MessageCircle, label: 'Chat', desc: 'Pesan dari penjual', href: '/chat', count: 3 },
]

export default function DashboardPage() {
  const user = mockUser

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-5">
      {/* Profile card */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Image
              src={user.avatar}
              alt={user.name}
              width={72}
              height={72}
              className="rounded-2xl"
            />
            {user.isReseller && (
              <div className="absolute -bottom-2 -right-2">
                <div className={cn('w-8 h-8 rounded-full bg-gradient-to-br flex items-center justify-center text-white text-xs font-black shadow-md', tierColor[user.resellerTier ?? 'bronze'])}>
                  {user.resellerTier?.charAt(0).toUpperCase()}
                </div>
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-lg font-bold text-gray-900">{user.name}</h2>
              {user.isReseller && (
                <span className={cn('text-xs font-bold px-2.5 py-0.5 rounded-full text-white bg-gradient-to-r', tierColor[user.resellerTier ?? 'bronze'])}>
                  Reseller {user.resellerTier?.charAt(0).toUpperCase()}{user.resellerTier?.slice(1)}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500">{user.email}</p>
            <p className="text-sm text-gray-400">{user.phone}</p>
            <p className="text-xs text-gray-400 mt-1">Bergabung sejak {new Date(user.joinDate).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}</p>
          </div>
          <Link href="/dashboard/profile" className="flex-shrink-0">
            <span className="text-sm text-primary-500 hover:text-primary-600 font-medium">Edit</span>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: ShoppingBag, label: 'Total Pesanan', value: user.totalOrders, color: 'text-blue-500 bg-blue-50' },
          { icon: TrendingUp, label: 'Total Belanja', value: formatPrice(user.totalSpent), color: 'text-emerald-500 bg-emerald-50' },
          { icon: Award, label: 'Level Reseller', value: user.resellerTier ? user.resellerTier.charAt(0).toUpperCase() + user.resellerTier.slice(1) : 'Regular', color: 'text-orange-500 bg-orange-50' },
        ].map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-100 p-4 text-center">
            <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2', color)}>
              <Icon className="w-5 h-5" />
            </div>
            <p className="text-base font-black text-gray-900 truncate">{value}</p>
            <p className="text-xs text-gray-400">{label}</p>
          </div>
        ))}
      </div>

      {/* Recent orders */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h3 className="font-bold text-gray-900">Pesanan Terbaru</h3>
          <Link href="/dashboard/orders" className="text-sm text-primary-500 hover:text-primary-600 font-medium">
            Lihat Semua
          </Link>
        </div>
        <div className="divide-y divide-gray-50">
          {mockOrders.map((order) => {
            const status = orderStatusLabel[order.status]
            return (
              <Link key={order.id} href="/dashboard/orders" className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors group">
                <div className="flex items-center gap-3">
                  <Image
                    src={order.items[0].product.images[0]}
                    alt={order.items[0].product.name}
                    width={44}
                    height={44}
                    className="rounded-xl object-cover"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-800">{order.orderNumber}</p>
                    <p className="text-xs text-gray-400">{order.items.length} produk · {formatPrice(order.total)}</p>
                    <span className={cn('text-xs font-semibold px-2 py-0.5 rounded-full mt-1 inline-block', status.color)}>
                      {status.label}
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors" />
              </Link>
            )
          })}
        </div>
      </div>

      {/* Menu grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {menuItems.map(({ icon: Icon, label, desc, href, count }) => (
          <Link
            key={href}
            href={href}
            className="bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-sm hover:border-primary-200 transition-all group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center group-hover:bg-primary-100 transition-colors">
                <Icon className="w-5 h-5 text-primary-500" />
              </div>
              {count !== null && count > 0 && (
                <span className="bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {count}
                </span>
              )}
            </div>
            <p className="text-sm font-semibold text-gray-800 group-hover:text-primary-600 transition-colors">{label}</p>
            <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
          </Link>
        ))}
      </div>

      {/* Reseller promo banner */}
      {!user.isReseller && (
        <Link href="/reseller" className="block bg-gradient-to-r from-primary-500 to-orange-400 rounded-2xl p-5 text-white hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold mb-1">Jadilah Reseller Eleven!</p>
              <p className="text-sm text-white/80">Dapatkan harga grosir & komisi menarik</p>
            </div>
            <ChevronRight className="w-5 h-5" />
          </div>
        </Link>
      )}
    </main>
  )
}
