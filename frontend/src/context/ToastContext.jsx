import { createContext, useContext, useMemo, useState } from 'react'
import { CheckCircle2, XCircle } from 'lucide-react'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const showToast = (message, type = 'success') => {
    const id = crypto.randomUUID()
    setToasts((items) => [...items, { id, message, type }])
    setTimeout(() => setToasts((items) => items.filter((item) => item.id !== id)), 3600)
  }

  const value = useMemo(() => ({ showToast }), [])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed right-4 top-4 z-50 flex w-[calc(100%-2rem)] max-w-sm flex-col gap-3">
        {toasts.map((toast) => {
          const Icon = toast.type === 'error' ? XCircle : CheckCircle2
          return (
            <div
              key={toast.id}
              className="panel flex items-start gap-3 px-4 py-3 text-sm"
            >
              <Icon className={toast.type === 'error' ? 'mt-0.5 h-5 w-5 text-rose-500' : 'mt-0.5 h-5 w-5 text-campus-600'} />
              <span>{toast.message}</span>
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)
