import { NextUIProvider } from "@nextui-org/react";
import {ThemeProvider as NextThemsProvider} from 'next-themes'

export default function Providers({children}: {children: React.ReactNode}) {
    return (
        <NextUIProvider>
            <NextThemsProvider
            attribute='class'
            defaultTheme='light'
            themes={['light', 'dark', 'modern']}
            >
            {children}
            </NextThemsProvider>
        </NextUIProvider>
    )
}