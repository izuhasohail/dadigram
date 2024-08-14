// src/app/api/auth/verify/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const token = searchParams.get('token')

  if (!token) {
    return NextResponse.json({ error: 'Missing token' }, { status: 400 })
  }

  const verificationRequest = await prisma.verificationToken.findUnique({
    where: { token },
  })

  if (!verificationRequest) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 400 })
  }

  if (verificationRequest.expires < new Date()) {
    await prisma.verificationToken.delete({ where: { token } })
    return NextResponse.json({ error: 'Token expired' }, { status: 400 })
  }

  const user = await prisma.user.create({
    data: {
      email: verificationRequest.identifier,
      emailVerified: new Date(),
      password: verificationRequest.password, // Save the hashed password
    },
  })

  await prisma.verificationToken.delete({ where: { token } })

  return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/login`)
}
