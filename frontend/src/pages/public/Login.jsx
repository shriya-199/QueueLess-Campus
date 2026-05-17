import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LogIn } from 'lucide-react'
import Navbar from '../../components/Navbar'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'
import { getApiError } from '../../api/axiosConfig'

export default function Login() {
  const [form, setForm] = useState({ email: 'student@campus.com', password: 'student123' })
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const submit = async (event) => {
    event.preventDefault()
    setLoading(true)
    try {
      const user = await login(form)
      showToast('Logged in successfully')
      navigate(user.role === 'ADMIN' ? '/admin/dashboard' : '/student/dashboard')
    } catch (error) {
      showToast(getApiError(error, 'Login failed'), 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-shell">
      <Navbar />
      <main className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-md items-center px-4 py-10">
        <form onSubmit={submit} className="panel w-full p-6">
          <h1 className="text-2xl font-semibold">Login</h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Use seeded accounts or your registered student account.</p>
          <div className="mt-6 space-y-4">
            <label className="block">
              <span className="mb-1 block text-sm font-medium">Email</span>
              <input className="field" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium">Password</span>
              <input className="field" type="password" required minLength={6} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
            </label>
          </div>
          <button className="btn-primary mt-6 w-full" disabled={loading}>
            <LogIn className="h-4 w-4" />
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
          <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
            <button type="button" className="btn-secondary py-2" onClick={() => setForm({ email: 'student@campus.com', password: 'student123' })}>Student demo</button>
            <button type="button" className="btn-secondary py-2" onClick={() => setForm({ email: 'admin@campus.com', password: 'admin123' })}>Admin demo</button>
          </div>
          <p className="mt-5 text-center text-sm text-slate-500">New here? <Link className="font-semibold text-campus-700" to="/register">Register</Link></p>
        </form>
      </main>
    </div>
  )
}
