"use client"

import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(res => res.json())

const statusLabel = {
  confirmed: 'Confirmed',
  preparing: 'Preparing',
  ready: 'Ready'
}

export default function AdminPage(){
  const { data, error, mutate } = useSWR('/api/orders', fetcher, { refreshInterval: 5000 })
  const orders = data?.orders || []

  async function updateOrderStatus(id: string, status: string){
    await fetch('/api/orders', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status })
    })
    await mutate()
  }

  const confirmedOrders = orders.filter((order: any) => order.status === 'confirmed')
  const preparingOrders = orders.filter((order: any) => order.status === 'preparing')
  const readyOrders = orders.filter((order: any) => order.status === 'ready')

  return (
    <div className="max-w-6xl mx-auto py-10">
      <div className="glass p-8 rounded-[32px] border border-white/10 shadow-2xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-gold">Admin panel</p>
            <h2 className="text-4xl font-semibold">Manage every café order in one dashboard.</h2>
            <p className="text-gray-300 max-w-2xl">See incoming orders, update kitchen status, and keep restaurant staff aligned with real-time service visibility.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="glass rounded-3xl border border-white/10 p-4 text-center">
              <div className="text-sm uppercase tracking-[0.3em] text-gray-400">New</div>
              <div className="text-3xl font-semibold">{confirmedOrders.length}</div>
            </div>
            <div className="glass rounded-3xl border border-white/10 p-4 text-center">
              <div className="text-sm uppercase tracking-[0.3em] text-gray-400">Preparing</div>
              <div className="text-3xl font-semibold">{preparingOrders.length}</div>
            </div>
            <div className="glass rounded-3xl border border-white/10 p-4 text-center">
              <div className="text-sm uppercase tracking-[0.3em] text-gray-400">Ready</div>
              <div className="text-3xl font-semibold">{readyOrders.length}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.8fr_1fr]">
        <div className="glass rounded-[32px] border border-white/10 p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-2xl font-semibold">Order queue</h3>
              <p className="text-sm text-gray-400">Refreshes automatically every 5 seconds.</p>
            </div>
            <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-gray-300">{orders.length} total orders</span>
          </div>
          {orders.length === 0 ? (
            <div className="glass rounded-3xl p-8 text-center text-gray-300">No orders yet. The cafe QR system will start populating orders as customers checkout.</div>
          ) : (
            <div className="space-y-4">
              {orders.map((order: any) => (
                <div key={order.id} className="glass rounded-3xl border border-white/10 p-4">
                  <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Order ID {order.id}</p>
                      <div className="flex flex-wrap gap-2 items-center">
                        <span className="text-lg font-semibold">Table {order.table_number}</span>
                        <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-gray-200">{statusLabel[order.status] || order.status}</span>
                        <span className="text-sm text-gray-300">₹{order.total}</span>
                      </div>
                      <p className="text-sm text-gray-400 mt-2">{order.notes || 'No special notes'}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button onClick={() => updateOrderStatus(order.id, 'preparing')} className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold hover:bg-blue-500">Preparing</button>
                      <button onClick={() => updateOrderStatus(order.id, 'ready')} className="rounded-full bg-gold text-navy px-4 py-2 text-sm font-semibold hover:brightness-110">Ready</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="glass rounded-[32px] border border-white/10 p-6">
          <h3 className="text-2xl font-semibold mb-4">Kitchen notifications</h3>
          <div className="space-y-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm uppercase tracking-[0.25em] text-gold">Instant alerts</p>
              <p className="text-gray-300 mt-2">Every new QR checkout shows immediately in the kitchen queue and admin order board.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-gray-300">Use the buttons to advance order status from confirmed to preparing to ready. Kitchen staff can monitor the same flow in the dedicated kitchen view.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold">Pro tip</p>
              <p className="text-gray-300 mt-2">Keep this tab open in the admin station so the latest table orders always appear without manual refresh.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
