import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'
import { getApiError } from '../../api/axiosConfig'

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', department: '', studentId: '', phone: '' })
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const submit = async (event) => {
    event.preventDefault()
    if (form.password.length < 6) return showToast('Password must be at least 6 characters', 'error')
    setLoading(true)
    try {
      await register(form)
      showToast('Account created')
      navigate('/student/dashboard')
    } catch (error) {
      showToast(getApiError(error, 'Registration failed'), 'error')
    } finally {
      setLoading(false)
    }
  }

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }))

  return (
    <div className="page-shell">
      <Navbar />
      <main className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-2xl items-center px-4 py-10">
        <form onSubmit={submit} className="panel w-full p-6">
          <h1 className="text-2xl font-semibold">Create student account</h1>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="block sm:col-span-2"><span className="mb-1 block text-sm font-medium">Name</span><input className="field" required value={form.name} onChange={(e) => update('name', e.target.value)} /></label>
            <label className="block"><span className="mb-1 block text-sm font-medium">Email</span><input className="field" type="email" required value={form.email} onChange={(e) => update('email', e.target.value)} /></label>
            <label className="block"><span className="mb-1 block text-sm font-medium">Password</span><input className="field" type="password" required value={form.password} onChange={(e) => update('password', e.target.value)} /></label>
            <label className="block"><span className="mb-1 block text-sm font-medium">Department</span><input className="field" value={form.department} onChange={(e) => update('department', e.target.value)} /></label>
            <label className="block"><span className="mb-1 block text-sm font-medium">Student ID</span><input className="field" value={form.studentId} onChange={(e) => update('studentId', e.target.value)} /></label>
            <label className="block sm:col-span-2"><span className="mb-1 block text-sm font-medium">Phone</span><input className="field" value={form.phone} onChange={(e) => update('phone', e.target.value)} /></label>
          </div>
          <button className="btn-primary mt-6 w-full" disabled={loading}>{loading ? 'Creating...' : 'Register'}</button>
          <p className="mt-5 text-center text-sm text-slate-500">Already have an account? <Link className="font-semibold text-campus-700" to="/login">Login</Link></p>
        </form>
      </main>
    </div>
  )
}
