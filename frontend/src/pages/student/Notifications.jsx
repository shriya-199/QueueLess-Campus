import { useEffect, useState } from 'react'
import { Bell } from 'lucide-react'
import Loader from '../../components/Loader'
import EmptyState from '../../components/EmptyState'
import { getNotifications, markAllNotificationsRead, markNotificationRead } from '../../api/notificationApi'
import { useToast } from '../../context/ToastContext'

export default function Notifications() {
  const [notifications, setNotifications] = useState(null)
  const { showToast } = useToast()

  const load = () => getNotifications().then(setNotifications)

  useEffect(() => {
    load()
  }, [])

  const read = async (id) => {
    await markNotificationRead(id)
    load()
  }

  const readAll = async () => {
    await markAllNotificationsRead()
    showToast('Notifications marked as read')
    load()
  }

  if (!notifications) return <Loader label="Loading notifications" />

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="page-title">Notifications</h1>
          <p className="page-subtitle">Approval, cancellation, waitlist, and penalty updates.</p>
        </div>
        <button className="btn-secondary" onClick={readAll}>Mark all read</button>
      </div>
      {notifications.length === 0 ? <EmptyState title="No notifications" message="Updates will appear here." /> : (
        <div className="space-y-3">
          {notifications.map((item) => (
            <button key={item.id} onClick={() => read(item.id)} className={`panel w-full p-4 text-left transition hover:border-slate-300 ${item.readStatus ? 'opacity-75' : 'border-campus-200'}`}>
              <div className="flex gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-campus-50 text-campus-800 dark:bg-campus-900/40 dark:text-campus-100"><Bell className="h-5 w-5" /></span>
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{item.message}</p>
                  <p className="mt-2 text-xs text-slate-400">{new Date(item.createdAt).toLocaleString()}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
