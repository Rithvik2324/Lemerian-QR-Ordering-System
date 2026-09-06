import type { NextApiRequest, NextApiResponse } from 'next'
import { menuItems } from '../../data/menu'

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  // Seeds demo menu items into Supabase (run once)
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || ''
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || ''
  if(!url || !key) return res.status(500).json({ error: 'Supabase not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in env.' })
  const { createClient } = await import('@supabase/supabase-js')
  const supabase = createClient(url, key)

  try{
    for(const m of menuItems){
      await supabase.from('menu_items').upsert(m)
    }
    return res.status(200).json({ seeded: menuItems.length })
  }catch(err:any){
    return res.status(500).json({ error: err.message })
  }
}
