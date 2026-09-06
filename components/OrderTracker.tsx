import { motion } from 'framer-motion'

export default function OrderTracker({ status = 'confirmed' }: { status?: string }){
  const stages = ['confirmed','preparing','ready','served']
  const idx = stages.indexOf(status)
  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 w-44 glass p-3 rounded-lg">
      <h4 className="text-sm font-semibold mb-2">Order Status</h4>
      <div className="flex flex-col gap-2">
        {stages.map((s,i)=> (
          <motion.div key={s} animate={{ opacity: i<=idx?1:0.4, x: i<=idx?0:6 }} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${i<=idx? 'bg-gold':'bg-gray-600'}`}></div>
            <div className="text-sm text-gray-300 capitalize">{s.replace('-', ' ')}</div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
