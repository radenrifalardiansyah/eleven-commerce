import HeroBanner from '@/components/home/HeroBanner'
import CategoryNav from '@/components/home/CategoryNav'
import FlashSale from '@/components/home/FlashSale'
import LatestProducts from '@/components/home/LatestProducts'
import Link from 'next/link'
import { Shield, Truck, RotateCcw, Headphones } from 'lucide-react'

const trustBadges = [
  { icon: Shield, label: 'Belanja Aman', desc: 'Sistem escrow terpercaya' },
  { icon: Truck, label: 'Gratis Ongkir', desc: 'Min. pembelian Rp 150rb' },
  { icon: RotateCcw, label: 'Retur Mudah', desc: 'Jaminan uang kembali' },
  { icon: Headphones, label: 'CS 24/7', desc: 'Siap bantu kapan saja' },
]

export default function HomePage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Hero */}
      <HeroBanner />

      {/* Trust badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {trustBadges.map(({ icon: Icon, label, desc }) => (
          <div
            key={label}
            className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-gray-100 shadow-sm"
          >
            <div className="w-9 h-9 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon className="w-5 h-5 text-primary-500" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-gray-800 truncate">{label}</p>
              <p className="text-xs text-gray-400 truncate">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Categories */}
      <CategoryNav />

      {/* Flash Sale */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <FlashSale />
      </div>

      {/* Reseller banner */}
      <Link
        href="/reseller"
        className="block rounded-2xl overflow-hidden bg-gradient-to-r from-primary-600 to-orange-400 p-6 sm:p-8 hover:shadow-lg transition-shadow"
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-white">
            <p className="text-xs font-semibold uppercase tracking-widest opacity-80 mb-1">Program Eksklusif</p>
            <h2 className="text-xl sm:text-2xl font-black mb-1">Bergabung Jadi Reseller Eleven</h2>
            <p className="text-white/75 text-sm">Dapatkan harga grosir, komisi menarik & support dropship langsung</p>
          </div>
          <div className="flex-shrink-0">
            <span className="inline-block bg-white text-primary-600 font-bold px-6 py-2.5 rounded-xl text-sm hover:bg-gray-50 transition-colors shadow-md">
              🏆 Daftar Sekarang
            </span>
          </div>
        </div>
      </Link>

      {/* Latest Products */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <LatestProducts />
      </div>
    </main>
  )
}
