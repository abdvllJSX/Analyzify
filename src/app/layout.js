'use client';
import './globals.css'
import Sidebar from "../app/components/sidebar"
 const metadata = {
  title: 'Analyzify',
  description: 'Generated by create next app',

}

export default function RootLayout({ children, showSidebar }) {
  return (
    <div>
      {showSidebar && <Sidebar />}
      <main>
        {children}
      </main>
    </div>
  )
}
