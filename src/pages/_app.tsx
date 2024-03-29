// @ts-nocheck
// ** Next Imports
import Head from 'next/head'
import { Router } from 'next/router'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

// ** Loader Import
import NProgress from 'nprogress'

// ** Emotion Imports
import { CacheProvider } from '@emotion/react'
import type { EmotionCache } from '@emotion/cache'
import { SWRConfig } from 'swr'

// ** Config Imports
import themeConfig from 'src/configs/themeConfig'

// ** Component Imports
import UserLayout from 'src/layouts/UserLayout'
import ThemeComponent from 'src/@core/theme/ThemeComponent'

// ** Contexts
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'

// ** Utils Imports
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css'

// ** Global css styles
import '../../styles/globals.css'
import { AuthProvider } from 'src/@core/context/AuthContext'
import { CompanyProvider } from 'src/@core/context/CompanyContext'
import API from 'src/services/api'

// ** Extend App Props with Emotion
type ExtendedAppProps = AppProps & {
  Component: NextPage
  emotionCache: EmotionCache
}

const clientSideEmotionCache = createEmotionCache()

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}

// ** Configure JSS & ClassName
const App = (props: ExtendedAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  // Variables
  const getLayout = Component.getLayout ?? (page => <UserLayout>{page}</UserLayout>)
  const fetcher = (url: string) => API.get(url).then(res => res.data.data)

  return (
    <SWRConfig
      value={{
        fetcher: fetcher
      }}
    >
      <AuthProvider>
        <CompanyProvider>
          <CacheProvider value={emotionCache}>
            <Head>
              <title>{`${themeConfig.templateName} - Gestão inteligente de telas interativas`}</title>
              <meta
                name='description'
                content={`${themeConfig.templateName} – Gestão inteligente de telas interativas`}
              />
              <meta name='keywords' content='kioski' />
              <meta name='viewport' content='initial-scale=1, width=device-width' />
            </Head>

            <SettingsProvider>
              <SettingsConsumer>
                {({ settings }) => {
                  return <ThemeComponent settings={settings}>{getLayout(<Component {...pageProps} />)}</ThemeComponent>
                }}
              </SettingsConsumer>
            </SettingsProvider>
          </CacheProvider>
        </CompanyProvider>
      </AuthProvider>
    </SWRConfig>
  )
}

export default App
