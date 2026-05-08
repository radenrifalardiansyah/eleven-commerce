'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Package, CreditCard, ChevronDown, ChevronRight, Check, ShieldCheck } from 'lucide-react'
import { products, mockAddresses, formatPrice } from '@/lib/data'
import { cn } from '@/lib/utils'

const checkoutItems = [
  { product: products[0], qty: 1, price: products[0].price, variant: 'Hitam' },
  { product: products[2], qty: 2, price: products[2].price, variant: null },
]

const couriers = [
  { id: 'jne', name: 'JNE REG', price: 18000, eta: '2-3 hari' },
  { id: 'jt', name: 'J&T Express', price: 16000, eta: '2-4 hari' },
  { id: 'sicepat', name: 'SiCepat REG', price: 15000, eta: '1-2 hari' },
]

const paymentMethods = [
  { id: 'gopay', name: 'GoPay', icon: '💚', desc: 'Saldo: Rp 250.000' },
  { id: 'ovo', name: 'OVO', icon: '💜', desc: 'Saldo: Rp 120.000' },
  { id: 'bca', name: 'Transfer BCA', icon: '🏦', desc: 'Virtual Account otomatis' },
  { id: 'dana', name: 'DANA', icon: '🔵', desc: 'Saldo: Rp 85.000' },
  { id: 'cc', name: 'Kartu Kredit / Debit', icon: '💳', desc: 'Visa, Mastercard' },
]

type Step = 'address' | 'shipping' | 'payment' | 'review'

export default function CheckoutPage() {
  const [step, setStep] = useState<Step>('address')
  const [selectedAddress, setSelectedAddress] = useState(mockAddresses[0].id)
  const [selectedCourier, setSelectedCourier] = useState(couriers[0].id)
  const [selectedPayment, setSelectedPayment] = useState(paymentMethods[0].id)
  const [note, setNote] = useState('')
  const [ordered, setOrdered] = useState(false)

  const courier = couriers.find((c) => c.id === selectedCourier)!
  const subtotal = checkoutItems.reduce((s, i) => s + i.price * i.qty, 0)
  const total = subtotal + courier.price

  const steps: { key: Step; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { key: 'address', label: 'Alamat', icon: MapPin },
    { key: 'shipping', label: 'Pengiriman', icon: Package },
    { key: 'payment', label: 'Pembayaran', icon: CreditCard },
    { key: 'review', label: 'Konfirmasi', icon: ShieldCheck },
  ]

  const stepOrder: Step[] = ['address', 'shipping', 'payment', 'review']
  const currentIdx = stepOrder.indexOf(step)

  const next = () => {
    const nextStep = stepOrder[currentIdx + 1]
    if (nextStep) setStep(nextStep)
  }

  if (ordered) {
    return (
      <main className="max-w-lg mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-emerald-500" />
        </div>
        <h2 className="text-2xl font-black text-gray-900 mb-2">Pesanan Berhasil!</h2>
        <p className="text-gray-500 mb-2">Nomor pesanan kamu: <span className="font-bold text-primary-600">EC-2024-002345</span></p>
        <p className="text-sm text-gray-400 mb-8">Dana akan diteruskan ke penjual setelah barang dikonfirmasi diterima.</p>
        <div className="space-y-3">
          <Link href="/dashboard/orders" className="block w-full btn-primary py-3.5 rounded-xl text-center font-bold">
            Lacak Pesanan
          </Link>
          <Link href="/" className="block w-full btn-outline py-3.5 rounded-xl text-center font-bold">
            Lanjut Belanja
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-xl font-bold text-gray-900 mb-6">Checkout</h1>

      {/* Step indicator */}
      <div className="flex items-center mb-8">
        {steps.map((s, i) => {
          const done = stepOrder.indexOf(s.key) < currentIdx
          const active = s.key === step
          const Icon = s.icon
          return (
            <div key={s.key} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div className={cn(
                  'w-9 h-9 rounded-full flex items-center justify-center transition-colors',
                  done ? 'bg-emerald-500 text-white' : active ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-400'
                )}>
                  {done ? <Check className="w-5 h-5" /> : <Icon className="w-4 h-4" />}
                </div>
                <span className={cn('text-xs mt-1 font-medium hidden sm:block', active ? 'text-primary-600' : done ? 'text-emerald-600' : 'text-gray-400')}>
                  {s.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={cn('flex-1 h-0.5 mx-2 rounded', done ? 'bg-emerald-400' : 'bg-gray-200')} />
              )}
            </div>
          )
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {/* Step: Address */}
          {step === 'address' && (
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary-500" />
                Pilih Alamat Pengiriman
              </h2>
              <div className="space-y-3">
                {mockAddresses.map((addr) => (
                  <label
                    key={addr.id}
                    className={cn(
                      'flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors',
                      selectedAddress === addr.id ? 'border-primary-400 bg-primary-50' : 'border-gray-100 hover:border-gray-200'
                    )}
                  >
                    <input
                      type="radio"
                      value={addr.id}
                      checked={selectedAddress === addr.id}
                      onChange={() => setSelectedAddress(addr.id)}
                      className="mt-0.5 accent-primary-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-sm text-gray-800">{addr.label}</span>
                        {addr.isDefault && <span className="text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full font-medium">Utama</span>}
                      </div>
                      <p className="text-sm font-medium text-gray-700">{addr.recipientName} · {addr.phone}</p>
                      <p className="text-sm text-gray-500 mt-0.5">{addr.fullAddress}</p>
                      <p className="text-sm text-gray-500">{addr.district}, {addr.city}, {addr.province} {addr.postalCode}</p>
                    </div>
                  </label>
                ))}
                <button className="w-full py-3 border-2 border-dashed border-gray-200 text-primary-500 rounded-xl text-sm font-medium hover:border-primary-300 hover:bg-primary-50 transition-colors">
                  + Tambah Alamat Baru
                </button>
              </div>
            </div>
          )}

          {/* Step: Shipping */}
          {step === 'shipping' && (
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Package className="w-5 h-5 text-primary-500" />
                Pilih Metode Pengiriman
              </h2>
              <div className="space-y-3 mb-4">
                {couriers.map((c) => (
                  <label
                    key={c.id}
                    className={cn(
                      'flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors',
                      selectedCourier === c.id ? 'border-primary-400 bg-primary-50' : 'border-gray-100 hover:border-gray-200'
                    )}
                  >
                    <input
                      type="radio"
                      value={c.id}
                      checked={selectedCourier === c.id}
                      onChange={() => setSelectedCourier(c.id)}
                      className="accent-primary-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm text-gray-800">{c.name}</span>
                        <span className="font-bold text-primary-600">{formatPrice(c.price)}</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">Estimasi tiba: {c.eta}</p>
                    </div>
                  </label>
                ))}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Catatan Pesanan (opsional)</label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Contoh: Tolong bungkus rapi, barang untuk hadiah..."
                  rows={3}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400 resize-none"
                />
              </div>
            </div>
          )}

          {/* Step: Payment */}
          {step === 'payment' && (
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary-500" />
                Pilih Metode Pembayaran
              </h2>
              <div className="space-y-2">
                {paymentMethods.map((pm) => (
                  <label
                    key={pm.id}
                    className={cn(
                      'flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors',
                      selectedPayment === pm.id ? 'border-primary-400 bg-primary-50' : 'border-gray-100 hover:border-gray-200'
                    )}
                  >
                    <input
                      type="radio"
                      value={pm.id}
                      checked={selectedPayment === pm.id}
                      onChange={() => setSelectedPayment(pm.id)}
                      className="accent-primary-500"
                    />
                    <span className="text-2xl">{pm.icon}</span>
                    <div>
                      <p className="font-semibold text-sm text-gray-800">{pm.name}</p>
                      <p className="text-xs text-gray-400">{pm.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Step: Review */}
          {step === 'review' && (
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary-500" />
                Konfirmasi Pesanan
              </h2>
              <div className="space-y-3 mb-5">
                {checkoutItems.map(({ product, qty, price, variant }) => (
                  <div key={product.id} className="flex items-center gap-3">
                    <Image src={product.images[0]} alt={product.name} width={56} height={56} className="rounded-xl object-cover" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800 line-clamp-1">{product.name}</p>
                      {variant && <p className="text-xs text-gray-400">{variant}</p>}
                      <p className="text-xs text-gray-500">x{qty} · {formatPrice(price)}</p>
                    </div>
                    <span className="text-sm font-semibold text-gray-800">{formatPrice(price * qty)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Alamat</span>
                  <span className="font-medium text-right max-w-[200px]">
                    {mockAddresses.find((a) => a.id === selectedAddress)?.city}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Pengiriman</span>
                  <span className="font-medium">{couriers.find((c) => c.id === selectedCourier)?.name}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Pembayaran</span>
                  <span className="font-medium">{paymentMethods.find((p) => p.id === selectedPayment)?.name}</span>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-4 leading-relaxed">
                Dengan menekan "Bayar Sekarang", kamu menyetujui <Link href="/terms" className="text-primary-500">syarat & ketentuan</Link> Eleven-Commerce. Dana akan ditahan dalam sistem escrow dan diteruskan ke penjual setelah kamu konfirmasi penerimaan barang.
              </p>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex gap-3">
            {currentIdx > 0 && (
              <button
                onClick={() => setStep(stepOrder[currentIdx - 1])}
                className="flex-1 py-3.5 border border-gray-200 text-gray-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors text-sm"
              >
                Kembali
              </button>
            )}
            {step !== 'review' ? (
              <button
                onClick={next}
                className="flex-1 py-3.5 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
              >
                Lanjutkan
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setOrdered(true)}
                className="flex-1 py-3.5 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-xl transition-colors text-sm"
              >
                💳 Bayar Sekarang {formatPrice(total)}
              </button>
            )}
          </div>
        </div>

        {/* Order summary sidebar */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 h-fit sticky top-24">
          <h3 className="font-bold text-gray-900 mb-4">Ringkasan Pesanan</h3>
          <div className="space-y-3 mb-4">
            {checkoutItems.map(({ product, qty, price }) => (
              <div key={product.id} className="flex items-center gap-2">
                <Image src={product.images[0]} alt={product.name} width={40} height={40} className="rounded-lg object-cover" />
                <p className="text-xs text-gray-600 flex-1 line-clamp-2">{product.name}</p>
                <span className="text-xs font-semibold text-gray-800 flex-shrink-0">{formatPrice(price * qty)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-100 pt-3 space-y-2 text-sm">
            <div className="flex justify-between text-gray-500">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Ongkir ({courier.name})</span>
              <span>{formatPrice(courier.price)}</span>
            </div>
            <div className="border-t border-gray-100 pt-2 flex justify-between font-bold text-gray-900">
              <span>Total</span>
              <span className="text-primary-600 text-lg">{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
