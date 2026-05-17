import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function RoleRedirect() {
  const { user } = useAuth()
  if (user?.role === 'ADMIN') return <Navigate to="/admin/dashboard" replace />
  if (user?.role === 'STUDENT') return <Navigate to="/student/dashboard" replace />
  return <Navigate to="/" replace />
}
