import Link from 'next/link'
import { Check, ChevronRight, Star, Users, TrendingUp, Package, Truck, Tag, Shield } from 'lucide-react'
import { formatPrice } from '@/lib/data'

const tiers = [
  {
    id: 'bronze',
    name: 'Bronze',
    emoji: '🥉',
    gradient: 'from-amber-700 to-amber-500',
    bg: 'bg-amber-50 border-amber-200',
    minOrder: 0,
    discount: 10,
    commission: 5,
    perks: ['Akses harga reseller', 'Support via WhatsApp', 'Katalog produk eksklusif', 'Dropship aktif'],
  },
  {
    id: 'silver',
    name: 'Silver',
    emoji: '🥈',
    gradient: 'from-gray-500 to-gray-400',
    bg: 'bg-gray-50 border-gray-300',
    minOrder: 5000000,
    discount: 18,
    commission: 10,
    perks: ['Semua benefit Bronze', 'Diskon lebih besar', 'Priority support', 'Custom packing gratis', 'Flash sale early access'],
  },
  {
    id: 'gold',
    name: 'Gold',
    emoji: '🥇',
    gradient: 'from-yellow-500 to-orange-400',
    bg: 'bg-yellow-50 border-yellow-300',
    minOrder: 20000000,
    discount: 25,
    commission: 15,
    perks: ['Semua benefit Silver', 'Harga termurah garansi', 'Account manager pribadi', 'Akses stok prioritas', 'Pelatihan bisnis eksklusif', 'Badge verified reseller'],
    popular: true,
  },
]

const faqs = [
  { q: 'Bagaimana cara mendaftar sebagai reseller?', a: 'Klik tombol "Daftar Sekarang", isi formulir pendaftaran, dan akun reseller kamu akan aktif dalam 1x24 jam.' },
  { q: 'Apakah ada biaya pendaftaran?', a: 'Pendaftaran reseller Bronze sepenuhnya GRATIS. Untuk upgrade ke Silver dan Gold, diperlukan minimum pembelian yang ditentukan.' },
  { q: 'Bagaimana sistem dropship bekerja?', a: 'Kamu menjual produk ke pelangganmu, kami yang mengirim langsung ke pelanggan dengan nama tokomu sebagai pengirim. Tanpa modal stok.' },
  { q: 'Kapan komisi penjualan dibayarkan?', a: 'Komisi dihitung otomatis setiap transaksi selesai dan dapat dicairkan ke rekening bank kamu setiap 2 minggu sekali.' },
]

const stats = [
  { icon: Users, value: '50.000+', label: 'Reseller Aktif' },
  { icon: TrendingUp, value: 'Rp 5M+', label: 'Rata-rata Penghasilan/Bulan' },
  { icon: Package, value: '100.000+', label: 'Produk Tersedia' },
  { icon: Truck, value: '99.2%', label: 'Ketepatan Pengiriman' },
]

export default function ResellerPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      {/* Hero */}
      <section className="text-center">
        <div className="inline-block bg-primary-100 text-primary-700 text-sm font-bold px-4 py-1.5 rounded-full mb-4">
          🚀 Program Reseller Eleven-Commerce
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4 leading-tight">
          Mulai Bisnis Online<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-orange-500">
            Tanpa Modal Besar
          </span>
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-8 leading-relaxed">
          Bergabunglah dengan 50.000+ reseller sukses di Eleven-Commerce. Dapatkan harga grosir terbaik, sistem dropship otomatis, dan dukungan penuh dari tim kami.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/dashboard" className="btn-primary px-8 py-4 rounded-2xl text-base shadow-lg shadow-primary-200 flex items-center gap-2">
            Daftar Gratis Sekarang
            <ChevronRight className="w-5 h-5" />
          </Link>
          <a href="#tiers" className="btn-outline px-8 py-4 rounded-2xl text-base">
            Lihat Paket Reseller
          </a>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map(({ icon: Icon, value, label }) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-100 p-5 text-center shadow-sm">
            <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Icon className="w-6 h-6 text-primary-500" />
            </div>
            <p className="text-2xl font-black text-gray-900">{value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{label}</p>
          </div>
        ))}
      </section>

      {/* Benefits */}
      <section className="bg-gradient-to-br from-primary-600 to-orange-500 rounded-3xl p-8 text-white">
        <h2 className="text-2xl font-black mb-6 text-center">Kenapa Jadi Reseller Eleven?</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { icon: Tag, title: 'Harga Grosir Otomatis', desc: 'Harga khusus reseller langsung tampil di katalog saat login. Hemat hingga 25% dari harga normal.' },
            { icon: Truck, title: 'Dropship Tanpa Ribet', desc: 'Jual dari mana saja, kami kirim ke pelangganmu. Nama tokomu yang tampil sebagai pengirim.' },
            { icon: TrendingUp, title: 'Komisi Berlipat', desc: 'Dapatkan komisi 5-15% dari setiap transaksi. Makin tinggi tier, makin besar komisimu.' },
            { icon: Shield, title: 'Garansi Produk Asli', desc: '100% produk original bersertifikat. Reputasi tokomu terjaga, pelanggan puas.' },
            { icon: Package, title: 'Stok Selalu Ada', desc: 'Akses 100.000+ produk dari ratusan supplier terpercaya. Tidak perlu khawatir kehabisan stok.' },
            { icon: Star, title: 'Training & Support', desc: 'Materi pelatihan bisnis online gratis + support tim dedikasi 24/7 untuk reseller gold.' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white/10 backdrop-blur-sm rounded-2xl p-5">
              <Icon className="w-7 h-7 mb-3 text-white" />
              <p className="font-bold mb-1">{title}</p>
              <p className="text-sm text-white/75 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tiers */}
      <section id="tiers">
        <h2 className="text-2xl font-black text-gray-900 text-center mb-2">Pilih Paket Reseller</h2>
        <p className="text-gray-500 text-center mb-8">Mulai gratis dengan Bronze, upgrade sesuai pertumbuhan bisnismu</p>
        <div className="grid sm:grid-cols-3 gap-5">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`relative rounded-3xl border-2 p-6 ${tier.bg} ${tier.popular ? 'shadow-xl scale-105' : ''}`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-500 to-orange-400 text-white text-xs font-black px-4 py-1.5 rounded-full shadow-md whitespace-nowrap">
                  ⭐ Paling Populer
                </div>
              )}
              <div className="text-center mb-5">
                <span className="text-4xl">{tier.emoji}</span>
                <h3 className={`text-xl font-black mt-2 bg-gradient-to-r bg-clip-text text-transparent ${tier.gradient}`}>
                  Reseller {tier.name}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  {tier.minOrder === 0 ? 'Mulai dari Rp 0' : `Min. pembelian ${formatPrice(tier.minOrder)}`}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-white rounded-xl p-3 text-center shadow-sm">
                  <p className="text-2xl font-black text-primary-600">{tier.discount}%</p>
                  <p className="text-xs text-gray-500">Diskon Produk</p>
                </div>
                <div className="bg-white rounded-xl p-3 text-center shadow-sm">
                  <p className="text-2xl font-black text-emerald-600">{tier.commission}%</p>
                  <p className="text-xs text-gray-500">Komisi Penjualan</p>
                </div>
              </div>

              <ul className="space-y-2 mb-6">
                {tier.perks.map((perk) => (
                  <li key={perk} className="flex items-center gap-2 text-sm text-gray-700">
                    <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    {perk}
                  </li>
                ))}
              </ul>

              <Link
                href="/dashboard"
                className={`block w-full py-3 rounded-xl font-bold text-center text-sm transition-colors ${
                  tier.popular
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-400 text-white hover:shadow-md'
                    : 'bg-white text-gray-800 border border-gray-200 hover:border-gray-300'
                }`}
              >
                {tier.minOrder === 0 ? 'Daftar Gratis' : `Upgrade ke ${tier.name}`}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section>
        <h2 className="text-2xl font-black text-gray-900 text-center mb-8">Cara Kerja Dropship</h2>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {[
            { step: '1', title: 'Pilih Produk', desc: 'Pilih dari 100.000+ produk di katalog reseller dengan harga grosir' },
            { step: '2', title: 'Jual ke Pelanggan', desc: 'Promosikan di medsos, marketplace, atau toko onlinemu sendiri' },
            { step: '3', title: 'Kami Kirim', desc: 'Order masuk, kami yang packing & kirim ke pelangganmu' },
            { step: '4', title: 'Terima Komisi', desc: 'Keuntunganmu ditransfer langsung ke rekeningmu' },
          ].map(({ step, title, desc }, i) => (
            <div key={step} className="flex sm:flex-col items-center sm:items-center gap-4 sm:gap-2 flex-1">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-500 text-white rounded-2xl flex items-center justify-center text-lg font-black shadow-md shadow-primary-200">
                {step}
              </div>
              {i < 3 && <ChevronRight className="hidden sm:block w-5 h-5 text-gray-300 rotate-0" />}
              <div className="sm:text-center">
                <p className="font-bold text-gray-800 text-sm">{title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section>
        <h2 className="text-2xl font-black text-gray-900 text-center mb-8">Pertanyaan Umum</h2>
        <div className="space-y-3 max-w-2xl mx-auto">
          {faqs.map(({ q, a }) => (
            <div key={q} className="bg-white rounded-2xl border border-gray-100 p-5">
              <p className="font-semibold text-gray-800 mb-2">{q}</p>
              <p className="text-sm text-gray-500 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-primary-600 to-orange-500 rounded-3xl p-10 text-center text-white">
        <h2 className="text-2xl sm:text-3xl font-black mb-3">Siap Mulai Bisnis Kamu?</h2>
        <p className="text-white/75 mb-8 max-w-md mx-auto">
          Ribuan reseller sudah membuktikan. Daftar sekarang dan dapatkan bonus voucher Rp 100.000 untuk pembelian pertama!
        </p>
        <Link href="/dashboard" className="inline-block bg-white text-primary-600 font-black px-10 py-4 rounded-2xl text-base hover:bg-gray-50 transition-colors shadow-lg">
          🚀 Daftar Gratis Sekarang
        </Link>
      </section>
    </main>
  )
}
