import Link from 'next/link'

export default function Home(){
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="glass max-w-5xl w-full rounded-[36px] border border-white/10 p-10 shadow-[0_30px_120px_rgba(0,0,0,0.35)]">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.35em] text-gold">Zyrenox Technologies</p>
            <h1 className="text-5xl font-semibold leading-tight">Lemerian Workin Café — QR table ordering built for premium experiences.</h1>
            <p className="text-lg text-gray-300 max-w-2xl">Launch your first Zyrenox product with a luxury ordering interface, rich menu navigation, and live service tracking.</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <Link href="/menu/1" className="rounded-full bg-gold px-6 py-4 text-center font-semibold text-navy shadow-xl hover:brightness-110">Open table 1 menu</Link>
              <Link href="/menu/2" className="rounded-full border border-white/10 px-6 py-4 text-center font-semibold text-white hover:bg-white/10">Open table 2 menu</Link>
            </div>
          </div>
          <div className="glass rounded-[32px] border border-white/10 p-6">
            <div className="space-y-4">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm uppercase tracking-[0.3em] text-gray-400">Featured section</p>
                <p className="mt-2 text-white">Premium cafés love Zyrenox for instant QR ordering and seamless table service.</p>
              </div>
              <div className="grid gap-3">
                <div className="flex items-center justify-between rounded-3xl border border-white/10 p-4 bg-white/5">
                  <span className="text-gray-300">Menu categories</span><span className="text-white font-semibold">18+</span>
                </div>
                <div className="flex items-center justify-between rounded-3xl border border-white/10 p-4 bg-white/5">
                  <span className="text-gray-300">Live order tracking</span><span className="text-white font-semibold">Yes</span>
                </div>
                <div className="flex items-center justify-between rounded-3xl border border-white/10 p-4 bg-white/5">
                  <span className="text-gray-300">Razorpay test mode</span><span className="text-white font-semibold">Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
