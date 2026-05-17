export default function StatCard({ title, value, icon: Icon, tone = 'campus' }) {
  const colors = {
    campus: 'bg-campus-50 text-campus-800 dark:bg-campus-900/40 dark:text-campus-100',
    amber: 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-200',
    rose: 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-200',
    slate: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-100',
  }

  return (
    <div className="panel p-4 transition hover:border-slate-300 dark:hover:border-slate-700">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>
          <p className="mt-1 text-2xl font-semibold">{value ?? 0}</p>
        </div>
        {Icon && (
          <span className={`flex h-10 w-10 items-center justify-center rounded-md ${colors[tone]}`}>
            <Icon className="h-5 w-5" />
          </span>
        )}
      </div>
    </div>
  )
}
