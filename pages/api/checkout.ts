import type { NextApiRequest, NextApiResponse } from 'next'
import Razorpay from 'razorpay'

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  if(req.method !== 'POST') return res.status(405).end()
  const { amount } = req.body
  const key_id = process.env.RAZORPAY_KEY_ID || ''
  const key_secret = process.env.RAZORPAY_KEY_SECRET || ''
  if(!key_id || !key_secret) return res.status(500).json({ error: 'Razorpay not configured. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in env.' })
  const razorpay = new Razorpay({ key_id, key_secret })

  try{
    const order = await razorpay.orders.create({ amount: Math.round(amount*100), currency: 'INR' })
    return res.status(200).json(order)
  }catch(err:any){
    return res.status(500).json({ error: err.message })
  }
}
