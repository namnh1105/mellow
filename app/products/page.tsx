'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
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
    description: 'Sữa xà phòng thơm nhài dịu nhẹ, giúp thư giãn sau một ngày dài.',
    image: mood1,
    badge: 'Calm',
  },
  {
    id: 'energy-citrus',
    name: 'Energy Citrus',
    category: 'mood-soap',
    price: 140000,
    description: 'Hương cam chanh sảng khoái, khơi dậy năng lượng cho buổi sáng.',
    image: mood2,
    badge: 'Energy',
  },
  {
    id: 'focus-mint',
    name: 'Focus Mint',
    category: 'mood-soap',
    price: 140000,
    description: 'Bạc hà & rosemary cho cảm giác tỉnh táo và tập trung.',
    image: mood3,
    badge: 'Focus',
  },
  {
    id: 'love-rose',
    name: 'Love Rose',
    category: 'mood-soap',
    price: 140000,
    description: 'Hương hoa hồng ấm áp, tạo cảm giác yêu thương và dịu mịn.',
    image: mood4,
    badge: 'Love',
  },
  {
    id: 'comfort-vanilla',
    name: 'Comfort Vanilla',
    category: 'mood-soap',
    price: 140000,
    description: 'Vanilla dịu nhẹ, mang lại cảm giác an toàn và thư thái.',
    image: mood5,
    badge: 'Comfort',
  },
  {
    id: 'reset-oat',
    name: 'Reset Oat',
    category: 'mood-soap',
    price: 140000,
    description: 'Hương yến mạch mềm mịn, giúp da được nuôi dưỡng và làm dịu.',
    image: mood6,
    badge: 'Reset',
  },
  {
    id: 'build-your-own',
    name: 'Build Your Own Soap',
    category: 'build-your-own',
    price: 190000,
    description: 'Tự chọn mùi, màu sắc, hình dạng và lời nhắn để tạo ra một chiếc xà phòng cá nhân hóa.',
    image: buildYourOwnSoapImage,
    badge: 'Custom',
  },
  {
    id: 'mellow-gift-box',
    name: 'Mood Gift Box',
    category: 'gift-box',
    price: 260000,
    description: 'Hộp quà dành cho những khoảnh khắc yêu thương, kèm túi rửa và thiệp cá nhân.',
    image: giftBoxImage,
    badge: 'Gift',
  },
]

const filters: { label: string; value: ProductCategory }[] = [
  { label: 'Tất cả', value: 'all' },
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
      <header className="shop-header">
        <Link href="/" className="shop-brand" aria-label="Về trang chủ Mellow">
          <span>MELLOW</span>
        </Link>
        <nav className="shop-main-nav" aria-label="Menu điều hướng sản phẩm">
          <Link href="/">Trang chủ</Link>
          <Link href="/products">Shop</Link>
          <Link href="/#collections">Collection</Link>
          <Link href="/#about">About us</Link>
        </nav>
      </header>

      <section className="shop-hero">
        <div>
          <p className="shop-kicker">Mellow Shop</p>
          <h1>Chọn cảm giác bạn muốn mang theo hôm nay.</h1>
          <p className="shop-hero-copy">
            Từ những chiếc xà phòng theo mood đến bộ quà tặng và tùy chọn sáng tạo, mỗi sản phẩm đều được làm thủ công để lan tỏa cảm giác dễ chịu và thư giãn.
          </p>
        </div>
      </section>

      <section className="shop-layout">
        <div className="product-panel">
          <div className="shop-toolbar">
            <div className="shop-filter-group" aria-label="Lọc sản phẩm theo loại">
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
            <p>{visibleProducts.length} sản phẩm</p>
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
                    <strong>{product.price.toLocaleString('vi-VN')}₫</strong>
                    <button type="button" onClick={() => addToCart(product)}>
                      Thêm vào giỏ
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <aside className="cart-panel">
          <div className="cart-panel-header">
            <h3>Giỏ hàng</h3>
            <span>{cart.reduce((sum, item) => sum + item.quantity, 0)} món</span>
          </div>

          {cart.length === 0 ? (
            <div className="empty-cart">
              <p>Chưa có sản phẩm nào trong giỏ.</p>
              <span>Hãy chọn một chiếc xà phòng bạn thích nhé.</span>
            </div>
          ) : (
            <div className="cart-list">
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-copy">
                    <strong>{item.name}</strong>
                    <span>{item.price.toLocaleString('vi-VN')}₫</span>
                  </div>
                  <div className="cart-item-actions">
                    <button type="button" onClick={() => updateQuantity(item.id, -1)} aria-label={`Giảm ${item.name}`}>
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button type="button" onClick={() => updateQuantity(item.id, 1)} aria-label={`Tăng ${item.name}`}>
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="order-summary">
            <div>
              <span>Tạm tính</span>
              <strong>{subtotal.toLocaleString('vi-VN')}₫</strong>
            </div>
            <div>
              <span>Phí vận chuyển</span>
              <strong>{shippingFee.toLocaleString('vi-VN')}₫</strong>
            </div>
            <div className="total-row">
              <span>Tổng cộng</span>
              <strong>{total.toLocaleString('vi-VN')}₫</strong>
            </div>
          </div>

          <form className="checkout-form" onSubmit={handleCheckout}>
            <label>
              Họ tên
              <input
                type="text"
                value={customer.name}
                onChange={(event) => setCustomer((current) => ({ ...current, name: event.target.value }))}
                placeholder="Nguyễn Văn A"
                required
              />
            </label>
            <label>
              Số điện thoại
              <input
                type="tel"
                value={customer.phone}
                onChange={(event) => setCustomer((current) => ({ ...current, phone: event.target.value }))}
                placeholder="0987654321"
                required
              />
            </label>
            <label>
              Địa chỉ giao hàng
              <textarea
                rows={4}
                value={customer.address}
                onChange={(event) => setCustomer((current) => ({ ...current, address: event.target.value }))}
                placeholder="123 Đường ABC, Quận 1, TP.HCM"
                required
              />
            </label>

            <button type="submit" className="checkout-button" disabled={cart.length === 0}>
              Đặt hàng ngay
            </button>
          </form>

          {orderPlaced && (
            <div className="order-success" role="status">
              Đặt hàng thành công! Chúng tôi sẽ liên hệ xác nhận trong thời gian sớm nhất.
            </div>
          )}
        </aside>
      </section>
    </main>
  )
}
