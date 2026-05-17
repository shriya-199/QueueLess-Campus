import { useEffect, useState } from 'react'
import { BookOpenCheck, Building2, CheckCircle2, Clock3, Users } from 'lucide-react'
import Loader from '../../components/Loader'
import StatCard from '../../components/StatCard'
import { getAdminDashboard } from '../../api/adminApi'

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    getAdminDashboard().then(setStats)
  }, [])

  if (!stats) return <Loader label="Loading admin dashboard" />

  return (
    <div className="space-y-6">
      <div>
        <h1 className="page-title">Admin Dashboard</h1>
        <p className="page-subtitle">Campus facility operations overview.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <StatCard title="Facilities" value={stats.totalFacilities} icon={Building2} />
        <StatCard title="Bookings" value={stats.totalBookings} icon={BookOpenCheck} tone="slate" />
        <StatCard title="Pending" value={stats.pendingBookings} icon={Clock3} tone="amber" />
        <StatCard title="Approved" value={stats.approvedBookings} icon={CheckCircle2} />
        <StatCard title="Users" value={stats.totalUsers} icon={Users} tone="rose" />
      </div>
      <section className="panel p-5">
        <h2 className="text-base font-semibold">Operations checklist</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {['Review pending bookings before peak hours', 'Use maintenance blocks before facility downtime', 'Watch queue pressure for high-demand spaces'].map((item) => (
            <div key={item} className="rounded-md border border-slate-200 bg-slate-50 p-3 text-sm font-medium dark:border-slate-800 dark:bg-slate-950">{item}</div>
          ))}
        </div>
      </section>
    </div>
  )
}
