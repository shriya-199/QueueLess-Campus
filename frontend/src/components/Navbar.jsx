import { Link, NavLink } from 'react-router-dom'
import { Bell, LogOut, Menu, Moon, Sun } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'

export default function Navbar({ onMenu }) {
  const { user, isAuthenticated, logout } = useAuth()
  const { darkMode, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          {isAuthenticated && (
            <button className="icon-btn lg:hidden" onClick={onMenu} aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </button>
          )}
          <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-campus-800 text-sm text-white">QL</span>
            <span>QueueLess Campus</span>
          </Link>
        </div>

        <nav className="hidden items-center gap-5 text-sm font-medium text-slate-600 dark:text-slate-300 md:flex">
          {!isAuthenticated && (
            <>
              <a href="/#features" className="hover:text-campus-800 dark:hover:text-campus-100">Features</a>
              <a href="/#workflow" className="hover:text-campus-800 dark:hover:text-campus-100">Workflow</a>
            </>
          )}
          {user?.role === 'STUDENT' && <NavLink to="/student/notifications" className="hover:text-campus-700"><Bell className="h-5 w-5" /></NavLink>}
        </nav>

        <div className="flex items-center gap-2">
          <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle theme">
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          {isAuthenticated ? (
            <button className="btn-secondary" onClick={logout}>
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          ) : (
            <Link className="btn-primary" to="/login">Login</Link>
          )}
        </div>
      </div>
    </header>
  )
}
