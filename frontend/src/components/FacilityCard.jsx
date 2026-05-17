import { Link } from 'react-router-dom'
import { MapPin, Users } from 'lucide-react'
import StatusBadge from './StatusBadge'

const typeLabels = {
  GYM: 'Gym',
  LAUNDRY: 'Laundry',
  MUSIC_ROOM: 'Music room',
  SPORTS_COURT: 'Sports court',
  STUDY_ROOM: 'Study room',
  LAB: 'Lab',
  OTHER: 'Facility',
}

export default function FacilityCard({ facility }) {
  return (
    <Link to={`/student/facilities/${facility.id}`} className="panel block p-4 transition hover:border-campus-200 dark:hover:border-slate-700">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{typeLabels[facility.type] || facility.type}</p>
          <h3 className="mt-1 text-base font-semibold text-slate-950 dark:text-slate-100">{facility.name}</h3>
        </div>
        <StatusBadge status={facility.status} />
      </div>
      <p className="mt-3 line-clamp-2 min-h-10 text-sm text-slate-500 dark:text-slate-400">{facility.description || 'Campus facility available for booking.'}</p>
      <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-3 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
        <span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4" />{facility.location || 'Campus'}</span>
        <span className="inline-flex items-center gap-1"><Users className="h-4 w-4" />{facility.capacity} slots</span>
      </div>
    </Link>
  )
}
