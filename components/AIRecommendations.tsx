export default function AIRecommendations(){
  const items = [
    { id:'m1', name:'Butter Chicken Ghee Rice', price:549 },
    { id:'m2', name:'Paneer Steak', price:499 },
    { id:'m3', name:'Pesto Grill Chicken', price:555 }
  ]

  return (
    <div className="mt-6 glass p-5 rounded-3xl border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-gold">AI Picks</p>
          <h4 className="text-xl font-semibold">Recommended for your table</h4>
        </div>
        <span className="text-sm text-gray-400">Smart suggestions</span>
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {items.map(item=> (
          <div key={item.id} className="glass p-4 rounded-3xl">
            <div className="font-semibold">{item.name}</div>
            <div className="text-sm text-gray-300">₹{item.price}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
