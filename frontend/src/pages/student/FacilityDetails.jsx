import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Clock, MapPin, Users } from 'lucide-react'
import BookingModal from '../../components/BookingModal'
import Loader from '../../components/Loader'
import StatusBadge from '../../components/StatusBadge'
import { getApiError } from '../../api/axiosConfig'
import { getAvailability, getFacility } from '../../api/facilityApi'
import { createBooking } from '../../api/bookingApi'
import { joinWaitlist } from '../../api/waitlistApi'
import { useToast } from '../../context/ToastContext'

export default function FacilityDetails() {
  const { id } = useParams()
  const [facility, setFacility] = useState(null)
  const [check, setCheck] = useState({ date: '', startTime: '', endTime: '' })
  const [availability, setAvailability] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { showToast } = useToast()

  useEffect(() => {
    getFacility(id).then(setFacility)
  }, [id])

  const checkAvailability = async (event) => {
    event.preventDefault()
    setLoading(true)
    try {
      setAvailability(await getAvailability(id, {
        date: check.date,
        startTime: `${check.startTime}:00`,
        endTime: `${check.endTime}:00`,
      }))
    } catch (error) {
      showToast(getApiError(error, 'Availability check failed'), 'error')
    } finally {
      setLoading(false)
    }
  }

  const book = async (payload) => {
    setLoading(true)
    try {
      await createBooking(payload)
      showToast('Booking request created')
      setModalOpen(false)
    } catch (error) {
      showToast(getApiError(error, 'Booking failed'), 'error')
    } finally {
      setLoading(false)
    }
  }

  const waitlist = async () => {
    if (!check.date || !check.startTime || !check.endTime) return showToast('Select a date and time first', 'error')
    setLoading(true)
    try {
      await joinWaitlist({
        facilityId: Number(id),
        preferredDate: check.date,
        preferredStartTime: `${check.startTime}:00`,
        preferredEndTime: `${check.endTime}:00`,
      })
      showToast('Joined waitlist')
    } catch (error) {
      showToast(getApiError(error, 'Could not join waitlist'), 'error')
    } finally {
      setLoading(false)
    }
  }

  if (!facility) return <Loader label="Loading facility" />

  return (
    <div className="space-y-6">
      <Link to="/student/facilities" className="inline-flex items-center gap-2 text-sm font-semibold text-campus-800 dark:text-campus-100"><ArrowLeft className="h-4 w-4" />Back to facilities</Link>
      <section className="panel overflow-hidden">
        <div className="border-b border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{facility.type}</p>
              <h1 className="mt-1 text-2xl font-semibold">{facility.name}</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">{facility.description}</p>
            </div>
            <StatusBadge status={facility.status} />
          </div>
        </div>
        <div className="grid gap-4 p-5 md:grid-cols-3">
          <Info icon={MapPin} label="Location" value={facility.location || 'Campus'} />
          <Info icon={Users} label="Capacity" value={`${facility.capacity} students`} />
          <Info icon={Clock} label="Hours" value={`${facility.openingTime} - ${facility.closingTime}`} />
        </div>
      </section>
      <section className="grid gap-5 lg:grid-cols-[1fr_0.8fr]">
        <form onSubmit={checkAvailability} className="panel p-5">
          <h2 className="text-base font-semibold">Check availability</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <input required className="field" type="date" value={check.date} onChange={(e) => setCheck({ ...check, date: e.target.value })} />
            <input required className="field" type="time" value={check.startTime} onChange={(e) => setCheck({ ...check, startTime: e.target.value })} />
            <input required className="field" type="time" value={check.endTime} onChange={(e) => setCheck({ ...check, endTime: e.target.value })} />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button className="btn-primary" disabled={loading}>Check</button>
            <button type="button" className="btn-secondary" onClick={() => setModalOpen(true)}>Book slot</button>
            <button type="button" className="btn-secondary" onClick={waitlist}>Join waitlist</button>
          </div>
        </form>
        <div className="panel p-5">
          <h2 className="text-base font-semibold">Slot status</h2>
          {availability ? (
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <Signal label="Booked" value={`${availability.bookedCount}/${availability.capacity}`} />
              <Signal label="Waiting" value={availability.waitingCount} />
              <Signal label="Maintenance" value={availability.maintenanceBlocked ? 'Blocked' : 'Clear'} />
              <Signal label="Status" value={availability.available ? 'Available' : 'Unavailable'} />
            </div>
          ) : <p className="mt-4 text-sm text-slate-500">Run an availability check to view live capacity.</p>}
        </div>
      </section>
      <BookingModal facility={facility} open={modalOpen} onClose={() => setModalOpen(false)} onSubmit={book} loading={loading} />
    </div>
  )
}

function Info({ icon: Icon, label, value }) {
  return <div className="rounded-md border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950"><Icon className="mb-2 h-5 w-5 text-campus-700" /><p className="text-xs text-slate-500">{label}</p><p className="font-semibold">{value}</p></div>
}

function Signal({ label, value }) {
  return <div className="rounded-md border border-slate-200 p-3 dark:border-slate-800"><p className="text-xs text-slate-500">{label}</p><p className="mt-1 text-lg font-semibold">{value}</p></div>
}
