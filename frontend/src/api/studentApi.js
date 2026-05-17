import api from './axiosConfig'

export const getProfile = () => api.get('/student/profile').then((res) => res.data)
export const updateProfile = (payload) => api.put('/student/profile', payload).then((res) => res.data)
export const getPenalties = () => api.get('/student/penalties').then((res) => res.data)
