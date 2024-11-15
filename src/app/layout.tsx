import Navbar from '@/components/Navbar'
import { ClerkProvider } from '@clerk/nextjs'
import { Metadata } from 'next'
import './globals.css'
import { LocationProvider } from '@/components/LocationContext'

export const metadata: Metadata = { 
  title: "Skypark AI", 
  description: "SkyPark: AI-powered parking lot monitoring system, offering real-time surveillance, vehicle tracking, and security insights for efficient and secure parking management."
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  
  return (
    <ClerkProvider>
      <LocationProvider>
      <html lang="en">
        <body>
          <header>

            <Navbar/>
          </header>
          <main>{children}</main>
        </body>
      </html>
      </LocationProvider>
    </ClerkProvider>
  )
}