import { getCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import { createContext, useEffect, useState, useContext } from 'react'

type AuthContextType = {
  authenticated: boolean
  authToken: string

  // setServer: (server: string) => void;
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: any) {
  const [loading, setLoading] = useState(true)
  const authToken = getCookie('admin:authToken')
  const router = useRouter()

  const validate = async () => {
    if (!authToken && !router.pathname.startsWith('/login')) {
      console.log(router.pathname)
      await router.push('/login')
      setLoading(false)
    }
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
