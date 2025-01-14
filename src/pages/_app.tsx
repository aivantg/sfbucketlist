import type { AppProps } from 'next/app'
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

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider theme={theme}>
            <Component {...pageProps} />
        </ChakraProvider>
    )
} 