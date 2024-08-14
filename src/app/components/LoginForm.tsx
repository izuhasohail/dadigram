// src/app/components/LoginForm.tsx
"use client"
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import AuthForm from './AuthForm'

export default function LoginForm() {
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (email: string, password: string) => {
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('Invalid email or password')
      } else {
        router.push('/welcome')
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.')
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Log In</h2>
      <AuthForm mode="login" onSubmit={handleLogin} />
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  )
}
