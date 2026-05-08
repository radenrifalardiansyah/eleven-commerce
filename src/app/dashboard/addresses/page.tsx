'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronLeft, Plus, Pencil, Trash2, MapPin, Check } from 'lucide-react'
import { mockAddresses } from '@/lib/data'
import { Address } from '@/types'
import { cn } from '@/lib/utils'

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>(mockAddresses)
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState({
    label: '', recipientName: '', phone: '', province: '', city: '', district: '', postalCode: '', fullAddress: '',
  })

  const openAdd = () => {
    setEditId(null)
    setForm({ label: '', recipientName: '', phone: '', province: '', city: '', district: '', postalCode: '', fullAddress: '' })
    setShowForm(true)
  }

  const openEdit = (addr: Address) => {
    setEditId(addr.id)
    setForm({ label: addr.label, recipientName: addr.recipientName, phone: addr.phone, province: addr.province, city: addr.city, district: addr.district, postalCode: addr.postalCode, fullAddress: addr.fullAddress })
    setShowForm(true)
  }

  const handleSave = () => {
    if (editId) {
      setAddresses((prev) => prev.map((a) => a.id === editId ? { ...a, ...form } : a))
    } else {
      setAddresses((prev) => [...prev, { ...form, id: `a${Date.now()}`, isDefault: false }])
    }
    setShowForm(false)
  }

  const handleDelete = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id))
  }

  const setDefault = (id: string) => {
    setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })))
  }

  const fields = [
    { key: 'label', label: 'Label Alamat', placeholder: 'Rumah, Kantor, dll.' },
    { key: 'recipientName', label: 'Nama Penerima', placeholder: 'Nama lengkap penerima' },
    { key: 'phone', label: 'Nomor Telepon', placeholder: '08xxxxxxxxxx' },
    { key: 'province', label: 'Provinsi', placeholder: 'DKI Jakarta' },
    { key: 'city', label: 'Kota / Kabupaten', placeholder: 'Jakarta Selatan' },
    { key: 'district', label: 'Kecamatan', placeholder: 'Kebayoran Baru' },
    { key: 'postalCode', label: 'Kode Pos', placeholder: '12110' },
  ]

  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <h1 className="text-xl font-bold text-gray-900">Buku Alamat</h1>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-1.5 text-sm font-semibold text-primary-500 hover:text-primary-600 bg-primary-50 hover:bg-primary-100 px-3 py-2 rounded-xl transition-colors"
        >
          <Plus className="w-4 h-4" />
          Tambah
        </button>
      </div>

      {/* Address list */}
      <div className="space-y-3 mb-6">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className={cn(
              'bg-white rounded-2xl border-2 p-5 transition-colors',
              addr.isDefault ? 'border-primary-300' : 'border-gray-100'
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <MapPin className="w-4 h-4 text-primary-500 flex-shrink-0" />
                  <span className="font-bold text-gray-800">{addr.label}</span>
                  {addr.isDefault && (
                    <span className="text-xs font-bold bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full">
                      Alamat Utama
                    </span>
                  )}
                </div>
                <p className="text-sm font-semibold text-gray-700">{addr.recipientName}</p>
                <p className="text-sm text-gray-500">{addr.phone}</p>
                <p className="text-sm text-gray-500 mt-1">{addr.fullAddress}</p>
                <p className="text-sm text-gray-500">{addr.district}, {addr.city}, {addr.province} {addr.postalCode}</p>
              </div>
              <div className="flex flex-col gap-2 flex-shrink-0">
                <button
                  onClick={() => openEdit(addr)}
                  className="flex items-center gap-1 text-xs text-gray-500 hover:text-primary-600 border border-gray-200 hover:border-primary-300 px-2.5 py-1.5 rounded-lg transition-colors"
                >
                  <Pencil className="w-3.5 h-3.5" />
                  Edit
                </button>
                {!addr.isDefault && (
                  <button
                    onClick={() => handleDelete(addr.id)}
                    className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600 border border-red-100 hover:border-red-200 px-2.5 py-1.5 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Hapus
                  </button>
                )}
              </div>
            </div>
            {!addr.isDefault && (
              <button
                onClick={() => setDefault(addr.id)}
                className="mt-3 flex items-center gap-1.5 text-xs text-primary-500 hover:text-primary-600 font-medium"
              >
                <Check className="w-3.5 h-3.5" />
                Jadikan Alamat Utama
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-white w-full max-w-lg rounded-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-bold text-gray-900">{editId ? 'Edit Alamat' : 'Tambah Alamat Baru'}</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600 text-xl font-light">✕</button>
            </div>
            <div className="p-6 space-y-4">
              {fields.map(({ key, label, placeholder }) => (
                <div key={key}>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
                  <input
                    value={form[key as keyof typeof form]}
                    onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                    placeholder={placeholder}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400"
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Alamat Lengkap</label>
                <textarea
                  value={form.fullAddress}
                  onChange={(e) => setForm((f) => ({ ...f, fullAddress: e.target.value }))}
                  placeholder="Nama jalan, nomor rumah, RT/RW..."
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400 resize-none"
                />
              </div>
              <button
                onClick={handleSave}
                className="w-full py-3.5 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-xl transition-colors"
              >
                {editId ? 'Simpan Perubahan' : 'Tambah Alamat'}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
