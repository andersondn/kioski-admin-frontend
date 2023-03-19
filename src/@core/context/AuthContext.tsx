import { getCookie, setCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import { createContext, useEffect, useState, useContext } from 'react'
import API from 'src/services/api'

type AuthContextType = {
  authenticated: boolean
  authToken: string
  setToken: (token: string) => void
  companyId: string
  setCompany: (companyId: string) => void

  // setServer: (server: string) => void;
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: any) {
  const [loading, setLoading] = useState(true)
  const [authToken, setAuthToken] = useState<string>('')
  const [companyId, setCompanyId] = useState<string>('')
  const router = useRouter()

  const redirectToLogin = async () => {
    await router.push('/login')
    setLoading(false)
  }

  const validate = async () => {
    try {
      await API.get('/auth/validateSession').then(response => {
        if (response.status !== 200) {
          redirectToLogin()
        }
      })
    } catch (error) {
      redirectToLogin()
    }
    const localCompanyId = getCookie('Admin:CompanyId') as string
    if (localCompanyId) {
      setCompanyId(localCompanyId)
    } else {

      // router.push('/em-breve/setCompany')
    }
    setLoading(false)
  }
  const setCompany = (companyId: string) => {
    setCompanyId(companyId)
  }

  useEffect(() => {
    const token = getCookie('Admin:AuthToken') as string
    setAuthToken(token)

    if (!token && !router.pathname.startsWith('/login')) {
      redirectToLogin()
    } else {
      validate()
    }
  }, [])


  const setToken = (token: string) => {
    setCookie('Admin:AuthToken', token)
  }

  if (loading) return <div>Loading...</div>

  return (
    <>
      <AuthContext.Provider
        value={{
          authenticated: !!authToken,
          authToken,
          setToken,
          companyId,
          setCompany
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
