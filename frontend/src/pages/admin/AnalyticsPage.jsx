import { useEffect, useState } from 'react'
import { Activity, Clock3, ListChecks, ShieldAlert } from 'lucide-react'
import Loader from '../../components/Loader'
import StatCard from '../../components/StatCard'
import { getAdminDashboard } from '../../api/adminApi'
import { getAllBookings } from '../../api/bookingApi'

export default function AnalyticsPage() {
  const [data, setData] = useState(null)

  useEffect(() => {
    Promise.all([getAdminDashboard(), getAllBookings()]).then(([stats, bookings]) => setData({ stats, bookings }))
  }, [])

  if (!data) return <Loader label="Loading analytics" />

  const rejected = data.bookings.filter((booking) => booking.status === 'REJECTED').length
  const noShows = data.bookings.filter((booking) => booking.status === 'NO_SHOW').length
  const cancellationRate = data.bookings.length ? Math.round((data.bookings.filter((booking) => booking.status === 'CANCELLED').length / data.bookings.length) * 100) : 0

  return (
    <div className="space-y-6">
      <div><h1 className="page-title">Analytics</h1><p className="page-subtitle">Operational indicators from live backend records.</p></div>
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard title="Pending pressure" value={data.stats.pendingBookings} icon={Clock3} tone="amber" />
        <StatCard title="Rejected" value={rejected} icon={ShieldAlert} tone="rose" />
        <StatCard title="No-shows" value={noShows} icon={ListChecks} tone="slate" />
        <StatCard title="Cancel rate" value={`${cancellationRate}%`} icon={Activity} />
      </div>
      <section className="panel p-5">
        <h2 className="text-base font-semibold">Facility usage by booking count</h2>
        <div className="mt-5 space-y-3">
          {Object.entries(data.bookings.reduce((acc, booking) => ({ ...acc, [booking.facilityName]: (acc[booking.facilityName] || 0) + 1 }), {})).map(([name, count]) => (
            <div key={name}>
              <div className="mb-1 flex justify-between text-sm"><span>{name}</span><span>{count}</span></div>
              <div className="h-2 rounded bg-slate-100 dark:bg-slate-800"><div className="h-2 rounded bg-campus-700" style={{ width: `${Math.min(100, count * 15)}%` }} /></div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
