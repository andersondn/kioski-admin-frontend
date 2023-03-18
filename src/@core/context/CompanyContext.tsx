import { Avatar, Box, Modal, Typography } from '@mui/material'
import { getCookie, setCookie } from 'cookies-next'
import { BriefcaseVariantOutline } from 'mdi-material-ui'
import { useRouter } from 'next/router'
import { createContext, useEffect, useState, useContext } from 'react'
import API from 'src/services/api'
import useSWR, { mutate, useSWRConfig } from 'swr'

type CompanyContextType = {
  companies: Company[]
  company?: Company
  changeCompany: (company: Company) => void
  showCompanyModal: () => void

  // setServer: (server: string) => void;
}

type Company = {
  id: string
  name: string
  logo?: string
}

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',

  // border: '2px solid #000',
  boxShadow: 24,
  borderRadius: '10px',
  p: 4
}

export const CompanyContext = createContext({} as CompanyContextType)

export function CompanyProvider({ children }: any) {
  const [company, setCompany] = useState<Company>()
  const [companyModal, setCompanyModal] = useState(false)
  const { data: companies } = useSWR('/company')

  const { mutate, cache } = useSWRConfig()

  const changeCompany = (newCompany: Company) => {
    if (newCompany.id === company?.id) return setCompanyModal(false)

    setCompany(newCompany)
    setCookie('Admin:CompanyId', newCompany.id)
    setCompanyModal(false)
    const keys = [...cache.keys()]
    keys.forEach(key => {
      mutate(key)
    })
  }
  const getCompanyFomCookie = () => {
    if (!companies) return

    const localCompanyId = getCookie('Admin:CompanyId') as string
    if (localCompanyId && localCompanyId !== company?.id) {
      const company = companies?.find((company: any) => company.id === localCompanyId)
      if (company) {
        return setCompany(company)
      }
    }
    if (companies.length > 0 && !company) {
      if (companies.length === 1) {
        setCompany(companies[0])
        setCookie('Admin:CompanyId', companies[0].id)

        return
      }

      setCompanyModal(true)
    }
  }
  const showCompanyModal = () => {
    setCompanyModal(true)
  }
  useEffect(() => {
    getCompanyFomCookie()
  }, [companies])

  return (
    <>
      <CompanyContext.Provider
        value={{
          companies,
          company,
          changeCompany,
          showCompanyModal
        }}
      >
        {children}
      </CompanyContext.Provider>
      <Modal
        open={companyModal}

        // onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Escolha um estabelecimento
          </Typography>

          {companies?.map((item: Company, index: number) => {
            return (
              <Box
                key={item.name}
                onClick={() => changeCompany(item)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  my: 1,
                  p: 1,
                  '&:hover': {
                    background: '#f5f5f5',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }
                }}
              >
                <Avatar
                  variant='rounded'
                  sx={{
                    mr: 3,
                    width: 40,
                    height: 40,
                    backgroundColor: `#9155FD`
                  }}
                >
                  <BriefcaseVariantOutline />
                  {/* <img src={item.logo || placeholder} alt={item.name} height={20} /> */}
                </Avatar>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Box sx={{ marginRight: 2, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant='body2' sx={{ mb: 0.5, fontWeight: 600, color: 'text.primary' }}>
                      {item.name}
                    </Typography>
                    <Typography variant='caption'>{item.id}</Typography>
                  </Box>
                </Box>
              </Box>
            )
          })}
        </Box>
      </Modal>
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
