// src/app/api/auth/signup/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendVerificationRequest } from '@/lib/auth'
import crypto from 'crypto'
import bcrypt from 'bcrypt'

export async function POST(req: Request) {
  const { email, password } = await req.json()

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
  }

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    return NextResponse.json({ error: 'Email already in use' }, { status: 400 })
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10)

  // Generate verification token
  const token = crypto.randomUUID()
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours from now

  // Store verification request with hashed password
  await prisma.verificationToken.create({
    data: {
      identifier: email,
      token,
      expires,
      password: hashedPassword, // Store the hashed password
    },
  })
  

  // Send verification email
  const verificationUrl = `${process.env.NEXTAUTH_URL}/api/auth/verify?token=${token}`

  await sendVerificationRequest({
    identifier: email,
    url: verificationUrl,
    provider: {
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    },
  })

  return NextResponse.json({ message: 'Verification email sent' })
}
