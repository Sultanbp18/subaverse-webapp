import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/providers/theme-provider'
import { LanguageProvider } from '@/providers/language-provider'
import { QueryProvider } from '@/providers/query-provider'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://subaverse.com'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: 'Subaverse - Sultan Bayu Universe',
  description: 'Personal portfolio and blog website for Sultan Bayu Universe. Contains projects, stories, hobbies, about me, and professional profile.',
  openGraph: {
    title: 'Subaverse - Sultan Bayu Universe',
    description: 'Personal portfolio and blog website for Sultan Bayu Universe',
    url: 'https://subaverse.com',
    siteName: 'Subaverse',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script 
          defer 
          data-domain="subaverse.com" 
          src="https://plausible.io/js/script.js"
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <LanguageProvider>
            <QueryProvider>
              <div className="flex min-h-screen flex-col">
              <Header />
              <div className="flex-1">
                {children}
              </div>
              <Footer />
              </div>
            </QueryProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}