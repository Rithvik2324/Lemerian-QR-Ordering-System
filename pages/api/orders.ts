import type { NextApiRequest, NextApiResponse } from 'next'

type DemoOrder = {
  id: string
  table_number: number
  status: string
  total: number
  gst: number
  created_at: string
  notes?: string
}

let demoOrders: DemoOrder[] = [
  { id: 'demo-1', table_number: 1, status: 'confirmed', total: 549, gst: 28, created_at: new Date().toISOString(), notes: 'Demo order for kitchen' },
  { id: 'demo-2', table_number: 2, status: 'preparing', total: 329, gst: 16, created_at: new Date().toISOString(), notes: 'Sample order in progress' }
]

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || ''
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || ''
  const usingSupabase = Boolean(url && key)

  async function handleDemoGet(){
    return res.status(200).json({ orders: demoOrders })
  }

  async function handleDemoPost(){
    const { table_number, items, total, gst, notes } = req.body
    const nextOrder: DemoOrder = {
      id: `demo-${Date.now()}`,
      table_number,
      total,
      gst,
      notes,
      status: 'confirmed',
      created_at: new Date().toISOString()
    }
    demoOrders = [nextOrder, ...demoOrders]
    return res.status(201).json({ order: nextOrder })
  }

  async function handleDemoPatch(){
    const { id, status } = req.body
    const order = demoOrders.find(item => item.id === id)
    if(!order) return res.status(404).json({ error: 'Order not found' })
    order.status = status
    return res.status(200).json({ order })
  }

  if(!usingSupabase){
    if(req.method === 'GET') return handleDemoGet()
    if(req.method === 'POST') return handleDemoPost()
    if(req.method === 'PATCH') return handleDemoPatch()
    return res.status(405).end()
  }

  const { createClient } = await import('@supabase/supabase-js')
  const supabase = createClient(url, key)

  if(req.method === 'POST'){
    const { table_number, items, total, gst, notes } = req.body
    const { data: order, error } = await supabase.from('orders').insert([{ table_number, total, gst, notes, status: 'confirmed' }]).select().single()
    if(error) return res.status(500).json({ error })
    const orderItems = items.map((it:any)=>({ order_id: order.id, menu_item_id: it.id, qty: it.qty, price: it.price, notes: it.notes || null }))
    const { error: ei } = await supabase.from('order_items').insert(orderItems)
    if(ei) return res.status(500).json({ error: ei })
    return res.status(201).json({ order })
  }

  if(req.method === 'PATCH'){
    const { id, status } = req.body
    const { data: order, error } = await supabase.from('orders').update({ status }).eq('id', id).select().single()
    if(error) return res.status(500).json({ error })
    return res.status(200).json({ order })
  }

  if(req.method === 'GET'){
    const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false })
    if(error) return res.status(500).json({ error })
    return res.status(200).json({ orders: data })
  }

  res.status(405).end()
}
