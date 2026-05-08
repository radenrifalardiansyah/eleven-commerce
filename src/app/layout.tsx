import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Eleven-Commerce | Marketplace Terpercaya',
  description: 'Eleven-Commerce adalah marketplace terpercaya dengan ribuan produk pilihan. Belanja mudah, aman, dan hemat dengan jaringan reseller terluas di Indonesia.',
  keywords: 'marketplace, belanja online, reseller, produk murah, eleven commerce',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Header />
        <div className="flex-1">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}
