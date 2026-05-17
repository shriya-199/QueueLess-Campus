import { useEffect, useState } from 'react'
import Loader from '../../components/Loader'
import StatusBadge from '../../components/StatusBadge'
import EmptyState from '../../components/EmptyState'
import { getFacilities } from '../../api/facilityApi'
import { getFacilityQueue } from '../../api/waitlistApi'
import { getApiError } from '../../api/axiosConfig'
import { useToast } from '../../context/ToastContext'

export default function QueueManagement() {
  const [facilities, setFacilities] = useState(null)
  const [facilityId, setFacilityId] = useState('')
  const [queue, setQueue] = useState([])
  const [loading, setLoading] = useState(false)
  const { showToast } = useToast()

  useEffect(() => {
    getFacilities().then((items) => {
      setFacilities(items)
      if (items[0]) setFacilityId(String(items[0].id))
    })
  }, [])

  useEffect(() => {
    if (!facilityId) return
    setLoading(true)
    getFacilityQueue(facilityId).then(setQueue).catch((error) => showToast(getApiError(error, 'Queue load failed'), 'error')).finally(() => setLoading(false))
  }, [facilityId, showToast])

  if (!facilities) return <Loader label="Loading queues" />

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div><h1 className="page-title">Queue Management</h1><p className="page-subtitle">View students waiting by facility.</p></div>
        <select className="field max-w-sm" value={facilityId} onChange={(e) => setFacilityId(e.target.value)}>
          {facilities.map((facility) => <option key={facility.id} value={facility.id}>{facility.name}</option>)}
        </select>
      </div>
      {loading ? <Loader label="Loading queue" /> : queue.length === 0 ? <EmptyState title="No active queue" message="This facility has no waiting students." /> : (
        <div className="grid gap-3">
          {queue.map((item) => (
            <div key={item.id} className="panel flex flex-col justify-between gap-3 p-3 sm:flex-row sm:items-center">
              <div>
                <p className="font-semibold">#{item.queuePosition} {item.userName}</p>
                <p className="text-sm text-slate-500">{item.preferredDate} | {item.preferredStartTime} - {item.preferredEndTime}</p>
              </div>
              <StatusBadge status={item.status} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
