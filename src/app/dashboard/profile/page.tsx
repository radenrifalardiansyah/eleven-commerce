'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft, Camera, Eye, EyeOff, Check, AlertCircle } from 'lucide-react'
import { mockUser } from '@/lib/data'
import { cn } from '@/lib/utils'

export default function ProfilePage() {
  const [form, setForm] = useState({
    name: mockUser.name,
    email: mockUser.email,
    phone: mockUser.phone,
    gender: 'male',
    birthdate: '1995-08-17',
  })
  const [passwordForm, setPasswordForm] = useState({ current: '', newPass: '', confirm: '' })
  const [showPass, setShowPass] = useState({ current: false, newPass: false, confirm: false })
  const [saved, setSaved] = useState(false)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link href="/dashboard" className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <h1 className="text-xl font-bold text-gray-900">Profil Saya</h1>
      </div>

      {/* Avatar section */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-4 flex flex-col items-center">
        <div className="relative mb-4">
          <Image
            src={mockUser.avatar}
            alt={mockUser.name}
            width={96}
            height={96}
            className="rounded-2xl"
          />
          <button className="absolute -bottom-2 -right-2 w-9 h-9 bg-primary-500 hover:bg-primary-600 text-white rounded-xl shadow-md flex items-center justify-center transition-colors">
            <Camera className="w-4 h-4" />
          </button>
        </div>
        <p className="text-lg font-bold text-gray-900">{mockUser.name}</p>
        <p className="text-sm text-gray-400">{mockUser.email}</p>
        {mockUser.isReseller && (
          <span className="mt-2 text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r from-yellow-500 to-orange-400 text-white">
            🏆 Reseller {mockUser.resellerTier?.charAt(0).toUpperCase()}{mockUser.resellerTier?.slice(1)}
          </span>
        )}
      </div>

      {/* Profile form */}
      <form onSubmit={handleSave} className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5 mb-4">
        <h2 className="font-bold text-gray-900">Informasi Pribadi</h2>

        {[
          { key: 'name', label: 'Nama Lengkap', type: 'text', placeholder: 'Nama lengkap kamu' },
          { key: 'email', label: 'Email', type: 'email', placeholder: 'email@example.com' },
          { key: 'phone', label: 'Nomor Telepon', type: 'tel', placeholder: '08xxxxxxxxxx' },
        ].map(({ key, label, type, placeholder }) => (
          <div key={key}>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
            <input
              type={type}
              value={form[key as keyof typeof form]}
              onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
              placeholder={placeholder}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400 bg-white"
            />
          </div>
        ))}

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Jenis Kelamin</label>
          <div className="flex gap-3">
            {[{ value: 'male', label: 'Laki-laki' }, { value: 'female', label: 'Perempuan' }].map((opt) => (
              <label key={opt.value} className={cn(
                'flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 cursor-pointer transition-colors flex-1',
                form.gender === opt.value ? 'border-primary-400 bg-primary-50' : 'border-gray-200 hover:border-gray-300'
              )}>
                <input
                  type="radio"
                  value={opt.value}
                  checked={form.gender === opt.value}
                  onChange={() => setForm((f) => ({ ...f, gender: opt.value }))}
                  className="accent-primary-500"
                />
                <span className="text-sm font-medium text-gray-700">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Tanggal Lahir</label>
          <input
            type="date"
            value={form.birthdate}
            onChange={(e) => setForm((f) => ({ ...f, birthdate: e.target.value }))}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400 bg-white"
          />
        </div>

        <button
          type="submit"
          className={cn(
            'w-full py-3.5 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2',
            saved
              ? 'bg-emerald-500 text-white'
              : 'bg-primary-500 hover:bg-primary-600 text-white shadow-md shadow-primary-200'
          )}
        >
          {saved ? (
            <><Check className="w-4 h-4" /> Tersimpan!</>
          ) : (
            'Simpan Perubahan'
          )}
        </button>
      </form>

      {/* Change password */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
        <h2 className="font-bold text-gray-900">Ubah Password</h2>

        {[
          { key: 'current', label: 'Password Lama' },
          { key: 'newPass', label: 'Password Baru' },
          { key: 'confirm', label: 'Konfirmasi Password Baru' },
        ].map(({ key, label }) => (
          <div key={key}>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
            <div className="relative">
              <input
                type={showPass[key as keyof typeof showPass] ? 'text' : 'password'}
                value={passwordForm[key as keyof typeof passwordForm]}
                onChange={(e) => setPasswordForm((f) => ({ ...f, [key]: e.target.value }))}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 pr-11 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400"
              />
              <button
                type="button"
                onClick={() => setShowPass((s) => ({ ...s, [key]: !s[key as keyof typeof s] }))}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPass[key as keyof typeof showPass] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        ))}

        {passwordForm.newPass && passwordForm.confirm && passwordForm.newPass !== passwordForm.confirm && (
          <p className="flex items-center gap-1.5 text-xs text-red-500">
            <AlertCircle className="w-3.5 h-3.5" />
            Password tidak cocok
          </p>
        )}

        <button
          disabled={!passwordForm.current || !passwordForm.newPass || passwordForm.newPass !== passwordForm.confirm}
          className="w-full py-3.5 rounded-xl font-bold text-sm bg-gray-900 hover:bg-gray-800 text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Update Password
        </button>
      </div>
    </main>
  )
}
