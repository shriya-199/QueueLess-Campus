import { useEffect, useState } from 'react'
import { Bell, BookOpenCheck, Building2, Clock3 } from 'lucide-react'
import StatCard from '../../components/StatCard'
import Loader from '../../components/Loader'
import StatusBadge from '../../components/StatusBadge'
import EmptyState from '../../components/EmptyState'
import { getFacilities } from '../../api/facilityApi'
import { getMyBookings } from '../../api/bookingApi'
import { getNotifications } from '../../api/notificationApi'

export default function StudentDashboard() {
  const [data, setData] = useState(null)

  useEffect(() => {
    Promise.all([getFacilities(), getMyBookings(), getNotifications()])
      .then(([facilities, bookings, notifications]) => setData({ facilities, bookings, notifications }))
  }, [])

  if (!data) return <Loader label="Loading dashboard" />

  const upcoming = data.bookings.filter((booking) => ['PENDING', 'APPROVED'].includes(booking.status)).slice(0, 5)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="page-title">Student Dashboard</h1>
        <p className="page-subtitle">Your bookings, facility access, and queue updates in one place.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard title="Facilities" value={data.facilities.length} icon={Building2} />
        <StatCard title="My bookings" value={data.bookings.length} icon={BookOpenCheck} tone="slate" />
        <StatCard title="Active slots" value={upcoming.length} icon={Clock3} tone="amber" />
        <StatCard title="Notifications" value={data.notifications.length} icon={Bell} tone="rose" />
      </div>
      <section className="panel p-5">
        <h2 className="text-base font-semibold">Upcoming requests</h2>
        <div className="mt-4 space-y-3">
          {upcoming.length === 0 ? <EmptyState title="No active bookings" message="Book a facility slot to see it here." /> : upcoming.map((booking) => (
            <div key={booking.id} className="flex flex-col justify-between gap-3 rounded-md border border-slate-200 p-3 dark:border-slate-800 sm:flex-row sm:items-center">
              <div>
                <p className="font-semibold">{booking.facilityName}</p>
                <p className="text-sm text-slate-500">{booking.bookingDate} | {booking.startTime} - {booking.endTime}</p>
              </div>
              <StatusBadge status={booking.status} />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
