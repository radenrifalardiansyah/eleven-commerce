export interface Product {
  id: string
  name: string
  slug: string
  price: number
  resellerPrice: number
  originalPrice?: number
  images: string[]
  category: string
  categoryId: string
  rating: number
  reviewCount: number
  sold: number
  stock: number
  description: string
  variants: ProductVariant[]
  seller: Seller
  location: string
  isFlashSale?: boolean
  flashSalePrice?: number
  flashSaleEnds?: string
  badge?: 'new' | 'bestseller' | 'sale'
  tags: string[]
  weight: number
}

export interface ProductVariant {
  id: string
  type: 'size' | 'color' | 'material'
  label: string
  options: VariantOption[]
}

export interface VariantOption {
  id: string
  value: string
  stock: number
  priceAdjustment?: number
}

export interface Category {
  id: string
  name: string
  icon: string
  slug: string
  productCount: number
  color: string
}

export interface Seller {
  id: string
  name: string
  avatar: string
  rating: number
  totalSales: number
  isVerified: boolean
  location: string
}

export interface Review {
  id: string
  userId: string
  userName: string
  userAvatar: string
  rating: number
  comment: string
  date: string
  images?: string[]
  variant?: string
}

export interface CartItem {
  id: string
  productId: string
  product: Product
  quantity: number
  selectedVariants: Record<string, string>
  price: number
}

export interface Order {
  id: string
  orderNumber: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned'
  items: CartItem[]
  total: number
  shippingCost: number
  createdAt: string
  estimatedDelivery: string
  trackingNumber?: string
  courier: string
  address: Address
}

export interface Address {
  id: string
  label: string
  recipientName: string
  phone: string
  province: string
  city: string
  district: string
  postalCode: string
  fullAddress: string
  isDefault: boolean
}

export interface User {
  id: string
  name: string
  email: string
  phone: string
  avatar: string
  isReseller: boolean
  resellerTier: 'bronze' | 'silver' | 'gold' | null
  joinDate: string
  totalOrders: number
  totalSpent: number
}

export interface ShippingOption {
  courier: string
  service: string
  estimatedDays: string
  price: number
}
