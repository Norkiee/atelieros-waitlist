// src/app/layout.tsx
import localFont from 'next/font/local'
import './globals.css'

const generalSans = localFont({
  src: [
    {
      path: './fonts/GeneralSans-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/GeneralSans-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
  ],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={generalSans.className}>
      <body className="antialiased">
        <div className="min-h-screen bg-[#0A0A0A]">
          {children}
        </div>
      </body>
    </html>
  )
}