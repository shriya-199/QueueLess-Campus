import { useEffect, useState } from 'react'
import Loader from '../../components/Loader'
import StatusBadge from '../../components/StatusBadge'
import { createFacility, deleteFacility, getFacilities, updateFacility } from '../../api/facilityApi'
import { useToast } from '../../context/ToastContext'
import { getApiError } from '../../api/axiosConfig'

const empty = {
  name: '',
  type: 'GYM',
  description: '',
  location: '',
  capacity: 1,
  slotDurationMinutes: 60,
  openingTime: '06:00:00',
  closingTime: '21:00:00',
  status: 'ACTIVE',
  imageUrl: '',
}

export default function FacilityManagement() {
  const [facilities, setFacilities] = useState(null)
  const [form, setForm] = useState(empty)
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(false)
  const { showToast } = useToast()

  const load = () => getFacilities().then(setFacilities)
  useEffect(() => { load() }, [])

  const submit = async (event) => {
    event.preventDefault()
    setLoading(true)
    try {
      if (editingId) await updateFacility(editingId, form)
      else await createFacility(form)
      showToast(editingId ? 'Facility updated' : 'Facility created')
      setForm(empty)
      setEditingId(null)
      load()
    } catch (error) {
      showToast(getApiError(error, 'Facility save failed'), 'error')
    } finally {
      setLoading(false)
    }
  }

  const edit = (facility) => {
    setEditingId(facility.id)
    setForm({ ...empty, ...facility })
  }

  const remove = async (id) => {
    try {
      await deleteFacility(id)
      showToast('Facility deleted')
      load()
    } catch (error) {
      showToast(getApiError(error, 'Delete failed'), 'error')
    }
  }

  if (!facilities) return <Loader label="Loading facilities" />

  return (
    <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
      <form onSubmit={submit} className="panel p-5">
        <h1 className="text-lg font-semibold">{editingId ? 'Edit facility' : 'Add facility'}</h1>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <input className="field sm:col-span-2" placeholder="Name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <select className="field" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>{['GYM','LAUNDRY','MUSIC_ROOM','SPORTS_COURT','STUDY_ROOM','LAB','OTHER'].map((item) => <option key={item}>{item}</option>)}</select>
          <select className="field" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>{['ACTIVE','INACTIVE','MAINTENANCE'].map((item) => <option key={item}>{item}</option>)}</select>
          <input className="field" placeholder="Location" value={form.location || ''} onChange={(e) => setForm({ ...form, location: e.target.value })} />
          <input className="field" type="number" min="1" placeholder="Capacity" value={form.capacity} onChange={(e) => setForm({ ...form, capacity: Number(e.target.value) })} />
          <input className="field" type="number" min="15" placeholder="Slot minutes" value={form.slotDurationMinutes} onChange={(e) => setForm({ ...form, slotDurationMinutes: Number(e.target.value) })} />
          <input className="field" type="time" value={form.openingTime?.slice(0,5)} onChange={(e) => setForm({ ...form, openingTime: `${e.target.value}:00` })} />
          <input className="field" type="time" value={form.closingTime?.slice(0,5)} onChange={(e) => setForm({ ...form, closingTime: `${e.target.value}:00` })} />
          <textarea className="field sm:col-span-2" rows="3" placeholder="Description" value={form.description || ''} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </div>
        <div className="mt-4 flex gap-2">
          <button className="btn-primary" disabled={loading}>{loading ? 'Saving...' : 'Save facility'}</button>
          {editingId && <button type="button" className="btn-secondary" onClick={() => { setEditingId(null); setForm(empty) }}>Clear</button>}
        </div>
      </form>
      <section className="panel overflow-hidden">
        <div className="border-b border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900"><h2 className="text-lg font-semibold">Facilities</h2></div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="table-head"><tr><th className="p-4">Name</th><th>Type</th><th>Capacity</th><th>Status</th><th className="p-4">Actions</th></tr></thead>
            <tbody>
              {facilities.map((facility) => <tr key={facility.id} className="table-row"><td className="p-4 font-semibold">{facility.name}</td><td>{facility.type}</td><td>{facility.capacity}</td><td><StatusBadge status={facility.status} /></td><td className="p-4 space-x-2"><button className="btn-secondary py-2" onClick={() => edit(facility)}>Edit</button><button className="btn-secondary py-2" onClick={() => remove(facility.id)}>Delete</button></td></tr>)}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
