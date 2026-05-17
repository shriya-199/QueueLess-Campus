import { useEffect, useState } from 'react'
import Loader from '../../components/Loader'
import StatusBadge from '../../components/StatusBadge'
import { getPenalties, getProfile, updateProfile } from '../../api/studentApi'
import { useToast } from '../../context/ToastContext'
import { getApiError } from '../../api/axiosConfig'

export default function Profile() {
  const [profile, setProfile] = useState(null)
  const [penalties, setPenalties] = useState([])
  const [loading, setLoading] = useState(false)
  const { showToast } = useToast()

  useEffect(() => {
    Promise.all([getProfile(), getPenalties()]).then(([user, penaltyData]) => {
      setProfile(user)
      setPenalties(penaltyData)
    })
  }, [])

  const submit = async (event) => {
    event.preventDefault()
    setLoading(true)
    try {
      setProfile(await updateProfile({ name: profile.name, department: profile.department, phone: profile.phone }))
      showToast('Profile updated')
    } catch (error) {
      showToast(getApiError(error, 'Profile update failed'), 'error')
    } finally {
      setLoading(false)
    }
  }

  if (!profile) return <Loader label="Loading profile" />

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
      <form onSubmit={submit} className="panel p-5">
        <h1 className="page-title">Profile</h1>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="block sm:col-span-2"><span className="mb-1 block text-sm font-medium">Name</span><input className="field" value={profile.name || ''} onChange={(e) => setProfile({ ...profile, name: e.target.value })} /></label>
          <label className="block"><span className="mb-1 block text-sm font-medium">Email</span><input className="field" value={profile.email || ''} disabled /></label>
          <label className="block"><span className="mb-1 block text-sm font-medium">Student ID</span><input className="field" value={profile.studentId || ''} disabled /></label>
          <label className="block"><span className="mb-1 block text-sm font-medium">Department</span><input className="field" value={profile.department || ''} onChange={(e) => setProfile({ ...profile, department: e.target.value })} /></label>
          <label className="block"><span className="mb-1 block text-sm font-medium">Phone</span><input className="field" value={profile.phone || ''} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} /></label>
        </div>
        <button className="btn-primary mt-6" disabled={loading}>{loading ? 'Saving...' : 'Save changes'}</button>
      </form>
      <section className="panel p-5">
        <h2 className="text-base font-semibold">Penalty record</h2>
        <div className="mt-4 space-y-3">
          {penalties.length === 0 ? <p className="text-sm text-slate-500">No active penalty history.</p> : penalties.map((penalty) => (
            <div key={penalty.id} className="rounded-lg border border-slate-200 p-4 dark:border-slate-800">
              <div className="flex items-center justify-between gap-3">
                <p className="font-semibold">{penalty.reason}</p>
                <StatusBadge status={penalty.status} />
              </div>
              <p className="mt-2 text-sm text-slate-500">Points: {penalty.points}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
