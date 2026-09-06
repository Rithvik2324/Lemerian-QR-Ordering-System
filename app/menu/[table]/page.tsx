"use client"

import { useMemo, useState } from 'react'
import { notFound } from 'next/navigation'
import MenuGrid from '../../../components/MenuGrid'
import { menuItems } from '../../../data/menu'
import FloatingCartButton from '../../../components/FloatingCartButton'
import SearchFilter from '../../../components/SearchFilter'
import AIRecommendations from '../../../components/AIRecommendations'
import OrderTracker from '../../../components/OrderTracker'
import CartDrawer from '../../../components/CartDrawer'

type Props = { params: { table: string } }

type CartItem = {
  id: string
  name: string
  price: number
  qty: number
  veg: boolean
}

export default function MenuPage({ params }: Props){
  const table = Number(params.table)
  if(!table) return notFound()

  const categories = useMemo(() => {
    const categories = Array.from(new Set(menuItems.map(item => item.category || 'Uncategorized')))
    return ['All', ...categories.sort()]
  }, [])

  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [cart, setCart] = useState<CartItem[]>([])
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [orderStatus, setOrderStatus] = useState('confirmed')
  const [checkoutState, setCheckoutState] = useState({ loading: false, message: '' })

  const filteredItems = useMemo(() => {
    return menuItems.filter(item => {
      const matchesSearch = query.length === 0 || item.name.toLowerCase().includes(query.toLowerCase()) || item.description?.toLowerCase().includes(query.toLowerCase())
      const matchesCategory = category === 'All' || item.category === category
      return matchesSearch && matchesCategory
    })
  }, [query, category])

  function addToCart(item: any){
    setCart(prev => {
      const existing = prev.find(p => p.id === item.id)
      if(existing) return prev.map(p => p.id === item.id ? { ...p, qty: p.qty + 1 } : p)
      return [...prev, { id: item.id, name: item.name, price: item.price, qty: 1, veg: item.veg }]
    })
    setDrawerOpen(true)
  }

  function removeFromCart(id: string){
    setCart(prev => prev.filter(item => item.id !== id))
  }

  function changeQty(id: string, qty: number){
    setCart(prev => prev.map(item => item.id === id ? { ...item, qty } : item))
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0)
  const gst = Math.round(subtotal * 0.05)
  const total = subtotal + gst
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0)

  async function handleCheckout(){
    if(cart.length === 0) return
    setCheckoutState({ loading: true, message: '' })

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          table_number: table,
          items: cart.map(item => ({ id: item.id, qty: item.qty, price: item.price })),
          total,
          gst,
          notes: `QR order placed from table ${table}`
        })
      })

      const result = await response.json()
      if (!response.ok) {
        throw new Error(result.error?.message || 'Unable to place order')
      }

      setCheckoutState({ loading: false, message: `Order received! Order ID ${result.order.id?.slice(0, 8) || ''}` })
      setCart([])
      setOrderStatus('confirmed')
      setDrawerOpen(false)
      window.setTimeout(() => setCheckoutState(prev => ({ ...prev, message: '' })), 6000)
    } catch (error: any) {
      setCheckoutState({ loading: false, message: error.message || 'Order failed' })
    }
  }

  return (
    <div className="max-w-6xl mx-auto py-10">
      <div className="glass p-8 rounded-[32px] border border-white/10 shadow-2xl">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.4em] text-gold">Lemerian Workin Café</p>
            <h1 className="text-4xl font-semibold leading-tight">Luxury QR ordering for modern work cafés.</h1>
            <p className="text-gray-300 max-w-2xl">Scan the table QR code, browse curated dishes instantly, and checkout in a premium mobile-first menu designed for Zyrenox Technologies.</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="glass p-4 rounded-3xl border border-white/10">
                <p className="text-xs uppercase text-gray-400">Table</p>
                <p className="text-xl font-semibold">{table}</p>
              </div>
              <div className="glass p-4 rounded-3xl border border-white/10">
                <p className="text-xs uppercase text-gray-400">Estimated prep</p>
                <p className="text-xl font-semibold">10-25 mins</p>
              </div>
            </div>
          </div>
          <div className="glass p-6 rounded-[32px] border border-white/10">
            <div className="mb-4">
              <p className="text-sm uppercase tracking-[0.2em] text-gold">Live Kitchen Status</p>
              <h2 className="text-2xl font-semibold">Real-time order tracking</h2>
            </div>
            <OrderTracker status={orderStatus} />
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-8">
        <SearchFilter categories={categories} selected={category} onSearch={setQuery} onCategory={setCategory} />
        <AIRecommendations />
        <div className="glass p-6 rounded-3xl border border-white/10">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <p className="text-sm text-gray-400">{filteredItems.length} dishes available</p>
              <h2 className="text-2xl font-semibold">Discover the chef’s best menu</h2>
            </div>
            <div className="text-sm text-gray-300">Your cart will stay ready as you browse.</div>
          </div>
          <MenuGrid items={filteredItems} onAdd={addToCart} />
        </div>
      </div>

      {checkoutState.message ? (
        <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-gray-200">{checkoutState.message}</div>
      ) : null}

      <CartDrawer
        open={drawerOpen}
        items={cart}
        onClose={() => setDrawerOpen(false)}
        onRemove={removeFromCart}
        onQtyChange={changeQty}
        subtotal={subtotal}
        gst={gst}
        total={total}
        onCheckout={handleCheckout}
      />
      <FloatingCartButton count={totalQty} onClick={() => setDrawerOpen(true)} />
    </div>
  )
}
