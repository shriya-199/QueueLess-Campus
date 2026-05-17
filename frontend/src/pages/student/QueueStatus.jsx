import { useEffect, useState } from 'react'
import Loader from '../../components/Loader'
import EmptyState from '../../components/EmptyState'
import StatusBadge from '../../components/StatusBadge'
import { cancelWaitlist, getMyWaitlists } from '../../api/waitlistApi'
import { useToast } from '../../context/ToastContext'
import { getApiError } from '../../api/axiosConfig'

export default function QueueStatus() {
  const [items, setItems] = useState(null)
  const { showToast } = useToast()

  const load = () => getMyWaitlists().then(setItems)

  useEffect(() => {
    load()
  }, [])

  const cancel = async (id) => {
    try {
      await cancelWaitlist(id)
      showToast('Queue entry cancelled')
      load()
    } catch (error) {
      showToast(getApiError(error, 'Could not cancel queue entry'), 'error')
    }
  }

  if (!items) return <Loader label="Loading queue status" />

  return (
    <div className="space-y-6">
      <div>
        <h1 className="page-title">Queue Status</h1>
        <p className="page-subtitle">Track your waitlist entries and queue positions.</p>
      </div>

      {items.length === 0 ? <EmptyState title="No queue entries" message="Join a waitlist from the facility details page." /> : (
        <div className="panel overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="table-head">
                <tr>
                  <th className="p-4">Facility</th>
                  <th>Date</th>
                  <th>Preferred Slot</th>
                  <th>Position</th>
                  <th>Status</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="table-row">
                    <td className="p-4 font-semibold">{item.facilityName}</td>
                    <td>{item.preferredDate}</td>
                    <td>{item.preferredStartTime} - {item.preferredEndTime}</td>
                    <td>#{item.queuePosition}</td>
                    <td><StatusBadge status={item.status} /></td>
                    <td className="p-4">
                      {item.status === 'WAITING' && <button className="btn-secondary py-2" onClick={() => cancel(item.id)}>Cancel</button>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
