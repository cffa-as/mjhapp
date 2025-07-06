import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body style={{
        paddingTop: 'env(safe-area-inset-top, 16px)',
        paddingBottom: 'env(safe-area-inset-bottom, 16px)',
        minHeight: '100vh',
        boxSizing: 'border-box',
        background: '#fff',
      }}>{children}</body>
    </html>
  )
}
