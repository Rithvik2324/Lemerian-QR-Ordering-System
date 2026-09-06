import '../styles/globals.css'
import { PropsWithChildren } from 'react'

export const metadata = {
  title: 'Lemerian Workin Café — Menu',
  description: 'Premium QR table ordering powered by Zyrenox Technologies'
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.12),_transparent_40%),linear-gradient(180deg,#020618_0%,#031027_100%)] text-white">
          <header className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-5 sm:px-10">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold text-navy font-black shadow-lg">Z</div>
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-gold/90">Zyrenox Technologies</p>
                <h1 className="text-lg font-semibold">Lemerian Workin Café</h1>
              </div>
            </div>
            <div className="hidden items-center gap-5 md:flex text-sm text-gray-300">
              <a href="/" className="hover:text-white">Home</a>
              <a href="/menu/1" className="hover:text-white">Menu</a>
              <a href="/admin" className="hover:text-white">Admin</a>
              <a href="/kitchen" className="hover:text-white">Kitchen</a>
            </div>
          </header>
          <main className="mx-auto max-w-7xl px-4 pb-10 sm:px-10">{children}</main>
          <footer className="border-t border-white/10 py-6 text-center text-sm text-gray-400">© {new Date().getFullYear()} Lemerian — Powered by Zyrenox Technologies</footer>
        </div>
      </body>
    </html>
  )
}




