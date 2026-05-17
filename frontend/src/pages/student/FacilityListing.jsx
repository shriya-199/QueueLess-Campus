import { useEffect, useMemo, useState } from 'react'
import FacilityCard from '../../components/FacilityCard'
import Loader from '../../components/Loader'
import SearchBar from '../../components/SearchBar'
import EmptyState from '../../components/EmptyState'
import { getFacilities } from '../../api/facilityApi'

export default function FacilityListing() {
  const [facilities, setFacilities] = useState(null)
  const [query, setQuery] = useState('')
  const [type, setType] = useState('ALL')

  useEffect(() => {
    getFacilities().then(setFacilities)
  }, [])

  const filtered = useMemo(() => {
    if (!facilities) return []
    return facilities.filter((facility) => {
      const matchesQuery = `${facility.name} ${facility.location} ${facility.type}`.toLowerCase().includes(query.toLowerCase())
      const matchesType = type === 'ALL' || facility.type === type
      return matchesQuery && matchesType
    })
  }, [facilities, query, type])

  if (!facilities) return <Loader label="Loading facilities" />

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h1 className="page-title">Facility Booking</h1>
          <p className="page-subtitle">Search facilities and request slots.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-[1fr_180px] md:w-[520px]">
          <SearchBar value={query} onChange={setQuery} placeholder="Search by name, type, location" />
          <select className="field" value={type} onChange={(e) => setType(e.target.value)}>
            {['ALL', 'GYM', 'LAUNDRY', 'MUSIC_ROOM', 'SPORTS_COURT', 'STUDY_ROOM', 'LAB', 'OTHER'].map((item) => <option key={item}>{item}</option>)}
          </select>
        </div>
      </div>
      {filtered.length === 0 ? <EmptyState title="No facilities found" message="Try a different search or filter." /> : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((facility) => <FacilityCard key={facility.id} facility={facility} />)}
        </div>
      )}
    </div>
  )
}
