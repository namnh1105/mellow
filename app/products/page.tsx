'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import Header from '../../components/layout/Header'
import mood1 from '../../assets/product/moodsoap/mood1.png'
import mood2 from '../../assets/product/moodsoap/mood2.png'
import mood3 from '../../assets/product/moodsoap/mood3.png'
import mood4 from '../../assets/product/moodsoap/mood4.png'
import mood5 from '../../assets/product/moodsoap/mood5.png'
import mood6 from '../../assets/product/moodsoap/mood6.png'
import buildYourOwnSoapImage from '../../assets/buildyourownsoap.png'
import giftBoxImage from '../../assets/giftbox.png'

type ProductCategory = 'all' | 'mood-soap' | 'build-your-own' | 'gift-box'

type Product = {
  id: string
  name: string
  category: Exclude<ProductCategory, 'all'>
  price: number
  description: string
  image: string | { src: string }
  badge: string
}

type CartItem = Product & {
  quantity: number
}

const products: Product[] = [
  {
    id: 'calm-lavender',
    name: 'Calm Lavender',
    category: 'mood-soap',
    price: 140000,
    description: 'Gentle jasmine scented soap, helping you relax after a long day.',
    image: mood1,
    badge: 'Calm',
  },
  {
    id: 'energy-citrus',
    name: 'Energy Citrus',
    category: 'mood-soap',
    price: 140000,
    description: 'Refreshing citrus scent, awakening energy for the morning.',
    image: mood2,
    badge: 'Energy',
  },
  {
    id: 'focus-mint',
    name: 'Focus Mint',
    category: 'mood-soap',
    price: 140000,
    description: 'Mint & rosemary for a feeling of alertness and focus.',
    image: mood3,
    badge: 'Focus',
  },
  {
    id: 'love-rose',
    name: 'Love Rose',
    category: 'mood-soap',
    price: 140000,
    description: 'Warm rose scent, creating a feeling of love and softness.',
    image: mood4,
    badge: 'Love',
  },
  {
    id: 'comfort-vanilla',
    name: 'Comfort Vanilla',
    category: 'mood-soap',
    price: 140000,
    description: 'Gentle vanilla, bringing a sense of safety and relaxation.',
    image: mood5,
    badge: 'Comfort',
  },
  {
    id: 'reset-oat',
    name: 'Reset Oat',
    category: 'mood-soap',
    price: 140000,
    description: 'Smooth oat scent, helping the skin be nourished and calmed.',
    image: mood6,
    badge: 'Reset',
  },
  {
    id: 'build-your-own',
    name: 'Build Your Own Soap',
    category: 'build-your-own',
    price: 190000,
    description: 'Choose scent, color, shape and message to create a personalized soap.',
    image: buildYourOwnSoapImage,
    badge: 'Custom',
  },
  {
    id: 'mellow-gift-box',
    name: 'Mood Gift Box',
    category: 'gift-box',
    price: 260000,
    description: 'Gift box for moments of love, includes washing bag and personal card.',
    image: giftBoxImage,
    badge: 'Gift',
  },
]

const filters: { label: string; value: ProductCategory }[] = [
  { label: 'All', value: 'all' },
  { label: 'Mood Soap', value: 'mood-soap' },
  { label: 'Build Your Own', value: 'build-your-own' },
  { label: 'Gift Box', value: 'gift-box' },
]

export default function ProductsPage() {
  const [activeFilter, setActiveFilter] = useState<ProductCategory>('all')
  const [cart, setCart] = useState<CartItem[]>([])
  const [customer, setCustomer] = useState({ name: '', phone: '', address: '' })
  const [orderPlaced, setOrderPlaced] = useState(false)

  const visibleProducts = useMemo(
    () => (activeFilter === 'all' ? products : products.filter((product) => product.category === activeFilter)),
    [activeFilter],
  )

  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart],
  )
  const shippingFee = cart.length > 0 ? 30000 : 0
  const total = subtotal + shippingFee

  const addToCart = (product: Product) => {
    setOrderPlaced(false)
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id)
      if (existing) {
        return current.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }

      return [...current, { ...product, quantity: 1 }]
    })
  }

  const updateQuantity = (productId: string, delta: number) => {
    setCart((current) =>
      current
        .map((item) =>
          item.id === productId ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  const handleCheckout = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!cart.length || !customer.name || !customer.phone || !customer.address) {
      return
    }

    setOrderPlaced(true)
    setCustomer({ name: '', phone: '', address: '' })
    setCart([])
  }

  return (
    <main className="shop-page-shell">
      <Header />

      <section className="shop-hero">
        <div>
          <p className="shop-kicker">Mellow Shop</p>
          <h1>Choose the feeling you want to carry today.</h1>
          <p className="shop-hero-copy">
            From mood soaps to gift sets and creative options, each product is handmade to spread a feeling of comfort and relaxation.
          </p>
        </div>
      </section>

      <section className="shop-layout">
        <div className="product-panel">
          <div className="shop-toolbar">
            <div className="shop-filter-group" aria-label="Filter products by type">
              {filters.map((filter) => (
                <button
                  key={filter.value}
                  type="button"
                  className={filter.value === activeFilter ? 'active' : ''}
                  onClick={() => setActiveFilter(filter.value)}
                >
                  {filter.label}
                </button>
              ))}
            </div>
            <p>{visibleProducts.length} products</p>
          </div>

          <div className="shop-product-grid">
            {visibleProducts.map((product) => (
              <article key={product.id} className="shop-product-card">
                <div className="shop-product-image-wrap">
                  <img
                    src={typeof product.image === 'string' ? product.image : product.image.src}
                    alt={product.name}
                    className="shop-product-image"
                  />
                </div>
                <div className="shop-product-body">
                  <div className="shop-product-meta">
                    <span className="shop-badge">{product.badge}</span>
                    <span className="shop-category">{product.category === 'mood-soap' ? 'Mood Soap' : product.category === 'build-your-own' ? 'Build Your Own' : 'Gift Box'}</span>
                  </div>
                  <h2>{product.name}</h2>
                  <p>{product.description}</p>
                  <div className="shop-price-row">
                    <strong>{product.price.toLocaleString('en-US')}₫</strong>
                    <button type="button" onClick={() => addToCart(product)}>
                      Add to cart
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <aside className="cart-panel">
          <div className="cart-panel-header">
            <h3>Shopping Cart</h3>
            <span>{cart.reduce((sum, item) => sum + item.quantity, 0)} items</span>
          </div>

          {cart.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty.</p>
              <span>Please choose a soap you love.</span>
            </div>
          ) : (
            <div className="cart-list">
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-copy">
                    <strong>{item.name}</strong>
                    <span>{item.price.toLocaleString('en-US')}₫</span>
                  </div>
                  <div className="cart-item-actions">
                    <button type="button" onClick={() => updateQuantity(item.id, -1)} aria-label={`Decrease ${item.name}`}>
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button type="button" onClick={() => updateQuantity(item.id, 1)} aria-label={`Increase ${item.name}`}>
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="order-summary">
            <div>
              <span>Subtotal</span>
              <strong>{subtotal.toLocaleString('en-US')}₫</strong>
            </div>
            <div>
              <span>Shipping Fee</span>
              <strong>{shippingFee.toLocaleString('en-US')}₫</strong>
            </div>
            <div className="total-row">
              <span>Total</span>
              <strong>{total.toLocaleString('en-US')}₫</strong>
            </div>
          </div>

          <form className="checkout-form" onSubmit={handleCheckout}>
            <label>
              Full Name
              <input
                type="text"
                value={customer.name}
                onChange={(event) => setCustomer((current) => ({ ...current, name: event.target.value }))}
                placeholder="Enter your full name"
                required
              />
            </label>
            <label>
              Phone Number
              <input
                type="tel"
                value={customer.phone}
                onChange={(event) => setCustomer((current) => ({ ...current, phone: event.target.value }))}
                placeholder="Enter your phone number"
                required
              />
            </label>
            <label>
              Shipping Address
              <textarea
                rows={4}
                value={customer.address}
                onChange={(event) => setCustomer((current) => ({ ...current, address: event.target.value }))}
                placeholder="Enter your shipping address"
                required
              />
            </label>

            <button type="submit" className="checkout-button" disabled={cart.length === 0}>
              Place Order Now
            </button>
          </form>
          {orderPlaced && (
            <div className="order-success" role="status">
              Order placed successfully! We will contact you to confirm soon.
            </div>
          )}
        </aside>
      </section>
    </main>
  )
}
