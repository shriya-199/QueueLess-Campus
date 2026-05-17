import { useCallback, useEffect, useState } from 'react'
import Loader from '../../components/Loader'
import StatusBadge from '../../components/StatusBadge'
import { createMaintenance, cancelMaintenance, completeMaintenance, getMaintenance } from '../../api/adminApi'
import { getFacilities } from '../../api/facilityApi'
import { useToast } from '../../context/ToastContext'
import { getApiError } from '../../api/axiosConfig'

export default function MaintenancePanel() {
  const [facilities, setFacilities] = useState([])
  const [logs, setLogs] = useState(null)
  const [form, setForm] = useState({ facilityId: '', reason: '', startDate: '', endDate: '', startTime: '', endTime: '' })
  const { showToast } = useToast()

  const load = useCallback(() => Promise.all([getFacilities(), getMaintenance()]).then(([facilityData, logData]) => {
    setFacilities(facilityData)
    setLogs(logData)
    if (!form.facilityId && facilityData[0]) setForm((current) => ({ ...current, facilityId: String(facilityData[0].id) }))
  }), [form.facilityId])

  useEffect(() => { load() }, [load])

  const submit = async (event) => {
    event.preventDefault()
    try {
      await createMaintenance({
        ...form,
        facilityId: Number(form.facilityId),
        startTime: form.startTime ? `${form.startTime}:00` : null,
        endTime: form.endTime ? `${form.endTime}:00` : null,
      })
      showToast('Maintenance block created')
      setForm({ ...form, reason: '', startDate: '', endDate: '', startTime: '', endTime: '' })
      load()
    } catch (error) {
      showToast(getApiError(error, 'Maintenance creation failed'), 'error')
    }
  }

  const updateStatus = async (fn, message) => {
    try {
      await fn()
      showToast(message)
      load()
    } catch (error) {
      showToast(getApiError(error, 'Maintenance update failed'), 'error')
    }
  }

  if (!logs) return <Loader label="Loading maintenance" />

  return (
    <div className="grid gap-6 xl:grid-cols-[0.75fr_1.25fr]">
      <form onSubmit={submit} className="panel p-5">
        <h1 className="text-lg font-semibold">Block for maintenance</h1>
        <div className="mt-4 space-y-3">
          <select className="field" value={form.facilityId} onChange={(e) => setForm({ ...form, facilityId: e.target.value })}>{facilities.map((facility) => <option key={facility.id} value={facility.id}>{facility.name}</option>)}</select>
          <input className="field" required placeholder="Reason" value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })} />
          <div className="grid grid-cols-2 gap-3">
            <input className="field" required type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
            <input className="field" required type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} />
            <input className="field" type="time" value={form.startTime} onChange={(e) => setForm({ ...form, startTime: e.target.value })} />
            <input className="field" type="time" value={form.endTime} onChange={(e) => setForm({ ...form, endTime: e.target.value })} />
          </div>
        </div>
        <button className="btn-primary mt-4">Create block</button>
      </form>
      <section className="panel overflow-hidden">
        <div className="border-b border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900"><h2 className="text-lg font-semibold">Maintenance logs</h2></div>
        <div className="divide-y divide-slate-200 dark:divide-slate-800">
          {logs.map((log) => (
            <div key={log.id} className="p-4">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div><p className="font-semibold">{log.facilityName}</p><p className="text-sm text-slate-500">{log.reason} | {log.startDate} to {log.endDate}</p></div>
                <StatusBadge status={log.status} />
              </div>
              {['SCHEDULED', 'ACTIVE'].includes(log.status) && <div className="mt-3 flex gap-2"><button className="btn-secondary py-2" onClick={() => updateStatus(() => completeMaintenance(log.id), 'Maintenance completed')}>Complete</button><button className="btn-secondary py-2" onClick={() => updateStatus(() => cancelMaintenance(log.id), 'Maintenance cancelled')}>Cancel</button></div>}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
