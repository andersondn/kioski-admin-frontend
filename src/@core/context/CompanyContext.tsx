import { getCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import { createContext, useEffect, useState, useContext } from 'react'
import API from 'src/services/api'

type CompanyContextType = {
  authenticated: boolean
  authToken: string

  // setServer: (server: string) => void;
}

export const CompanyContext = createContext({} as CompanyContextType)

export function CompanyProvider({ children }: any) {
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
      <CompanyContext.Provider
        value={{
          authenticated: !!authToken,
          authToken: 'aaa'
        }}
      >
        {children}
      </CompanyContext.Provider>
    </>
  )
}

export default CompanyContext

// Path: src/context/CompanyContext.ts
/// Create a new context

export const useCompanyContext = () => {
  const context = useContext(CompanyContext)
  if (context === undefined) {
    throw new Error('useCompanyContext must be used within a CompanyContextProvider')
  }

  return context
}
