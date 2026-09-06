"use client"

import { useEffect, useMemo, useRef, useState } from 'react'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(res => res.json())

const statusStyle = (status: string) => {
  if(status === 'confirmed') return 'bg-blue-600 text-white'
  if(status === 'preparing') return 'bg-amber-500 text-navy'
  if(status === 'ready') return 'bg-emerald-500 text-navy'
  return 'bg-white/10 text-gray-200'
}

export default function KitchenPage(){
  const [notificationMessage, setNotificationMessage] = useState('')
  const prevOrdersRef = useRef<string>('')
  const { data, mutate } = useSWR('/api/orders', fetcher, { refreshInterval: 5000 })
  const orders = data?.orders || []

  const readyOrders = useMemo(() => orders.filter((order: any) => order.status === 'ready'), [orders])
  const queueOrders = useMemo(() => orders.filter((order: any) => order.status !== 'ready'), [orders])

  useEffect(() => {
    if(typeof window === 'undefined') return
    if('Notification' in window && Notification.permission === 'default'){
      Notification.requestPermission()
    }
  }, [])

  useEffect(() => {
    const currentIds = orders.map((order: any) => order.id).join(',')
    if(prevOrdersRef.current && prevOrdersRef.current !== currentIds){
      const message = `New order${orders.length === 1 ? '' : 's'} received in the kitchen.`
      setNotificationMessage(message)
      if(typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted'){
        new Notification(message)
      }
      const timer = window.setTimeout(() => setNotificationMessage(''), 5000)
      return () => window.clearTimeout(timer)
    }
    prevOrdersRef.current = currentIds
  }, [orders])

  async function updateOrderStatus(id: string, status: string){
    await fetch('/api/orders', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status })
    })
    await mutate()
  }

  return (
    <div className="max-w-6xl mx-auto py-10">
      <div className="glass rounded-[32px] border border-white/10 p-8 shadow-2xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-gold">Kitchen board</p>
            <h2 className="text-4xl font-semibold">Kitchen notifications and live order queue</h2>
            <p className="text-gray-300 max-w-2xl">Keep this screen open to see QR orders arrive, update preparation status, and hand off ready orders fast.</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">Pending</p>
            <p className="text-3xl font-semibold">{queueOrders.length}</p>
          </div>
        </div>
      </div>

      {notificationMessage ? (
        <div className="glass mt-6 rounded-3xl border border-white/10 p-4 text-center text-white">{notificationMessage}</div>
      ) : null}

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="glass rounded-[32px] border border-white/10 p-6">
          <h3 className="text-2xl font-semibold mb-4">Current kitchen queue</h3>
          {queueOrders.length === 0 ? (
            <div className="glass rounded-3xl p-8 text-center text-gray-300">No active orders yet. New QR checkouts will appear here automatically.</div>
          ) : (
            <div className="space-y-4">
              {queueOrders.map((order: any) => (
                <div key={order.id} className="glass rounded-3xl border border-white/10 p-4">
                  <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Order {order.id}</p>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-semibold">Table {order.table_number}</span>
                        <span className={`rounded-full px-3 py-1 text-sm ${statusStyle(order.status)}`}>{order.status}</span>
                      </div>
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
          <h3 className="text-2xl font-semibold mb-4">Ready orders</h3>
          {readyOrders.length === 0 ? (
            <div className="glass rounded-3xl p-6 text-gray-300">No orders are ready yet. Mark them ready once plating is complete.</div>
          ) : (
            <div className="space-y-3">
              {readyOrders.map((order: any) => (
                <div key={order.id} className="glass rounded-3xl border border-white/10 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-sm text-gray-400">Table {order.table_number}</div>
                      <div className="font-semibold">Order {order.id}</div>
                    </div>
                    <span className="rounded-full bg-emerald-500 px-3 py-1 text-sm text-navy">Ready</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
