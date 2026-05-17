import api from './axiosConfig'

export const joinWaitlist = (payload) => api.post('/waitlists/join', payload).then((res) => res.data)
export const getMyWaitlists = () => api.get('/waitlists/my').then((res) => res.data)
export const cancelWaitlist = (id) => api.put(`/waitlists/${id}/cancel`).then((res) => res.data)
export const getFacilityQueue = (facilityId) => api.get(`/admin/queues/facilities/${facilityId}`).then((res) => res.data)
