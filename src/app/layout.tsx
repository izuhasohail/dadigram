// src/app/layout.tsx
import { getServerSession } from 'next-auth/next'
import SessionProvider from './components/SessionProvider'
import './globals.css'
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()

  return (
    <html lang="en">
      <body className="inter.className">
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
