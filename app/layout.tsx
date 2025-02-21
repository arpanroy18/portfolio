import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import { GoogleAnalytics } from '@/components/GoogleAnalytics'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Arpan's Portfolio",
  description: "Personal portfolio website",
  icons: {
    icon: '/ar-logo.png',
    apple: '/ar-logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body className={`${inter.className} overflow-x-hidden`}>
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  )
}
