import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

export default function AppLayout() {
  const [open, setOpen] = useState(false)

  return (
    <div className="page-shell">
      <Navbar onMenu={() => setOpen(true)} />
      <div className="mx-auto flex max-w-7xl">
        <Sidebar open={open} onClose={() => setOpen(false)} />
        <main className="min-w-0 flex-1 px-4 py-5 sm:px-6 lg:px-7">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
