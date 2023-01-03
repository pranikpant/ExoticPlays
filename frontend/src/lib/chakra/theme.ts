
import { extendTheme, ThemeConfig,  } from "@chakra-ui/react"

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

export const theme = extendTheme( { config }, {
  colors: {
    brand: {
      100: "#f7fafc",
      // ...
      900: "#1a202c",
    },
    styles: {
      global: () => ({
        body: {
          bg: "whiteAlpha.200",
        }
      })
    }
  },
});