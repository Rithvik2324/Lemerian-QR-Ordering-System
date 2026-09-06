import { motion } from 'framer-motion'

type Props = {
  count: number
  onClick: () => void
}

export default function FloatingCartButton({ count, onClick }: Props){
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={onClick}
      className="fixed bottom-6 right-6 bg-gold text-navy px-5 py-3 rounded-full shadow-2xl font-semibold flex items-center gap-2"
    >
      Cart {count > 0 ? `(${count})` : ''}
    </motion.button>
  )
}
