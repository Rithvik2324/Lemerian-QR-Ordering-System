import MenuCard from './MenuCard'

export default function MenuGrid({ items, onAdd }: { items: any[], onAdd: (item: any)=>void }){
  return (
    <div className="grid md:grid-cols-2 gap-5">
      {items.map(item => <MenuCard key={item.id} item={item} onAdd={onAdd} />)}
    </div>
  )
}
