import api from './axiosConfig'

export const getFacilities = () => api.get('/facilities').then((res) => res.data)
export const getFacility = (id) => api.get(`/facilities/${id}`).then((res) => res.data)
export const getAvailability = (id, params) => api.get(`/facilities/${id}/availability`, { params }).then((res) => res.data)
export const createFacility = (payload) => api.post('/admin/facilities', payload).then((res) => res.data)
export const updateFacility = (id, payload) => api.put(`/admin/facilities/${id}`, payload).then((res) => res.data)
export const deleteFacility = (id) => api.delete(`/admin/facilities/${id}`).then((res) => res.data)
