import { notFound } from 'next/navigation'
import { products } from '@/lib/data'
import ProductDetailClient from './ProductDetailClient'

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }))
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id)
  if (!product) notFound()
  return <ProductDetailClient product={product} />
}
