import React from 'react'
import { Outlet, Link } from 'react-router-dom'

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-semibold text-sky-600">TinyLink</Link>
          <nav>
            <a
              className="text-sm text-slate-600"
              href={`${import.meta.env.VITE_API_BASE}/healthz`}
              target="_blank"
              rel="noreferrer"
            >
              Health
            </a>

          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">
        <Outlet />
      </main>

      <footer className="mt-12 border-t pt-6 text-center text-sm text-slate-500">
        Built with ❤️ • Example TinyLink
      </footer>
    </div>
  )
}
