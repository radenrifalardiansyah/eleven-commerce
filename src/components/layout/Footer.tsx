import Link from 'next/link'
import { MapPin, Phone, Mail, Instagram, Twitter, Facebook, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="block mb-3">
              <span className="text-2xl font-black text-white">
                Eleven<span className="text-primary-400">Commerce</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
              Marketplace terpercaya dengan jaringan reseller terluas di Indonesia. Belanja mudah, aman, dan hemat.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-400">
                <MapPin className="w-4 h-4 flex-shrink-0 text-primary-400" />
                <span>Jakarta Selatan, Indonesia</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Phone className="w-4 h-4 flex-shrink-0 text-primary-400" />
                <span>0800-1234-5678 (Gratis)</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Mail className="w-4 h-4 flex-shrink-0 text-primary-400" />
                <span>support@elevencommerce.id</span>
              </div>
            </div>
          </div>

          {/* Tentang Kami */}
          <div>
            <h3 className="text-white font-semibold mb-4">Tentang Kami</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Tentang Eleven-Commerce', href: '/about' },
                { label: 'Karir', href: '/careers' },
                { label: 'Berita & Blog', href: '/blog' },
                { label: 'Investor Relations', href: '/investors' },
                { label: 'Kebijakan Privasi', href: '/privacy' },
                { label: 'Syarat & Ketentuan', href: '/terms' },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-gray-400 hover:text-primary-400 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Bantuan */}
          <div>
            <h3 className="text-white font-semibold mb-4">Bantuan</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Pusat Bantuan', href: '/help' },
                { label: 'Cara Belanja', href: '/help/how-to-buy' },
                { label: 'Cara Pembayaran', href: '/help/payment' },
                { label: 'Cara Pengiriman', href: '/help/shipping' },
                { label: 'Retur & Refund', href: '/help/return' },
                { label: 'Lacak Pesanan', href: '/help/tracking' },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-gray-400 hover:text-primary-400 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Seller Center */}
          <div>
            <h3 className="text-white font-semibold mb-4">Seller Center</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Daftar Jadi Seller', href: '/seller/register' },
                { label: 'Panduan Seller', href: '/seller/guide' },
                { label: 'Program Reseller', href: '/reseller' },
                { label: 'Reseller Bronze', href: '/reseller#bronze' },
                { label: 'Reseller Silver', href: '/reseller#silver' },
                { label: 'Reseller Gold', href: '/reseller#gold' },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-gray-400 hover:text-primary-400 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sosial Media & App */}
          <div>
            <h3 className="text-white font-semibold mb-4">Ikuti Kami</h3>
            <div className="flex gap-3 mb-6">
              {[
                { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
                { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
                { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
                { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-primary-500 hover:text-white transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            <h3 className="text-white font-semibold mb-3">Download App</h3>
            <div className="space-y-2">
              <a href="#" className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 rounded-lg px-3 py-2.5 transition-colors">
                <div className="text-white">
                  <div className="text-xs text-gray-400">Download di</div>
                  <div className="text-sm font-semibold">App Store</div>
                </div>
              </a>
              <a href="#" className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 rounded-lg px-3 py-2.5 transition-colors">
                <div className="text-white">
                  <div className="text-xs text-gray-400">Dapatkan di</div>
                  <div className="text-sm font-semibold">Google Play</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Payment & courier */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Payment methods */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Metode Pembayaran</p>
              <div className="flex flex-wrap gap-2">
                {['Visa', 'Mastercard', 'GoPay', 'OVO', 'Dana', 'BCA', 'BNI', 'Mandiri', 'BRI'].map((method) => (
                  <span
                    key={method}
                    className="px-3 py-1.5 bg-gray-800 rounded text-xs font-medium text-gray-300 border border-gray-700"
                  >
                    {method}
                  </span>
                ))}
              </div>
            </div>

            {/* Courier partners */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Mitra Pengiriman</p>
              <div className="flex flex-wrap gap-2">
                {['JNE', 'J&T Express', 'SiCepat', 'AnterAja', 'Pos Indonesia', 'Ninja Xpress', 'GoSend'].map((courier) => (
                  <span
                    key={courier}
                    className="px-3 py-1.5 bg-gray-800 rounded text-xs font-medium text-gray-300 border border-gray-700"
                  >
                    {courier}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-xs text-gray-500">
              &copy; {new Date().getFullYear()} Eleven-Commerce. Semua hak dilindungi undang-undang.
            </p>
            <p className="text-xs text-gray-500">
              PT. Eleven Commerce Indonesia &bull; Terdaftar & Diawasi OJK
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
