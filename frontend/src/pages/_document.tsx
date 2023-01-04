import { ColorModeScript } from '@chakra-ui/react'
import { Html, Head, Main, NextScript } from 'next/document'
import { theme } from '../lib/chakra/theme'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
      <ColorModeScript initialColorMode={'light'} />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
