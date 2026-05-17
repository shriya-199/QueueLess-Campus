export default function EmptyState({ title, message }) {
  return (
    <div className="panel p-6 text-center">
      <p className="font-semibold">{title}</p>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{message}</p>
    </div>
  )
}
