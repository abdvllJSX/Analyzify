'use client';
import './globals.css'
import { SessionProvider } from "next-auth/react"
 const metadata = {
  title: 'Analyzify',
  description: 'Generated by create next app',

}

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}