import { X } from 'lucide-react'
import { useState } from 'react'

export default function BookingModal({ facility, open, onClose, onSubmit, loading }) {
  const [form, setForm] = useState({
    bookingDate: '',
    startTime: '',
    endTime: '',
  })

  if (!open) return null

  const submit = (event) => {
    event.preventDefault()
    onSubmit({
      facilityId: facility.id,
      bookingDate: form.bookingDate,
      startTime: `${form.startTime}:00`,
      endTime: `${form.endTime}:00`,
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
      <form onSubmit={submit} className="panel w-full max-w-md p-5">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Book {facility.name}</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Choose a date and slot inside operating hours.</p>
          </div>
          <button type="button" className="icon-btn" onClick={onClose}>
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="space-y-4">
          <label className="block">
            <span className="mb-1 block text-sm font-medium">Date</span>
            <input required type="date" className="field" value={form.bookingDate} onChange={(e) => setForm({ ...form, bookingDate: e.target.value })} />
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="mb-1 block text-sm font-medium">Start</span>
              <input required type="time" className="field" value={form.startTime} onChange={(e) => setForm({ ...form, startTime: e.target.value })} />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium">End</span>
              <input required type="time" className="field" value={form.endTime} onChange={(e) => setForm({ ...form, endTime: e.target.value })} />
            </label>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn-primary" disabled={loading}>{loading ? 'Booking...' : 'Request slot'}</button>
        </div>
      </form>
    </div>
  )
}
