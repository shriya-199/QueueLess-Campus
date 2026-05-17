const styles = {
  PENDING: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200',
  APPROVED: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200',
  REJECTED: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-200',
  CANCELLED: 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-200',
  COMPLETED: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200',
  NO_SHOW: 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200',
  ACTIVE: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200',
  INACTIVE: 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-200',
  MAINTENANCE: 'bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-200',
  WAITING: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200',
  PROMOTED: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200',
}

export default function StatusBadge({ status }) {
  return (
    <span className={`inline-flex rounded px-2 py-0.5 text-xs font-semibold ${styles[status] || styles.PENDING}`}>
      {String(status || 'UNKNOWN').replace('_', ' ')}
    </span>
  )
}
