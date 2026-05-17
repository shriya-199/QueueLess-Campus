import { NavLink } from 'react-router-dom'
import { BarChart3, Bell, BookOpenCheck, Building2, ClipboardList, Home, LayoutDashboard, ListChecks, User, Wrench } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const studentItems = [
  { to: '/student/dashboard', label: 'Dashboard', icon: Home },
  { to: '/student/facilities', label: 'Facilities', icon: Building2 },
  { to: '/student/bookings', label: 'Bookings', icon: BookOpenCheck },
  { to: '/student/queue', label: 'Queue Status', icon: ListChecks },
  { to: '/student/notifications', label: 'Notifications', icon: Bell },
  { to: '/student/profile', label: 'Profile', icon: User },
]

const adminItems = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/facilities', label: 'Facilities', icon: Building2 },
  { to: '/admin/bookings', label: 'Bookings', icon: ClipboardList },
  { to: '/admin/queues', label: 'Queues', icon: ListChecks },
  { to: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/admin/maintenance', label: 'Maintenance', icon: Wrench },
]

export default function Sidebar({ open, onClose }) {
  const { user } = useAuth()
  const items = user?.role === 'ADMIN' ? adminItems : studentItems

  return (
    <>
      <div className={`fixed inset-0 z-30 bg-slate-950/30 lg:hidden ${open ? 'block' : 'hidden'}`} onClick={onClose} />
      <aside className={`fixed left-0 top-14 z-40 h-[calc(100vh-3.5rem)] w-64 border-r border-slate-200 bg-white p-3 transition-transform dark:border-slate-800 dark:bg-slate-950 lg:sticky lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="mb-4 rounded-md border border-slate-200 bg-slate-50 p-3 text-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="truncate font-semibold">{user?.name}</p>
          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">{user?.role}</p>
        </div>
        <nav className="space-y-1">
          {items.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition ${
                    isActive
                      ? 'bg-campus-800 text-white'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white'
                  }`
                }
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </NavLink>
            )
          })}
        </nav>
        <div className="mt-5 rounded-md border border-slate-200 p-3 text-xs leading-5 text-slate-500 dark:border-slate-800 dark:text-slate-400">
          Use this portal to manage bookings and facility availability from the live backend.
        </div>
      </aside>
    </>
  )
}
