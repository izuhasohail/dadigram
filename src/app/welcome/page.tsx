"use client"
// src/app/welcome/page.tsx
import { useSession } from 'next-auth/react'

export default function WelcomePage() {
  const { data: session } = useSession()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-r from-green-400 to-blue-500 text-white">
      <h1 className="text-6xl font-bold mb-8">Welcome to Dadigram</h1>
      <p className="text-2xl">Hello, {session?.user?.name || session?.user?.email}! You're all set to start using our app.</p>
    </main>
  )
}
