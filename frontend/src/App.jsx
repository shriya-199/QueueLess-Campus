import { Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from './components/AppLayout'
import ProtectedRoute from './routes/ProtectedRoute'
import RoleRedirect from './routes/RoleRedirect'
import LandingPage from './pages/public/LandingPage'
import Login from './pages/public/Login'
import Register from './pages/public/Register'
import Unauthorized from './pages/public/Unauthorized'
import StudentDashboard from './pages/student/StudentDashboard'
import FacilityListing from './pages/student/FacilityListing'
import FacilityDetails from './pages/student/FacilityDetails'
import BookingHistory from './pages/student/BookingHistory'
import Notifications from './pages/student/Notifications'
import Profile from './pages/student/Profile'
import QueueStatus from './pages/student/QueueStatus'
import AdminDashboard from './pages/admin/AdminDashboard'
import FacilityManagement from './pages/admin/FacilityManagement'
import BookingManagement from './pages/admin/BookingManagement'
import QueueManagement from './pages/admin/QueueManagement'
import AnalyticsPage from './pages/admin/AnalyticsPage'
import MaintenancePanel from './pages/admin/MaintenancePanel'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/app" element={<RoleRedirect />} />

      <Route element={<ProtectedRoute allowedRoles={['STUDENT']} />}>
        <Route path="/student" element={<AppLayout />}>
          <Route index element={<Navigate to="/student/dashboard" replace />} />
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="facilities" element={<FacilityListing />} />
          <Route path="facilities/:id" element={<FacilityDetails />} />
          <Route path="bookings" element={<BookingHistory />} />
          <Route path="queue" element={<QueueStatus />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
        <Route path="/admin" element={<AppLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="facilities" element={<FacilityManagement />} />
          <Route path="bookings" element={<BookingManagement />} />
          <Route path="queues" element={<QueueManagement />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="maintenance" element={<MaintenancePanel />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
