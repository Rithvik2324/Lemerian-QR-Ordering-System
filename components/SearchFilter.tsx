import { useState } from 'react'

type Props = {
  categories: string[]
  selected: string
  onSearch: (q: string) => void
  onCategory: (category: string) => void
}

export default function SearchFilter({ categories, selected, onSearch, onCategory }: Props){
  const [q, setQ] = useState('')
  return (
    <div className="mb-6 space-y-4">
      <div className="grid gap-3 md:grid-cols-[1fr_auto]">
        <input
          value={q}
          onChange={e=>{ setQ(e.target.value); onSearch(e.target.value)}}
          placeholder="Search dishes, coffee, or bowls"
          className="w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 shadow-inner"
        />
        <select value={selected} onChange={e=>onCategory(e.target.value)} className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-white">
          <option value="All">All categories</option>
          {categories.map(category => <option key={category} value={category}>{category}</option>)}
        </select>
      </div>
      <div className="flex flex-wrap gap-3">
        {categories.slice(0, 6).map(category => (
          <button key={category} onClick={() => onCategory(category)} className={`rounded-full px-4 py-2 text-sm ${selected === category ? 'bg-gold text-navy' : 'bg-white/5 text-gray-200 hover:bg-white/10'}`}>
            {category}
          </button>
        ))}
      </div>
    </div>
  )
}
