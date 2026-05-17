import { Link } from 'react-router-dom'

export default function Unauthorized() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 dark:bg-slate-950">
      <div className="panel max-w-md p-8 text-center">
        <h1 className="text-2xl font-bold">Access restricted</h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Your current role cannot open this page.</p>
        <Link className="btn-primary mt-6" to="/app">Go to dashboard</Link>
      </div>
    </div>
  )
}
