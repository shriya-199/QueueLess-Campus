import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { login as loginApi, register as registerApi } from '../api/authApi'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('qlc_user')
    return stored ? JSON.parse(stored) : null
  })
  const [token, setToken] = useState(() => localStorage.getItem('qlc_token'))

  const persistSession = useCallback((auth) => {
    const nextUser = {
      id: auth.userId,
      name: auth.name,
      email: auth.email,
      role: auth.role,
    }
    localStorage.setItem('qlc_token', auth.token)
    localStorage.setItem('qlc_user', JSON.stringify(nextUser))
    setToken(auth.token)
    setUser(nextUser)
    return nextUser
  }, [])

  const login = useCallback(async (payload) => persistSession(await loginApi(payload)), [persistSession])
  const register = useCallback(async (payload) => persistSession(await registerApi(payload)), [persistSession])

  const logout = useCallback(() => {
    localStorage.removeItem('qlc_token')
    localStorage.removeItem('qlc_user')
    setToken(null)
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({ user, token, isAuthenticated: Boolean(token), login, register, logout }),
    [user, token, login, register, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
