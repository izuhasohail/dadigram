// src/app/components/SignupForm.tsx
"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AuthForm from './AuthForm'

export default function SignupForm() {
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSignup = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (response.ok) {
        router.push('/check-email')
      } else {
        const data = await response.json()
        setError(data.error || 'An error occurred during signup')
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.')
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <AuthForm mode="signup" onSubmit={handleSignup} />
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  )
}
