import { motion } from 'framer-motion'

type CartItem = {
  id: string
  name: string
  price: number
  qty: number
  veg: boolean
}

type Props = {
  open: boolean
  items: CartItem[]
  onClose: () => void
  onRemove: (id: string) => void
  onQtyChange: (id: string, qty: number) => void
  subtotal: number
  gst: number
  total: number
  onCheckout: () => void
}

export default function CartDrawer({ open, items, onClose, onRemove, onQtyChange, subtotal, gst, total, onCheckout }: Props){
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: open ? 1 : 0 }}
      className={`fixed inset-0 z-50 ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}
    >
      <div onClick={onClose} className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: open ? 0 : '100%' }}
        transition={{ type: 'spring', stiffness: 260, damping: 26 }}
        className="absolute right-0 top-0 h-full w-full md:w-[420px] bg-[#061025] glass border-l border-white/10 p-6 overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-gold">Your Order</p>
            <h2 className="text-2xl font-semibold">Cart Summary</h2>
          </div>
          <button onClick={onClose} className="text-gray-300 hover:text-white">Close</button>
        </div>
        <div className="space-y-4">
          {items.length === 0 ? (
            <div className="glass p-6 rounded-3xl text-center text-gray-300">Your cart is empty — add a dish to begin.</div>
          ) : items.map(item => (
            <div key={item.id} className="glass p-4 rounded-3xl">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-xs text-gray-400">{item.veg ? 'Veg' : 'Non-Veg'}</p>
                </div>
                <div className="text-gold font-semibold">₹{item.price * item.qty}</div>
              </div>
              <div className="mt-3 flex items-center justify-between gap-3 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <button onClick={() => onQtyChange(item.id, Math.max(1, item.qty - 1))} className="w-8 h-8 rounded-full bg-white/10">-</button>
                  <span>{item.qty}</span>
                  <button onClick={() => onQtyChange(item.id, item.qty + 1)} className="w-8 h-8 rounded-full bg-white/10">+</button>
                </div>
                <button onClick={() => onRemove(item.id)} className="text-red-400 hover:text-red-300">Remove</button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 border-t border-white/10 pt-5 space-y-3 text-sm text-gray-300">
          <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal}</span></div>
          <div className="flex justify-between"><span>GST 5%</span><span>₹{gst}</span></div>
          <div className="flex justify-between font-semibold text-white text-lg"><span>Total</span><span>₹{total}</span></div>
        </div>
        <button onClick={onCheckout} disabled={items.length === 0} className="mt-6 w-full rounded-3xl bg-gold py-3 text-navy font-semibold disabled:opacity-50">Checkout</button>
      </motion.div>
    </motion.div>
  )
}
