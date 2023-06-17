import { Footer } from '#/components/footer'
import { Nav } from '#/components/nav'
import '#/styles/globals.css'
import { Space_Grotesk, Poppins } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';


const grotesk = Space_Grotesk({ subsets: ['latin'], weight: ['400', '600'], variable: "--font" })
const poppins = Poppins({ subsets: ['latin'], weight: ['200', '400', '600', '800'], variable: "--font-title" })

export const metadata: Metadata = {
  title: 'The Trillium Partners',
  description: 'Real estate agents in the Northern Michigan Area',
  icons: "/logo.svg",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${grotesk.variable} ${poppins.variable}`}>
      <body>
        <main>
          <Nav />
          {children}
          <Footer />
        </main>
        <Analytics />
      </body>
    </html>
  )
}