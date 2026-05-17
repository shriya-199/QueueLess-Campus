import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Pagination({ page, totalPages, onPage }) {
  if (totalPages <= 1) return null
  return (
    <div className="mt-6 flex items-center justify-end gap-2">
      <button className="icon-btn" onClick={() => onPage(Math.max(1, page - 1))} disabled={page === 1}>
        <ChevronLeft className="h-4 w-4" />
      </button>
      <span className="text-sm text-slate-500">Page {page} of {totalPages}</span>
      <button className="icon-btn" onClick={() => onPage(Math.min(totalPages, page + 1))} disabled={page === totalPages}>
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  )
}
