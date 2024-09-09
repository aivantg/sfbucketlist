'use client'

import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import '@fontsource-variable/playpen-sans'

const theme = extendTheme({
    fonts: {
        body: `'Playpen Sans Variable', sans-serif`,
        heading: `'Playpen Sans Variable', sans-serif`,
    },
    components: {
        Checkbox: {
            baseStyle: {
                control: {
                    bg: "white",

                }
            }
        }
    }
});

export function Providers({ children }: { children: React.ReactNode }) {
    return <ChakraProvider theme={theme}>{children}</ChakraProvider>
}