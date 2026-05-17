import api from './axiosConfig'

export const createBooking = (payload) => api.post('/bookings', payload).then((res) => res.data)
export const getMyBookings = () => api.get('/bookings/my').then((res) => res.data)
export const cancelBooking = (id, reason) => api.put(`/bookings/${id}/cancel`, { reason }).then((res) => res.data)
export const getAllBookings = () => api.get('/admin/bookings').then((res) => res.data)
export const getPendingBookings = () => api.get('/admin/bookings/pending').then((res) => res.data)
export const approveBooking = (id, remarks) => api.put(`/admin/bookings/${id}/approve`, { remarks }).then((res) => res.data)
export const rejectBooking = (id, remarks) => api.put(`/admin/bookings/${id}/reject`, { remarks }).then((res) => res.data)
export const markNoShow = (id) => api.put(`/admin/bookings/${id}/mark-no-show`).then((res) => res.data)
