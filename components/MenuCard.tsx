import { motion } from 'framer-motion'

type Item = {
  id: string
  name: string
  price: number
  veg: boolean
  description?: string
  image?: string
}

export default function MenuCard({ item, onAdd }: { item: Item, onAdd?: (i: Item)=>void }){
  return (
    <motion.div whileHover={{ y: -6, scale: 1.01 }} className="glass p-4 rounded-2xl flex gap-4 border border-white/6 hover:shadow-2xl transition-shadow">
      <div className="w-28 h-20 bg-gray-700 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center">
        {item.image ? <img src={item.image} alt={item.name} className="object-cover w-full h-full"/> : <div className="text-sm text-gray-400">No image</div>}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-white">{item.name}</h3>
          <div className="text-gold font-semibold">₹{item.price}</div>
        </div>
        <p className="text-sm text-gray-300 mt-1">{item.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <div className="text-xs text-gray-300">{item.veg ? '🌿 Veg' : '🍖 Non-veg'}</div>
          <button onClick={()=>onAdd?.(item)} className="bg-gold text-navy px-3 py-1 rounded-md font-semibold">Add</button>
        </div>
      </div>
    </motion.div>
  )
}
