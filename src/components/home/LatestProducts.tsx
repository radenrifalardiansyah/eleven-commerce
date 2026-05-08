import Link from 'next/link'
import { products } from '@/lib/data'
import ProductCard from '@/components/ui/ProductCard'

export default function LatestProducts() {
  const latest = products.filter((p) => !p.isFlashSale).slice(0, 10)

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">Produk Terbaru</h2>
        <Link href="/products" className="text-sm font-medium text-primary-500 hover:text-primary-600 transition-colors">
          Lihat Semua
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {latest.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
