import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('qlc_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('qlc_token')
      localStorage.removeItem('qlc_user')
    }
    return Promise.reject(error)
  },
)

export const getApiError = (error, fallback = 'Something went wrong') =>
  error.response?.data?.message || error.message || fallback

export default api
