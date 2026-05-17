import api from './axiosConfig'

export const getAdminDashboard = () => api.get('/admin/dashboard').then((res) => res.data)
export const createMaintenance = (payload) => api.post('/admin/maintenance', payload).then((res) => res.data)
export const getMaintenance = () => api.get('/admin/maintenance').then((res) => res.data)
export const completeMaintenance = (id) => api.put(`/admin/maintenance/${id}/complete`).then((res) => res.data)
export const cancelMaintenance = (id) => api.put(`/admin/maintenance/${id}/cancel`).then((res) => res.data)
