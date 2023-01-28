import '#/styles/globals.css'
import type { AppProps } from 'next/app'
import { Space_Grotesk, Poppins } from '@next/font/google'

// If loading a variable font, you don't need to specify the font weight
const grotesk = Space_Grotesk({ subsets: ['latin'], weight: ['400', '600'] })
const poppins = Poppins({ subsets: ['latin'], weight: ['200', '400', '600', '800'] })

export default function App({ Component, pageProps }: AppProps) {
  return <main>
    <style jsx global>{`
      :root {
        --font: ${poppins.style.fontFamily}, sans-serif;
        --font-title: ${grotesk.style.fontFamily}, serif;
      }
    `}</style>
    <Component {...pageProps} />
  </main>
}
