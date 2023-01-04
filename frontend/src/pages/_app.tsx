import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../lib/chakra/theme'
import localFont from '@next/font/local';

const myFont = localFont({src: '../../public/fonts/MoonTime/MoonTime-Regular.ttf'});

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}> 
      <ChakraProvider theme={theme}>
        <main className={myFont.className}>
          <Component {...pageProps} />
        </main>
      </ChakraProvider>
    </SessionProvider>
  )
}
