import { useEffect, useState } from 'react'
import Loader from '../../components/Loader'
import StatusBadge from '../../components/StatusBadge'
import SearchBar from '../../components/SearchBar'
import Pagination from '../../components/Pagination'
import { approveBooking, getAllBookings, markNoShow, rejectBooking } from '../../api/bookingApi'
import { useToast } from '../../context/ToastContext'
import { getApiError } from '../../api/axiosConfig'

export default function BookingManagement() {
  const [bookings, setBookings] = useState(null)
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('ALL')
  const [page, setPage] = useState(1)
  const { showToast } = useToast()
  const load = () => getAllBookings().then(setBookings)
  useEffect(() => { load() }, [])

  const action = async (fn, message) => {
    try {
      await fn()
      showToast(message)
      load()
    } catch (error) {
      showToast(getApiError(error, 'Action failed'), 'error')
    }
  }

  if (!bookings) return <Loader label="Loading bookings" />

  const filtered = bookings.filter((booking) => {
    const matchesQuery = `${booking.userName} ${booking.facilityName} ${booking.bookingDate}`.toLowerCase().includes(query.toLowerCase())
    const matchesStatus = status === 'ALL' || booking.status === status
    return matchesQuery && matchesStatus
  })
  const pageSize = 8
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const pageItems = filtered.slice((page - 1) * pageSize, page * pageSize)

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div><h1 className="page-title">Booking Approval Panel</h1><p className="page-subtitle">Approve, reject, or mark no-show.</p></div>
        <div className="grid gap-3 sm:grid-cols-[1fr_170px] lg:w-[540px]">
          <SearchBar value={query} onChange={(value) => { setQuery(value); setPage(1) }} placeholder="Search student or facility" />
          <select className="field" value={status} onChange={(event) => { setStatus(event.target.value); setPage(1) }}>
            {['ALL', 'PENDING', 'APPROVED', 'REJECTED', 'CANCELLED', 'COMPLETED', 'NO_SHOW'].map((item) => <option key={item}>{item}</option>)}
          </select>
        </div>
      </div>
      <div className="panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="table-head"><tr><th className="p-4">Student</th><th>Facility</th><th>Date</th><th>Slot</th><th>Status</th><th className="p-4">Actions</th></tr></thead>
            <tbody>
              {pageItems.map((booking) => (
                <tr key={booking.id} className="table-row">
                  <td className="p-4 font-semibold">{booking.userName}</td>
                  <td>{booking.facilityName}</td>
                  <td>{booking.bookingDate}</td>
                  <td>{booking.startTime} - {booking.endTime}</td>
                  <td><StatusBadge status={booking.status} /></td>
                  <td className="p-4 flex flex-wrap gap-2">
                    {booking.status === 'PENDING' && <><button className="btn-secondary py-2" onClick={() => action(() => approveBooking(booking.id, 'Approved'), 'Booking approved')}>Approve</button><button className="btn-secondary py-2" onClick={() => action(() => rejectBooking(booking.id, 'Rejected'), 'Booking rejected')}>Reject</button></>}
                    {booking.status === 'APPROVED' && <button className="btn-secondary py-2" onClick={() => action(() => markNoShow(booking.id), 'No-show penalty created')}>No-show</button>}
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
    </div>
  )
}
