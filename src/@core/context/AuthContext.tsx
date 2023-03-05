import { getCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import { createContext, useEffect, useState, useContext } from 'react'
import API from 'src/services/api'

type AuthContextType = {
  authenticated: boolean
  authToken: string

  // setServer: (server: string) => void;
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: any) {
  const [loading, setLoading] = useState(true)
  const authToken = getCookie('Admin:AuthToken')
  const router = useRouter()

  const validate = async () => {
    if (!authToken && !router.pathname.startsWith('/login')) {
      console.log(router.pathname)
      await router.push('/login')
      setLoading(false)

      return
    }
    try {
      await API.get('/auth/validateSession').then((response) => {
        if (response.status !== 200) {
          router.push('/login')
        }
      })
    } catch (error) {
      router.push('/login')

    }

    setLoading(false)


  }

  useEffect(() => {
    validate()
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <>
      <AuthContext.Provider
        value={{
          authenticated: !!authToken,
          authToken: 'aaa'
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  )
}

export default AuthContext

// Path: src/context/AuthContext.ts
/// Create a new context

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthContext must be used within a AuthContextProvider')
  }

  return context
}
