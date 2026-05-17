import { useEffect, useState } from 'react'
import Loader from '../../components/Loader'
import StatusBadge from '../../components/StatusBadge'
import EmptyState from '../../components/EmptyState'
import SearchBar from '../../components/SearchBar'
import Pagination from '../../components/Pagination'
import { cancelBooking, getMyBookings } from '../../api/bookingApi'
import { useToast } from '../../context/ToastContext'
import { getApiError } from '../../api/axiosConfig'

export default function BookingHistory() {
  const [bookings, setBookings] = useState(null)
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('ALL')
  const [page, setPage] = useState(1)
  const { showToast } = useToast()

  const load = () => getMyBookings().then(setBookings)

  useEffect(() => {
    load()
  }, [])

  const cancel = async (booking) => {
    try {
      await cancelBooking(booking.id, 'Cancelled by student')
      showToast('Booking cancelled')
      load()
    } catch (error) {
      showToast(getApiError(error, 'Cancellation failed'), 'error')
    }
  }

  if (!bookings) return <Loader label="Loading bookings" />

  const filtered = bookings.filter((booking) => {
    const matchesQuery = `${booking.facilityName} ${booking.bookingDate}`.toLowerCase().includes(query.toLowerCase())
    const matchesStatus = status === 'ALL' || booking.status === status
    return matchesQuery && matchesStatus
  })
  const pageSize = 8
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const pageItems = filtered.slice((page - 1) * pageSize, page * pageSize)

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <h1 className="page-title">Booking History</h1>
          <p className="page-subtitle">Track approvals, cancellations, and booking timeline notes.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-[1fr_170px] lg:w-[520px]">
          <SearchBar value={query} onChange={(value) => { setQuery(value); setPage(1) }} placeholder="Search bookings" />
          <select className="field" value={status} onChange={(event) => { setStatus(event.target.value); setPage(1) }}>
            {['ALL', 'PENDING', 'APPROVED', 'REJECTED', 'CANCELLED', 'COMPLETED', 'NO_SHOW'].map((item) => <option key={item}>{item}</option>)}
          </select>
        </div>
      </div>
      {filtered.length === 0 ? <EmptyState title="No bookings found" message="Try a different search or filter." /> : (
        <div className="panel overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="table-head">
                <tr><th className="p-4">Facility</th><th>Date</th><th>Slot</th><th>Status</th><th>Timeline</th><th className="p-4">Action</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {pageItems.map((booking) => (
                  <tr key={booking.id} className="table-row">
                    <td className="p-4 font-semibold">{booking.facilityName}</td>
                    <td>{booking.bookingDate}</td>
                    <td>{booking.startTime} - {booking.endTime}</td>
                    <td><StatusBadge status={booking.status} /></td>
                    <td className="max-w-xs text-slate-500">{booking.timelineNote || booking.adminRemarks || '-'}</td>
                    <td className="p-4">
                      {['PENDING', 'APPROVED'].includes(booking.status) && <button className="btn-secondary py-2" onClick={() => cancel(booking)}>Cancel</button>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="border-t border-slate-200 px-4 pb-4 dark:border-slate-800">
            <Pagination page={page} totalPages={totalPages} onPage={setPage} />
          </div>
        </div>
      )}
    </div>
  )
}
